---
title: "Getting Started with Angular"
excerpt: "Learn the basics of Angular and how to create your first application."
date: "2024-01-15"
image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800"
category: "Programming"
slug: getting-started-with-angular
---


Angular is a powerful framework for building web applications. In this guide, we'll walk through the basics of setting up your first Angular project.

## Prerequisites

Before we begin, make sure you have:
- Node.js installed
- npm (Node Package Manager)
- Basic knowledge of TypeScript

## Creating Your First Project

To create a new Angular project, run:

```bash
ng new my-first-app
```

This command will create a new directory with all the necessary files and dependencies.

## Project Structure

Let's look at the key files and directories in an Angular project:

- `src/app`: Contains your application code
- `src/assets`: For static files like images
- `src/environments`: Configuration files

## Components

Components are the building blocks of Angular applications. Here's a simple component:

```typescript
@Component({
  selector: 'app-hello',
  template: '<h1>Hello, {{name}}!</h1>'
})
export class HelloComponent {
  name = 'World';
}
```

## Next Steps

Now that you have your first Angular project set up, you can:
1. Create more components
2. Add routing
3. Implement services
4. Style your application

Stay tuned for more Angular tutorials!