# Arcube URL Shortening Service

A URL shortening service built with Next.js by Mohamed Cherif.

## Overview

This application provides a simple and efficient way to shorten URLs. It's built using Next.js for both the frontend and backend, leveraging its latest features like server components, client components, Turbopack for bundling, server actions, and the API routes (similar to Express.js). The project also incorporates modern development practices with comprehensive linting, formatting, and testing tools.

### Key Features

- **Smooth Developer Experience:** Optimized for Visual Studio Code with recommended extensions, non-interfering rules, linting, and code formatting.
- **URL Listing:** Displays a list of all shortened URLs.
- **Pagination:** Implements pagination for the URL list.
- **API Documentation:** API documentation is available in `API-Doc.md` in the root directory.
  > Note: While OpenAPI and Swagger were considered, compatibility issues with React 19 led to this alternative documentation approach.

## Tech Stack

- **Frontend/Backend:** Next.js (Full-stack)
- **Language:** TypeScript (Fully typed)
- **Database:** MongoDB Atlas
- **ORM:** Prisma
- **Validation:** Zod
- **Short URL Generation:** NanoID
- **UI Components:** Shadcn
- **Styling:** Tailwind CSS
- **Icons:** Lucid-react
- **Notifications:** Sonner
- **Linting:** Eslint
- **Formatting:** Prettier
- **Unit Testing:** Vitest
- **End-to-End Testing:** Playwright
- **Environment Management:** Nvm
- **Runtime:** Node.js, npm
- **IDE:** Visual Studio Code
- **Browser:** Google Chrome
- **Operating Systems:** Windows 11, Ubuntu (WSL2)

## Application Description

The home page features an input field that accepts valid URLs (including `http://`, `https://`, IPv4, and IPv6). Upon submission via the "Shorten" button, a toast notification displays a success or error message. Below the form, a message "No URLs shortened yet" is shown when the database is empty. Once URLs are stored, a paginated list (5 items per page) of shortened and original URLs is displayed.

### Demo Video

Check out the application demo: [Watch on Loom](https://www.loom.com/share/add231c9cfe94584b5a3c6fa216b9437?sid=0cd3096f-88f6-470c-9c65-9cce87fa494c)

## Local Development Setup

1.  Clone the repository: `git clone <repository_url>`
2.  `nvm use` if your using Node Version
3.  Install dependencies: `npm install` or `npm i`
4.  Create a `.env` file in the root directory and set `NODE_ENV="development"`.
5.  Generate Prisma client: `npx prisma generate`
6.  Run the development server: `npm run dev`
7.  Run unit tests: `vitest --reporter=verbose`
8.  Run end-to-end tests: `npx playwright test --ui` (You might be prompted to install additional Playwright dependencies.)
