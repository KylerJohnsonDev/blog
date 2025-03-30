---
title: 'Polling HTTP in Angular with RxJS'
date: '2023-10-24'
description: 'Create a reusable pollUntil operator to poll HTTP endpoints with Angular and RxJS'
published: true
tags: ['angular', 'rxjs']
ogType: 'article'
---

### The Context

In a SaaS product I work on, we allow users to perform actions on a large data set. Naturally, such processing can sometimes take a while and we do not want our users held up by a long-running request. So, I send a request with a filter object denoting which items in the data set should be processed, a job gets created, and a `jobId` is returned. I use that `jobId` to poll an endpoint every few seconds to get the status of the job. If the job status is "pending" or "in_progress", I continue polling. If it fails, I stop polling and display an error message. If it completes successfully, I show a quick "snackbar" message to the user that the job has completed.

### The Usage

I am a big fan of [NgRx Component Store](https://ngrx.io/guide/component-store) and use it extensively in my projects. In the example below, you can see I consume the custom `pollUntil` operator just like any other "pipeable" RxJS operator.

```typescript
readonly queryJobStatus = this.effect((jobId$: Observable<string>) => {
  return jobId$.pipe(
    switchMap((jobId) => {
      return this.jobService.getJobStatus(jobId).pipe(
        pollUntil<JobCreationResponse>(3_000, pollUntilPredicateHandler),
        tapResponse(
          () => handleJobComplete(),
          (error: HttpErrorResponse) => handleJobError(error)
        )
      );
    })
  );
});
```

Note that we can give it an interface that describes the shape of the response, we can specify the polling interval in milliseconds, and we pass in a predicate handler. The predicate handler is what determines when the polling will stop.

_Note: Did you know in modern JS, you can separate numbers with an underscore to make them more readable? In the example above, JS understands 3_000 to be 3000._

### Under the Hood

```typescript
export function pollUntil<T>(pollInterval: number, responsePredicate: (res: any) => boolean) {
  return (source$: Observable<T>) =>
    timer(0, pollInterval).pipe(
      switchMap(() => source$),
      first(responsePredicate)
    )
}
```

As you can see, I use generics to allow the consumer to specify the type of their source observable and I create a timer that emits on the interval the consumer provides. When the timer emits, the `switchMap` subscribes to the `source$` observable and because our source in this case is a `HttpClient` request, the request is made each time the timer emits.

The `first` RxJS operator emits only the first value that meets the condition specified in the predicate passed into it. You will likely need to write your own predicate here and pass it into the operator because it is specific to your API response. Below is an example of mine.

```typescript
export function pollUntilPredicateHandler(response: PollingOperationResponseData): boolean {
  if (response.status === AsyncJobState.completed) {
    return true // success - stop polling
  }

  if (response.status === AsyncJobState.failed) {
    throw new Error($localize`Job failed.`) // error - stop polling
  }

  return false // continue polling
}
```

In my predicate, I check to see if the job is complete. If it is, I return `true` and it completes the observable stream and polling stops. If the job fails, I throw an error, which also completes the observable stream and the polling stops. If I return false, the polling continues.

Note: Because I want this to be reusable, the error message is intentionally vague. Referring back to my first example, it's up to the consumer to catch the error and handle it respective to each use case.

### Watch out for this

Notice that the `pollUntil` operator uses `switchMap` under the hood. That means if the interval is too short and emits again before we get a response, the previous request will be effectively canceled and the new request will be made. This isn't a big deal if it happens only rarely, but if your response time is always slower than your interval time, you could find yourself in an infinite loop where polling never stops.

Another thing worth noting is that this is intended for "reading" data, not for "writing" data. Because `switchMap` unsubscribes from the previous inner observable and subscribes to a new inner observable when the source observable emits, you cannot be sure if the "write" actually happened or not. This can cause front-end state and back-end state to get out of sync. A general best practice is to use `switchMap` for reads and `concatMap` or `exhaustMap` for writes.
