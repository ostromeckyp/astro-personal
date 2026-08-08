---
title: "Code Became Cheap. Did Developer Knowledge Become Cheap Too?"
excerpt: "When implementation becomes abundant, selection becomes the work."
date: "20256-08-08"
image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Kavg6Y1VzvfpQ9QgyiCJ5g.png"
category: "Programming"
slug: code-became-cheap
---

[Reference](https://medium.com/@pawel.ostromecky/code-became-cheap-did-developer-knowledge-become-cheap-too-3e641aa9a63b)

For roughly eight years, I had a simple model of becoming a better developer.

Read the documentation. Learn Angular properly. Understand RxJS, dependency injection, change detection, testing, state management, architecture. Look at how other people solve problems. Make enough mistakes to understand why one solution is better than another.

The model was not perfect, but it was easy to follow: the more I understood, the more I could do on my own, and the faster I could find a good solution, the better developer I became.

Then AI arrived and made a large part of what I had trained for surprisingly cheap.

It can write the implementation in minutes. It can find a library I have never used, read its documentation, compare several approaches and produce a working starting point before I finish browsing the first API page.

This is not another article about AI taking developers’ jobs. I do not know how that story ends. I am interested in a more immediate and more uncomfortable question.

If code became cheap, what happened to the value of everything I learned?

**What Actually Became Cheap**
------------------------------

I no longer need to remember an exact API. I do not need every RxJS operator ready in my head. I can ask an agent to inspect a package, search the documentation and begin an implementation.

Pretending this changes nothing would be dishonest. A part of my knowledge has lost market value: remembering syntax and reproducing familiar implementations is less scarce than it used to be.

But scarcity is not the same as usefulness.

AI may not have made my knowledge worthless. It may have removed my monopoly on applying it.

That distinction matters because generating an answer and deciding whether it belongs in a real system are different activities. The first is getting dramatically cheaper. The second still depends on context: the product, the codebase, the team, the cost of failure and what is likely to change next.

The evidence on productivity is less tidy than the demos suggest. In a 2025 randomized study, METR found that experienced open-source maintainers working in repositories they knew took 19% longer with early-2025 AI tools. The researchers carefully limited that conclusion to the tools, developers and tasks they studied. Later METR work with newer agents reported small productivity benefits instead. The direction can change with the model and the task. [**METR’s 2025 study**](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) is not proof that AI slows developers in general, just as a two-hour app demo is not proof that production software has become trivial.

![Relative task time in METR’s study: 100 without generative AI and 119 with AI allowed.](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*EYOItBlKQSvX_ZtJ39JQmA.png)

_In this setting, access to early-2025 AI tools increased completion time by 19%. The study covered 16 experienced open-source developers completing 246 issues in repositories they knew well._

Maybe “Does AI make us faster?” is already too broad a question.

Faster at what?

**A Framework Is Not a Domain**
-------------------------------

There was a related trap in our industry long before generative AI.

When I entered software development, it was easy to confuse a domain with a technology. Frontend meant Angular or React. Backend meant Java, .NET or Node. We described ourselves as Angular developers, React developers and Java developers.

I am an Angular developer. For years, that specialization gave me a useful direction. It also made it tempting to learn tools before problems.

We need state? Add a library.

Validation? A library.

Caching? A library.

Communication between components? Surely there is another library.

Over time, I tried to reverse the order. What problem do we actually have? Is it a known class of problem? Are we dealing with an observer, a queue, a cache, a state machine, a concurrency policy or an ownership boundary? Only then: which Angular feature or library fits it?

This order is even more important now. AI is very good at answering, “How do I implement this in Angular?”

The harder question is, “Should we implement it this way at all?”

**What Angular Taught Me Beyond Angular**
-----------------------------------------

If a model knows more Angular APIs than I do, does Angular expertise still matter?

I think it does, but not for the reason I once assumed.

RxJS taught me to think about time, streams and concurrency. Consider **switchMap**, **concatMap**, **mergeMap** and **exhaustMap**. An agent can list their behavior and write code with any of them. The choice is still a product decision expressed through code. Should a new request cancel the previous one? Wait behind it? Run at the same time? Be ignored while work is in progress?

There is no correct operator until we define the behavior we want.

Dependency injection taught me to see dependencies and inversion of control. Angular’s own documentation defines DI as supplying a class with dependencies instead of making it create them internally. The API is Angular-specific. The question of who creates, owns and can replace a dependency is not. [Angular’s DI guide](https://angular.dev/guide/di).

State-management libraries forced me to ask where state should live, who can change it and how far it should travel. Components taught me about responsibility boundaries. The router taught me that navigation is also state. Tests taught me to define what I expect before trusting an implementation.

Even signals are more than a function call. Angular describes them as a system that tracks where state is used so updates can be propagated efficiently. Knowing the API helps. Understanding dependencies, derived state and reactive context helps when the generated implementation becomes surprising. [Angular’s Signals guide](https://angular.dev/guide/signals).

Maybe the real value of eight years with a framework is not the API I can recall. It is the collection of problems I learned to recognize through it.

That collection makes AI more useful, not less.

**The Wrong Question About Verification**
-----------------------------------------

As AI writes more code, two strong positions keep appearing.

At one end is outcome-first development. Describe the task, let the agent implement it, run the application, check the result and accept the change. Do not spend time reading every line if the behavior is correct.

At the other end is code-first craftsmanship. AI may type the implementation, but a developer should still understand the structure, inspect the important details and leave the codebase maintainable.

The material that inspired this article described three versions of this spectrum: judging the outcome, defining the contract and constraints, or caring closely about the generated code. I do not think one of them wins everywhere.

The better question is not, “Should I read AI-generated code?”

It is, “How will I build enough trust in this change?”

For a script that renames a few local files once, I may inspect the inputs, run it on copies and compare the output. Reading every line may add little.

For a prototype that will be discarded next week, a smoke test may be a rational level of evidence.

For authorization, payments, user data or a foundation that the team will extend for five years, “it seems to work” is nowhere near enough.

The code is cheap in all three cases. Failure is not.

**Verification Is Part of Programming**
---------------------------------------

Verification does not mean only reading code. It can include:

*   a narrow change with explicit acceptance criteria
*   type checking, linting and static analysis
*   unit, integration and end-to-end tests
*   security checks and dependency review
*   a second human or agent challenging the solution
*   production observability
*   staged rollout and a reliable way to revert

None of these is magical. Tests can confirm the wrong requirements. A reviewer can miss a subtle error. Types cannot prove that a business rule is correct. Observability can tell us about damage only after deployment.

Trust comes from combining evidence appropriate to the risk.

I find it useful to look at five properties of a change:

![Three verification levels showing stronger evidence as software risk rises from a disposable script to authorization, payments and user data.](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*-ybZO7aH6-dMyQauTG9Dfw.png)

_Verification should scale with the cost and reversibility of failure._

Targeted is important. Experience does not always mean reading everything. Sometimes it means knowing where to look.

This is close to what current developer surveys show. In Stack Overflow’s 2025 survey, more respondents distrusted the accuracy of AI tools than trusted it, and the most common frustration was an answer that was almost right. Developers are already discovering that generation and acceptance are separate tasks. [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/ai)

DORA’s 2025 research describes AI as an amplifier of the engineering system around it. Faster generation helps most when teams also have fast, high-quality feedback loops. If a team already struggles to review, test and deploy small changes, producing more code can magnify the weakness. [DORA 2025](https://dora.dev/research/2025/dora-report/).

The bottleneck may be moving from production to evaluation.

But that does not make the evaluator passive. Designing the evidence is now part of the implementation.

**Experience as the Ability to Choose**
---------------------------------------

An experienced developer has usually seen abstractions that promised simplicity and made everything harder six months later.

*   Global state introduced too early.
*   A library that became impossible to remove.
*   A framework applied to a problem that needed a small function.
*   A locally elegant design that did not fit the rest of the system.
*   This is difficult to encode as API knowledge. It is a library of consequences.

AI can give me five architecturally respectable solutions. My experience may help me notice that one is too unfamiliar for the team, one creates a permanent dependency for a temporary problem, and one assumes a scale we will probably never reach.

That does not mean the senior developer should defend familiar solutions against anything new. AI can search a wider space than I can. It can expose me to a pattern I did not know and challenge an assumption I stopped noticing.

The value is not in always being right. It is in asking what the alternatives optimize for, which constraints matter here and what evidence could prove the choice wrong.

Experience is becoming less about owning the implementation and more about taking responsibility for the selection.

**Should We Still Learn Programming From the Ground Up?**
---------------------------------------------------------

This question becomes harder for people entering the field.

If an agent can generate an application, should a junior still learn the fundamentals?

I think so, but the reason changes. The goal is not to reproduce every implementation from memory. It is to build a model of what the system is doing.

What happens when a request starts? Where does state live? What happens when the same event arrives twice? What does cancellation mean? Why does the view render again? What does a cache return after the source changes? Where does an error go?

Without that model, a working result is hard to distinguish from a result that works only in the happy path.

There is a real paradox here. AI can make programming easier to learn because it can explain unfamiliar code, generate examples and provide immediate feedback. It can also make it easy to skip the exact friction that builds a useful mental model.

We do not yet have strong long-term evidence about what constant agent use will do to junior development. So I do not want to turn this concern into a fact.

But I would not confuse completing more exercises with understanding more systems.

**Adaptation or FOMO?**
-----------------------

Developers have always had fear of missing out.

Learn React. Angular is dying. Try Vue. Adopt the new state library. Rewrite everything with the latest pattern.

AI multiplied the pressure: a new model, agent, editor, MCP server, skill, subagent, context technique or software factory every week. Someone deleted their IDE. Someone else no longer reads code. A third person built an application in two hours.

It is easy to conclude that the way I work is already obsolete.

I try to separate adaptation from FOMO with a simple test.

Adaptation starts with a problem and looks for a tool that improves the outcome.

FOMO starts with a tool and looks for a problem that justifies using it.

This is the same mistake we made with libraries, only at a higher speed. Yesterday we wanted a library for every problem. Today we may want an agent for every problem. The vocabulary changed. The thinking did not.

I do need to update my workflow. AI is not just another autocomplete, and some skills I spent years practicing will matter less. Ignoring that would be nostalgia.

But adaptation does not require copying the workflow of somebody building disposable side projects when I am changing a ten-year-old system. Context is not resistance to change. It is the reason engineering exists.

**The Cost of a Good Decision**
-------------------------------

So what is valuable when code is cheap?

Recognizing the problem. Defining constraints. Choosing tools. Understanding trade-offs. Specifying what correct means. Building evidence. Debugging what the agent did not anticipate. Understanding the product. Simplifying. Knowing the cost of failure. Deciding that something does not need to be built.

And accepting responsibility for the result, even when I did not type it.

AI has lowered the cost of producing code. It has not necessarily lowered the cost of a good decision.

Looking back at eight years of learning Angular and software development, I no longer think the time was wasted. I may simply have described the outcome incorrectly.

I thought I was learning to write increasingly better code.

Much of the time, I was learning to recognize problems, predict consequences and remember solutions that once looked clever and later failed.

Today I am learning when to let AI write the code for me, when to read it, how to verify it and when the best decision is not to generate it at all.

Maybe that is still learning to program.

Programming just no longer means only writing code.
