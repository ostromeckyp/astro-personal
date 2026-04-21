---
title: "You don't need another state management library - vol.2"
excerpt: "Minimalistic and efficient state management approach."
date: "2026-03-12"
image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ymtR70kLdmu-k-lnbGEiqg.png"
category: "Programming"
slug: you-dont-need-another-state-management-library2
---

[Reference](https://medium.com/@pawel.ostromecky/you-dont-need-another-state-management-library-vol-2-3bd37b426449)

Hi there. If you’re reading this article, you probably saw the previous one where we built a simple weather application using **Angular signals and RxJS** without introducing a full-fledged state‑management library.

If not, you can check it [here](https://medium.com/@pawel.ostromecky/you-dont-need-another-state-management-library-78d92c7badcc).

In this article we’ll take advantage of a small utility that we’re going to explore a bit more, while still keeping things simple.

In the previous article we focused on the **conceptual approach** and showed that many patterns used in libraries like NgRx can be recreated with native Angular tools. The goal was not to criticize those libraries but to show that sometimes we can achieve similar benefits with **less boilerplate and fewer dependencies**.

In this article, I want to take the next step.

Instead of reinventing the wheel, we will reuse the **Flux‑like pattern** we introduced earlier and implement it using the [**connect**](https://ngxtension.dev/utilities/signal-async/connect/) utility from the [**ngxtension**](https://ngxtension.dev) library.

This approach keeps the architecture familiar for developers who worked with Redux or NgRx, while dramatically reducing the amount of code we need to write.

**Some theory**
---------------

Before we jump into code, let’s quickly recall the pattern we used in the previous article.

The architecture looked roughly like this:

1.  **Sources** — observables that represent events or actions.
2.  **Effects** — side effects such as HTTP requests.
3.  **Reducer** — logic that updates the state.
4.  **Selectors** — reactive access to state.

If you worked with Redux, NgRx or similar tools, this flow should look familiar.

![Just Redux](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*THN5SgniT5a8PCf9F8QTdg.png)

Even though we didn’t use a dedicated library, the pattern was still there.

*   Subject as **actions**
*   RxJS operators for **effects**
*   signal state with update() as **reducer**
*   computed() as **selectors**

This gave us many benefits typically associated with Flux architecture:

*   **Unidirectional data flow**
*   **Single source of truth**
*   **Predictable state updates**
*   **Easy testing**

However, there were still some gaps we want to address today:

*   Manual **subscriptions**
*   Imperative state updates within **rxjs** streams

The good news is that this pattern is so common that some utilities can **simplify the implementation without forcing a heavy abstraction.**

One of them is the **connect** helper from **ngxtension**.

**ngxtension and the connect method**
-------------------------------------

[**ngxtension**](https://ngxtension.netlify.app/) is a utility library for Angular that provides a set of small helpers designed to improve developer experience.

I like to think about it as a box full of chocolate — every piece simplifies some part of your daily workflow. It’s not a framework, it doesn’t impose anything, and that’s beautiful.

One of the most interesting utilities in the context of state management is **connect**.

The goal of **connect** is simple:

> Connects an observable stream to a signal and update its value automatically.

Instead of manually subscribing and updating the signal, we can describe **how the state should change**, and the utility handles the subscription lifecycle for us.

_But we already know this pattern from other libraries._

Let's revisit a super simplified version of our city search example.

```ts
@Injectable()
export class CitySearchStore {
  private cityService = inject(CityService)
  private state = signal<City | undefined>(undefined)
  public city = computed<City | undefined>(() => this.state())
  search$ = new Subject<string>()
}
```

So far, nothing surprising.

We have:

*   **state** stored in a signal
*   **selector** (city)
*   **action stream** (search$)

Now let’s connect the action stream to the state.

```ts
constructor() {
  connect(this.state, this.search$.pipe(
  switchMap(cityName =>
    this.cityService.getCityByName(cityName)
  )))
}
```

That’s it.

Whenever **search$** emits a value, the observable pipeline runs and the result automatically updates the **state** signal.

No manual subscription. No **takeUntilDestroyed()**. Why does it work? If we look at the **connect** definition, there is a key phrase:

> “connects a signal to an observable and returns a subscription.”

And that’s it. **connect** manages subscriptions for us, and this will be a crucial part of our implementation. You might wonder how something this simple could replace patterns used in mature state‑management libraries. The answer is simple — we are not going to use it in this minimal form. Instead, we will shape it into something closer to a real architectural pattern.

Let’s verify the following example.

```ts
@Injectable()
export class WeatherFacade {
  private readonly weatherService = inject(WeatherService);
  // state
  private readonly state = signal<WeatherState>({
    city: undefined,
    forecast: undefined,
    status: 'idle',
    error: ''
  });
  // selectors
  readonly city = computed(() => this.state().city);
  readonly error = computed(() => this.state().error);
  // event sources
  private readonly citySearchTriggered$ = new Subject<string>();
  private readonly errorReceived$ = new Subject<string>();
  constructor() {
    // effect result streams
    const cityLoaded$ = this.citySearchTriggered$.pipe(
      switchMap((cityName) =>
        this.weatherService.getCityByName(cityName).pipe(
          catchError(() => {
            // Show notification
            this.errorReceived$.next('Failed to load city');
            return EMPTY;
          })
        )
      )
    );
    // connected signal updates
    connect(this.state)
      .with(this.citySearchTriggered$, (state) => ({
        ...state,
        status: 'loading',
        error: ''
      }))
      .with(cityLoaded$, (state, city) => ({
        ...state,
        status: 'idle',
        city
      }))
  }
  searchCity(cityName: string): void {
    if (cityName.trim()) {
      this.citySearchTriggered$.next(cityName);
    }
  }
}
```

We introduced some changes compared to the previous example. Let’s break it down.

**Subjects as actions**

The **citySearchTriggered$** subject represents an **action**, or as I prefer — an **event**, because we are going to follow an event‑based naming convention.

Notice the naming pattern:

*   **citySearchTriggered$**
*   **cityLoaded$**
*   **errorReceived$**

These **sources** represent **things that happened**, not imperative commands. Event‑based naming keeps the architecture consistent and easier to reason about. Previously we just had **search$**, but it sounds more like a command. Mixing these naming styles is not wrong, but it might be confusing. For that reason we introduced the **searchCity()** method, which becomes the public API of the service and expresses the intent in a command‑like style.

**connect as reducer**

**connect** acts as a **reducer bridge** between:

*   an **observable stream**
*   a **signal state**

Instead of writing:

```ts
citySearchTriggered$.subscribe(value =>
  state.update(s => ({ ...s, status: 'loading' }))
)
```

we simply describe the pipeline and let **connect** perform the update.

```ts
connect(this.state)
  .with(this.citySearchTriggered$, (state) => ({
    ...state,
    status: 'loading',
    error: ''
  }))
```

This keeps state transitions **declarative**.

**RxJS for side effects**

Side effects should remain inside RxJS pipelines.

For example:

```ts
citySearchTriggered$.pipe(
  debounceTime(300),
  switchMap(city =>
    this.api.getCity(city).pipe(
      catchError(() => { /** Handle error response */})
    )
  )
)
```

This keeps all asynchronous logic inside observable streams, where RxJS shines. Signals remain responsible only for **holding state**, not performing side effects. There is one more thing about side effects that is important to understand in this workflow.

Consider the following scenario:

```ts
this.citySearch$.pipe(
  switchMap(city => this.weatherApi.getWeather(city)),
  tap((result) => this.citySearchSuccess$.next(result)),
  catchError((err) => {
    this.citySearchFailure$.next(err);
    return EMPTY;
  })
).subscribe();
```

Do you recognize it? I’ve seen this pattern many times across many projects.

It usually looked like:

> Action → Action Success / Action Failure

We had an action or event recognized in the system and created dedicated success and failure actions. In practice, this meant that for every action we ended up with three.

This is a completely valid approach, but to make this code work we had to **subscribe**, because observables execute only when subscribed. Assigning the result to **citySearchSuccess$** is also not an option here because the result is already pushed manually using **tap** operator.

Let’s rethink it.

```ts
cityFound$ = this.citySearchTriggered$.pipe(
  switchMap(city => this.weatherApi.getWeather(city)),
  catchError((err) => {
    this.error$.next(err);
    return EMPTY;
  })
);
```

What happened here?

We extracted **citySearchSuccess$** outside the stream and made it a property. Additionally we renamed it to follow event-based naming. Then we assigned the result of the observable pipeline to it. We can do that because the result of a pipeline is still an **Observable**, which is exactly what we want.

```ts
connect(this.state)
  .with(this.cityFound$, 
      (state, result) => ({
        ...state,
        status: 'idle',
        city: result
      }))
```

Exactly. We pass it through **connect**, which subscribes to the stream, extracts the emitted value, and lets us define the state transition.

One more observation from my perspective.

We used to create dedicated error or failure actions for almost every event in the system. In practice, this often led to hundreds of actions doing the same thing — for example just opening a toast notification. Since this is feature‑related state, we usually only need a single state handler for errors. Of course there may be special requirements, but in most cases a single handler is enough.

🥳 We already have lightweight, ready to use feature state management. We intentionally move it to **Facade** to keep it separate from UI state but we’ll cover it in another story.

**Summary**
-----------

In the previous article we implemented a Flux‑inspired architecture manually using **signals** and **RxJS**.

The key idea was that we don’t necessarily need a heavy state‑management library to get:

*   predictable state
*   unidirectional data flow
*   maintainable architecture

In this article we improved that approach using the **connect** utility from **ngxtension** library.

The architecture remains the same:

*   **Subjects** represent actions
*   **RxJS** handles effects
*   **connect** performs reducer updates
*   **signals** store state
*   **computed** exposes selectors

The difference is that the implementation becomes **much simpler and easier to maintain**.

**What’s next**
---------------

In the next article I’ll explore a **pure signal‑based approach** to state management.

No Subjects.

No RxJS pipelines.

Just signals.

And we’ll see where this approach works great — and where RxJS is still the better tool.

If the post was useful to you, consider giving it a Clap👏 and follow me, you would help me a lot. Thank you ❤️
