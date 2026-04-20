# Project Guidelines for Astro Personal Website

This is an Astro-based personal website project with React integration, Tailwind CSS styling, and Vercel deployment configuration.

## Project Structure

```
/
├── public/                 # Static assets (favicon, images, etc.)
├── src/
│   ├── layouts/           # Astro layout components
│   ├── pages/             # File-based routing (index.astro, etc.)
│   └── components/        # Reusable components (React/Astro)
├── prompt/                # Documentation and LLM context files
│   ├── llms.txt          # Astro overview and documentation links
│   └── llms-full.txt     # Complete Astro documentation
├── .junie/
│   ├── guidelines.md     # This file
│   └── mcp/mcp.json      # MCP server config for Astro docs
└── package.json          # Dependencies and scripts
```

## Technology Stack

- **Framework**: Astro 5.2.5 with React 19 integration
- **Styling**: Tailwind CSS with forms and typography plugins
- **Deployment**: Vercel
- **Email**: Resend integration
- **Language**: TypeScript support enabled

## Development Commands

All commands should be run from the project root:

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server at localhost:4321 |
| `npm run build` | Build production site to ./dist/ |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## Guidelines for Junie

### 1. Building and Testing
- **Always run `npm run build`** before submitting solutions to ensure the project compiles correctly
- **Test the development server** with `npm run dev` when making significant changes
- **Preview production builds** with `npm run preview` for deployment-related changes

### 2. Code Style and Architecture
- Follow **Astro's islands architecture** principles - minimize client-side JavaScript
- Use **server-first rendering** by default, only add client-side interactivity when necessary
- Prefer **Astro components** (.astro files) over React components when possible
- Use **TypeScript** for type safety
- Follow **Tailwind CSS** utility-first approach for styling
- Maintain **semantic HTML** structure for accessibility

### 3. File Organization
- Place page components in `src/pages/` (file-based routing)
- Store reusable components in `src/components/`
- Use `src/layouts/` for page layouts
- Keep static assets in `public/`
- Follow Astro's naming conventions (.astro, .tsx, .ts)

### 4. Performance Considerations
- Leverage Astro's **zero JS by default** philosophy
- Use `client:*` directives sparingly and only when interactivity is required
- Optimize images and assets for web delivery
- Consider using Astro's built-in optimizations

### 5. Documentation Resources
- Reference `prompt/llms.txt` for Astro overview and documentation links
- Use `prompt/llms-full.txt` for comprehensive Astro documentation
- Leverage the MCP server connection to Astro docs for real-time information
- Consult official Astro documentation at https://docs.astro.build

### 6. Deployment
- The project is configured for **Vercel deployment**
- Ensure all environment variables are properly configured
- Test builds locally before deployment
- Consider Vercel-specific optimizations and features

### 7. Content Management
- Use Astro's **content collections** for structured content when applicable
- Leverage built-in **Markdown support** for content-heavy pages
- Consider SEO implications for content-driven features

### 8. Integration Guidelines
- When adding new integrations, use `npm run astro add <integration>`
- Ensure React components use proper client-side directives when needed
- Test email functionality with Resend integration carefully
- Maintain Tailwind configuration for consistent styling

Remember: This is a **content-driven website** optimized for performance and SEO. Always prioritize fast loading times and great user experience.
