---
title: 'Polling HTTP in Angular with RxJS'
date: '2023-10-24'
description: 'Learn how to implement polling indefinitely, start/stop polling, and polling until the response has met a specified condition.'
published: true
tags: ['angular', 'rxjs']
ogType: 'article'
imageUrl: '/post_images/polling-http-angular-rxjs/header-image.png'
imageAlt: 'Screenshot of custom RxJS operator for polling'
---

![Custom RxJS operator for polling](/post_images/polling-http-angular-rxjs/header-image.png)

```
Angular 19.2.5
Node 22.14.0 (Need at least node >= 18.19.1)
```

This article covers how to implement polling indefinitely, start/stop polling, and polling until the response has met a specified condition.

To run the code locally, clone the repo [here](https://github.com/KylerJohnsonDev/angular-rxjs-http-polling-examples?tab=readme-ov-file).

## Example 1 - Polling Indefinitely

In this example, we will create a custom RxJS operator that will poll an HTTP endpoint indefinitely. This is useful for cases where you want to keep checking the status of something until the user navigates away from the page or closes the app.

First, let's take a look at the service:

```typescript
// --> src/app/examples/example-one/random-number-ex1.service.ts
@Injectable({
	providedIn: 'root'
})
export class RandomNumberEx1Service {
	private readonly baseURL = '/api/random/int';

	constructor(private http: HttpClient) {}

	fetchRandomNumber(min: number, max: number): Observable<number> {
		const url = `${this.baseURL}?min=${min}&max=${max}`;

		return this.http.get<RandomNumberResponse>(url).pipe(
			map((res) => {
				return res.number;
			})
		);
	}

	pollRandomNumber(): Observable<number> {
		return from(this.fetchRandomNumber(1, 10)).pipe(
      pollEveryNMilliseconds(5_000)
    );
	}
}
```

In the service above, we have the `fetchRandomNumber` method that fetches a random number from the API and returns an observable stream that emits the response. Then we have the `pollRandomNumber` method that uses the custom `pollEveryNMilliseconds` custom RxJS operator to handle to polling.

Now that you've see the service, let's take a look at the `pollEveryNMilliseconds` operator:

```typescript
// --> src/app/examples/poll-every-n-milliseconds.ts

export function pollEveryNMilliseconds<T>(pollIntervalMilliseconds: number) {
	return (source$: Observable<T>) =>
		timer(0, pollIntervalMilliseconds).pipe(
      switchMap(() => source$)
    );
}
```

Here, we use the `timer` operator to emit a value every `n` milliseconds. The `switchMap` operator subscribes to the source observable each time the timer emits. Assuming the source observable is a `HttpClient` request, this will make a new request each time the timer emits.

### Example 1 Use case

You're displaying data from a source where data rapidly updates like a stock ticker or a live sports score. You want to keep polling the API every few seconds to get the latest data and update the UI accordingly.

## Example 2 - Start/Stop Polling

In this example, the polling will start when a user clicks the "start polling" button and stop polling when the user clicks the "stop polling" button. 

As before, let's go ahead and take a look at our service:

```typescript
// --> src/app/examples/example-two/random-number-ex2.service.ts

@Injectable({
  providedIn: 'root'
})
export class RandomNumberEx2Service {

  // encapsulated members
  private readonly baseURL = '/api/random/int';
  private start$ = new Subject<number>();
  private stop$ = new Subject<void>();
  private randomNumber$ = this.start$.pipe(
    tap(() => this.pollingStatusSignal.set('polling')),
    switchMap(intervalMilliseconds => {
      return this.pollRandomNumber(intervalMilliseconds)
    })
  )

  //public members
  pollingStatusSignal = signal<'polling' | 'not_polling'>('not_polling');
  randomNumberSignal = toSignal(this.randomNumber$);

  constructor(private http: HttpClient) {}

  startPolling(milliseconds: number): void {
    this.start$.next(milliseconds);
  }

  stopPolling(): void {
    this.stop$.next();
    this.pollingStatusSignal.set('not_polling');
  }

  fetchRandomNumber(
    min: number,
    max: number,
  ): Observable<number> {
    const url = `${this.baseURL}?min=${min}&max=${max}`;

    return this.http.get<RandomNumberResponse>(url).pipe(
      map((res) => {
        return res.number;
      })
    );
  }

  // make this private so it can only be started internally
  private pollRandomNumber(intervalMilliseconds: number = 5_000): Observable<number> {
    return from(this.fetchRandomNumber(1, 10)).pipe(
      pollEveryNMilliseconds(intervalMilliseconds),
      takeUntil(this.stop$), // takeUntil MUST be the last operator in the chain for it to stop polling
    );
  }
}
```

In the service, we have private members `start$` and `stop$` which are `Subject`s that act as messengers. When a user clicks the "start polling" button, the `startPolling` method is invoked, which causes the `start$` subject emit. To get the random number, we pipe onto the `start$` subject, and use `switchMap` to subscrbe to the observable stream returned by the `pollRandomNumber` method. The `pollRandomNumber` method uses the same custom `pollEveryNMilliseconds` operator to handle the polling. Note the `takeUntil` operator here. More on that later.

__ Note: We're maintaining a polling status to indicate whether it's actively polling or not. We use the RxJS `tap` operator to set it to "polling" when the `start$` subject emits.  __

If you're familiar with RxJS, you know we need to subscribe to the `randomNumber$` observable to get the random number. That's where `toSignal` comes in. It subscribe to the `randomNumber$ observable and convert it to a `Signal`. When this signal is referenced in the Angular component template, it notifies Angular to rerender anytime its value changes, displaying the latest random number.

When the user clicks the "stop polling" button, the `stopPolling` method is invoked which updates our polling status signal and stops the polling by invoking the `emit` function on the `stop$` subject. The `takeUntil` operator subscribes to the `stop$` subject and when it emits, completes the observable returned by our polling operator, which stops the polling.

### Example 2 Use case

Any use case where you want to start and stop polling based on user interaction. For example, a user wants to look all the details of a stock price. Instead of polling this data all the time, you may want to only poll the detailed data for a particular stock they click on when they expand the details section.

## Example 3 - Polling until the response meets a specified condition

Again, let's start by taking a look at the service:

```typescript
// --> src/app/examples/example-three/random-number-ex3.service.ts

@Injectable({
  providedIn: 'root'
})
export class RandomNumberEx3Service {

  private readonly baseURL = '/api/random/int';

  pollingStatusSignal = signal<'polling' | 'not_polling'>('not_polling');

  constructor(private http: HttpClient) {}

  fetchRandomNumber(
    min: number,
    max: number,
  ): Observable<number> {
    const url = `${this.baseURL}?min=${min}&max=${max}`;

    return this.http.get<RandomNumberResponse>(url).pipe(
      map((res) => {
        return res.number;
      })
    );
  }

  // the predicate function passed into the polling operator must return a boolean
  // return true to stop polling, false to continue polling,
  // or throw an error to stop polling and handle the error with the `catchError` 
  // operator in the pipe
  private randomNumberPredicateFn = (randomNumber: number): boolean => {
    if(randomNumber >= 7) {
      this.pollingStatusSignal.set('not_polling')
      return true;
    }
    return false;
  }

  pollRandomNumber(): Observable<number> {
    this.pollingStatusSignal.set('polling')
    return from(this.fetchRandomNumber(1, 10)).pipe(
      pollEveryNMillisecondsUntil<number>(5_000, this.randomNumberPredicateFn)
    );
  }
}
```

You will notice this time that we have a new custom RxJS operator: `pollEveryNMillisecondsUntil`. As implied by the name, this operator polls the source observable every `n` milliseconds until a condition is met. 

The `pollEveryNMillisecondsUntil` takes a predicate function as its second argument that allows us to specify the condition in which we would like to stop polling. We've defined the `randomNumberPredicateFn` for that purpose here in the service because this condition is specific to this particular use off the polling operator.

In this case, we want the polling to stop when the random number is greater than or equal to 7. If the random number is less than 7, we want to continue polling.

So how does this work? Let's take a look at the operator:

```typescript
// --> src/app/examples/poll-every-n-milliseconds-until.ts

export function pollEveryNMillisecondsUntil<T>(pollInterval: number, responsePredicateFn: (response: T) => boolean) {
  return (source$: Observable<T>) =>
    timer(0, pollInterval)
    .pipe(
      switchMap(() => source$),
      // evaluate the value emitted from source$ to determine if polling should continue or not
      // by passing in your own predicate function
      // this function should return true if the polling should continue
      // and false if it should stop
      first(responsePredicateFn)
    )
}
```

Similar to the `pollEveryNMilliseconds` operator, we use the `timer` operator to emit a value every `n` milliseconds. The `switchMap` operator subscribes to the source observable each time the timer emits. The difference here is that we also use the `first` operator to evaluate the value emitted from the source observable and determine if polling should continue or not by passing in your own predicate function. When the predicate function returns `true`, the `first` operator completes the source observable and polling stops. If it returns `false`, the polling continues.

### Example 3 Use case

A user wants to generate an annual report that involves some heavy processing. When the user clicks the “Generate” button, we fire off a `POST` request to create the job and get back a job ID. While the job is processing, we want to poll a job status endpoint by job ID so that we can notify the user when it is complete and their report is ready for download. 

The job status endpoint returns a status of `complete`, `in_progress`, `pending`, or `error`. If the job status response is `complete` or `error` we stop polling and notify the user. Otherwise, we keep polling. 

So the predicat function for this use case would look something like:

```typescript
  private reportJobPredicateFn = (response: ReportResponse): boolean => {
    if(response.jobStatus === 'complete' || response.jobStatus === 'error') {
      this.pollingStatusSignal.set('not_polling')
      return true;
    }
    return false;
  }
```

## What to watch out for

Notice that the polling operators use `switchMap` under the hood. That means if the interval is too short and emits again before we get a response, the previous request will be canceled and the new request will be made. If this happens consistently, you will see the requests in the network tab of your dev tools but you will never get a response. This isn't a big deal if it happens only rarely, but if your response time is always slower than your interval time, you could find yourself in an infinite loop where polling never stops.

__ Note: Another thing worth noting is that this is intended for "reading" data, not for "writing" data. Because `switchMap` unsubscribes from the previous inner observable and subscribes to a new inner observable when the source observable emits, you cannot be sure if the "write" actually happened or not. This can cause front-end state and back-end state to get out of sync. A general best practice is to use `switchMap` for reads and `concatMap` or `exhaustMap` for writes.__
