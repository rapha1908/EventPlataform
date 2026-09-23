# Video Event Platform

A React and TypeScript prototype for browsing video events and watching scheduled lessons, using Apollo Client to consume Hygraph's GraphQL Content API.

## Background

This project began as an early prototype for TCCHE's video course experience. The broader idea was to release free lessons over time and introduce an advanced course offer after the final video. The project later evolved; this repository is an earlier draft, not the final production implementation.

For this portfolio demo, the prototype was recently adapted to support multiple events and connected to a new Hygraph project with fitness video content. The fitness content and multi-event adaptation are recent additions, rather than features presented as part of the original implementation.

## What this version demonstrates

- An event catalogue with descriptions, thumbnails and lesson counts.
- Event-specific schedules, with availability indicators based on lesson dates.
- YouTube and Vimeo playback, lesson descriptions and instructor information.
- Apollo queries with variables, an in-memory cache, and generated TypeScript types and React hooks.
- Distinct loading, error, empty and not-found states, with retries for failed queries.

The stack is React 18, TypeScript, Vite, React Router, Apollo Client, GraphQL Code Generator, Tailwind CSS and Vime. Hygraph provides the managed content backend. This repository demonstrates consuming GraphQL, not implementing an Apollo Server, Node.js API or PostgreSQL database.

## Running locally

1. Install Node.js and npm (Node.js 18+ is needed for the optional access-check script).
2. Run `npm ci`.
3. Copy `.env.example` to `.env.local` and set your Hygraph Content API endpoint.
4. Configure published-content read access in Hygraph. If using a token, use one limited to reading the demo's published content.
5. Run `npm run dev` and open the URL printed by Vite.

`npm run build` checks TypeScript and produces the static site in `dist`. `npm run preview` serves that build locally. A deployed host must serve `index.html` for client-side routes such as `/event/:eventSlug/lesson/:slug`.

### Content model

Use a Hygraph schema compatible with the queries in `src/graphql/queries`:

- `Event`: `id`, `slug`, `name`, `description`, and a `lessons` relation.
- `Lesson`: `id`, `slug`, `title`, `description`, `videoId`, `availableAt`, `lessonType` (`live` or `class`), and an optional `teacher` relation.
- `Teacher`: `name`, `bio`, and `avatarURL`.

Publish the content and its related records. `videoId` accepts a YouTube/Vimeo ID or supported URL. The `live` label is content metadata; this prototype does not implement live broadcasting.

The generated file `src/graphql/generated.ts` contains schema types and operation hooks. After schema or operation changes, run `npm run codegen` with `VITE_API_URL` and `VITE_API_ACCESS_TOKEN` set in the shell environment. The standalone code generator does not automatically load Vite's `.env.local` file.

## Registration and prototype boundaries

`src/Pages/Subscribe.tsx` and `src/graphql/mutations/create-subscribe.graphql` retain an earlier subscriber-registration experiment. **The registration page is not connected to the current router**, and the demo does not offer a working signup flow. Here, “subscriber” means an email registration, not a paid subscription or a real-time GraphQL subscription.

The advanced-course offer, checkout and paid subscriptions are not implemented in this draft. Availability dates only control navigation in the UI; they are not an authorization mechanism. There is no user authentication, entitlement enforcement or saved viewing progress. Social and download placeholders have been removed because this demo has no destinations for them.

## API access review

Vite embeds referenced `VITE_*` values in the browser bundle. `.env.local` is ignored by Git, but this does **not** make a frontend token secret. The client now omits the Authorization header when no token is configured, allowing public read access if enabled in Hygraph.

Read-only checks against the configured demo endpoint on 23 September 2026 found:

| Request | Result |
| --- | --- |
| Published event query without token | Denied (GraphQL 403) |
| Draft event query without token | Denied (GraphQL 403) |
| Published event query with configured token | Succeeded and returned an event |
| Draft event query with configured token | Denied (GraphQL 403) |

The probe selects event IDs and nested lesson/instructor IDs, but prints no content, endpoint or credentials. Re-run it with `node scripts/check-api-access.mjs` (requires `.env.local`). These results establish only the access observed for those queries. They do **not** prove that writes, management access or access to other models are disabled. The local token has no permission claims that settle those questions. No mutations were executed during the review.

Before sharing a hosted build, verify the token in Hygraph's project settings under API access / Permanent Auth Tokens: allow only Read for the required public demo models at the PUBLISHED stage; exclude subscriber data, writes and management permissions. Alternatively, configure narrowly scoped public read permissions and leave the frontend token empty. A registration feature should use a server-side integration for any privileged write token.

See the official [Hygraph authorization documentation](https://hygraph.com/docs/api-reference/basics/authorization) and [API access settings](https://hygraph.com/docs/getting-started/access-and-permissions/api-access).
