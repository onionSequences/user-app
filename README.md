# Family Circle

A private family directory built with Next.js and Firebase. Track relatives, their relationships, and upcoming birthdays — so you never forget again.

## Features

- Firebase Auth (email/password and Google sign-in)
- Private per-user family member lists
- Upcoming birthday panel (next 30 days)
- Server-side data access via Firebase Admin SDK
- Member CRUD with relationship and notes

## Getting started

### Prerequisites

- Node.js 18+
- A Firebase project with **Authentication** (Email/Password + Google) and **Firestore** enabled

### Environment variables

Copy `.env-example` to `.env.local` and fill in values:

```bash
cp .env-example .env.local
```

**Client config** — from Firebase Console → Project settings → Your apps → Web app.

**Admin config** — from Firebase Console → Project settings → Service accounts → Generate new private key. Map fields to:

- `FIREBASE_ADMIN_PROJECT_ID`
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY` (keep `\n` newlines or use literal newlines in `.env.local`)

### Firestore security rules

Deploy [`firestore.rules`](firestore.rules) to your Firebase project:

```bash
firebase deploy --only firestore:rules
```

### Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Data model

```
users/{uid}/members/{memberId}
  name, birthday, relationship, notes?, photoUrl?, createdAt, updatedAt
```

## Deploy

Deploy to [Vercel](https://vercel.com) and set the same environment variables in the project settings.

## Roadmap (post-v1)

- Shared family / invite codes
- Email or push birthday reminders
- Photo uploads via Firebase Storage
- Family tree visualization

## License

Private project.
