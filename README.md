# Search Demo

This project demonstrates how to let users search object types in Foundry's ontology from a third-party app that uses Foundry's APIs. There are three examples:

- Letting a user run a search by entering text and clicking a button (`/simple`)
- Letting a user run a serach by just entering text (`/typeahead`)
- Searching multiple object types at once (`/multiple`)

You can read this blog post about [how to build a search feature using Foundry's APIs](https://example.com) for more details.

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, create an environment file `.env.local` to store your [Foundry auth token](https://www.palantir.com/docs/foundry/api/general/overview/authentication/#authentication-during-development), the ontology rid (see the Advanced pane in the Ontology Manager app in Foundry), and your Foundry stack's hostname:

```
# .env.local
TOKEN=<your foundry token>
HOSTNAME=<your hostname>    # often in the form something.palantirfoundry.com
ONTOLOGYRID=<your ontology rid>
```

Then, run the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

Test PR
