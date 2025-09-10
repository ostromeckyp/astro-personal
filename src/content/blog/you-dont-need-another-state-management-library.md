---
title: "You (don’t) need another State Management Library"
excerpt: "Minimalistic and efficient state management approach."
date: "2024-07-17"
image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*lUjlKD4atLAnAl1dreZ5vw.jpeg"
category: "Programming"
slug: you-dont-need-another-state-management-library
---


[Reference](https://medium.com/@pawel.ostromecky/you-dont-need-another-state-management-library-78d92c7badcc)

Hi there. My name is Paweł. Today is July 17th, 2024, and this is my first article. I just wanted to mention that to come back here in the future and see my progress unless there’s no progress 😂. Recent changes in the angular ecosystem bring some thought and I’m excited to share those thoughts on state management in Angular and how recent changes might affect our approach.

**The State of State Management**
---------------------------------

Web applications require managing their state — the data determining how the UI looks and behaves. Traditionally, developers reached for established libraries like NgRx or its component store variant and recently released signal store. There are some other players like NGXS or Akita. While these libraries offer robust solutions, they have a learning curve for RxJS operators, flux architecture, Redux concepts, and understanding concepts behind the library. They require a lot of boilerplate. Additionally, they are not default. Angular is a full-fledged platform for building production-ready Web applications, so why not leverage its advantages?

**Some theory**
---------------

Let’s think for a while about what the actual state is. We can categorize types of state by many factors, such as purpose and accessibility, but in this article, I’d like to focus on the distinction by persistence. So, we can distinguish the following types of state:

1.  Server State (which we are not interested in at the moment)
2.  Persistent State
3.  Transient State (sometimes called Ephemeral State)

![State types by Persistence](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*7JGywxR__9hzTLQgU9mTyg.png)

**Persistent State:** This type of state is stored beyond the user session, allowing the application to remember user preferences or data across sessions. It also might be responsible for storing URL-related data like query params and app contextual data accessible globally known as Global State in some globally accessible object (eg. NgRx etc.).

**Transient State:** This type of state only exists during a user session and does not persist after the user navigates out of the page or closes the browser. Examples include:

*   Form data entered by the user before submission.
*   The current selection in a dropdown menu.
*   The temporary visibility of a modal or tooltip.
*   **UI State:** This state controls the visual aspects of the application, such as the visibility of components, the selected item in a list, or the current theme.

![Web App state layers](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*MUElCqiu-Q1HQPb-NzJ3sQ.png)

**Global State vs. Local State:** Global state is accessible throughout the application, while local state is specific to a particular component or view.

**Beyond Global State**
-----------------------

In the good old days, when I was a Junior Developer, my Senior told me that if you had NgRx in a project, you must do everything through the Store to keep consistency. I couldn’t disagree more, but at the time, I didn’t know it was nonsense.

But…

I liked the idea behind the Redux

*   **Single source of truth**
*   **Unidirectional data flow**
*   **Immutable state at the component level**

I still want those benefits (single source of truth, unidirectional data flow, immutable state) but with more flexibility and less boilerplate. However, a major drawback of these libraries is that the global state can become a complex data structure to maintain, especially when storing UI state for individual components. This is why tools like NgRx Component Store or Rx-Angular emerged, offering a more granular approach to state management. While these are great libraries, they introduce additional dependencies.

**A little bit of practice**
----------------------------

Let’s assume a simple example. We have a weather application with three functionalities:

*   City search
*   Current weather
*   Weather forecast

The flow is straightforward: we search for a city and then display the current weather and forecast. Additionally, we want to share city data between the current weather and forecast classes. The data model might look like this:

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ARQXsBzX5LkuvrZrHZvG1A.png)

The possible implementation assumes we have a shared instance of `City` which is used by both `CurrentWeather` and `WeatherForecast`.

![CitySearchService implementation](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*awyfBC3SkS1HrvBpMoQoYw.png)

Let’s try to understand what’s happening here. We initialize a `city` value in the constructor, and then we listen for changes to the `search$` observable, which is our **source**. When a change occurs, we fetch the city data. When the `city$` observable emits a new value, we update the **state** object, which we can consider as **reducer**. The `state` object is private, so if we want to access its value, we create a **selector** — in this case, the `city` property. One thing worth noticing here is service is `providedIn: 'root'` so we have one instance of the service and when we inject it into another class it receives the same instance of `CitySearchService`object.

![Weather + Forecast implementation](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9wwxOSQd8TPK1uB8OhQV3g.png)

For brevity, I included Weather and Forecast in one facade class. Of course, it could be split into separate classes to be more SOLID, but let’s focus on how we deal with the state.

We leverage the selector from the previous example. We listen to the `city` state, and on changes, we fetch weather and forecast data. We create selectors for both, which we can use in the component.

**Summary**
-----------

That’s it. We utilized signals and some basic RxJS operators to manage the Weather App state. The approach is strongly inspired by Redux solutions, so it might be familiar to developers who have used NgRx before. The advantage is that we don’t need extra dependencies to manage state, making the solution simpler and more streamlined. This method leverages Angular’s built-in features, providing a more integrated and efficient way to handle state management. By combining RxJS and signals, we achieve a maintainable and testable solution without the overhead of additional libraries.

**Live Demo:** [https://weather-88364.web.app/](https://weather-88364.web.app/)
**Repository:** [Ostromecky/weather: Weather Angular PWA application (github.com)](https://github.com/Ostromecky/weather)

**Final Thoughts**
------------------

1.  Signals are not a replacement for solutions like NgRx or RxJS. However, they can help you organize your code in a declarative way without the need to learn advanced RxJS operators, Flux architecture, or Redux concepts.
2.  RxJS and Signals combined are powerful tools to create maintainable and testable solutions for state management in-app
3.  The article doesn’t criticize existing solutions like NgRx, but it tries to show that there’s an alternative way before you rely on fancy libraries. Maybe you don’t need them at all.
4.  Always try to fit tools to a problem you are facing no other way round and don’t overthink it — KISS

**Sources**
-----------

*   [_Reactive Ephemeral State Management Research. By Push-Based_](https://push-based.io/article/research-on-reactive-ephemeral-state-management)
*   [_My NEW default for state management in Angular (youtube.com)_](https://www.youtube.com/watch?v=R4Ff2bPiWh4)
*   [Signals in Angular — How to Write More Reactive Code (freecodecamp.org)](https://www.freecodecamp.org/news/angular-signals/)
*   [https://ngrx.io/](https://ngrx.io/)
*   [Lesson 2: Simple State Management in Angular | Angular Start](https://angularstart.com/modules/basics-of-state-management/2/)
*   [State | RxAngular (rx-angular.io)](https://www.rx-angular.io/docs/state)
