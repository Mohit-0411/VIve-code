This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

1. Framework & Architecture
Next.js (App Router): Powers the frontend, routing (app/ directory), dynamic pages ([slug]), and server-side data fetching.

2. Content Management System (CMS)
Sanity.io: Embedded CMS backend managed via Sanity Studio (/studio).

GROQ (Graph-Relational Object Queries): Query language used to fetch content from Sanity.

@sanity/image-url: Utility for building image URLs and handling asset hotspots/crops.

3. Language & Styling
TypeScript (.ts / .tsx): Provides type safety for components, Sanity schemas, and API responses.

Tailwind CSS: Utility-first CSS framework for layout, colors (e.g., amber, stone, zinc), flexbox, grids, and responsiveness.

4. Development & Runtime
Node.js & npm: Development environment and package management running local servers on `
