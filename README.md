# Family Circle

A private family directory built with Next.js and Firebase. Track relatives, their relationships, and upcoming birthdays — so you never forget again.

## Features

- Firebase Auth (email/password and Google sign-in)
- Private per-user family member lists
- Upcoming birthday panel (next 30 days)
- Server-side data access via Firebase Admin SDK
- Member CRUD with relationship and notes
- Email birthday reminders (day before and/or on the day)

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

**Email reminders** — from [Resend](https://resend.com):

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (e.g. `Family Circle <notifications@yourdomain.com>`)
- `CRON_SECRET` (random string; Vercel Cron sends this as a Bearer token)

### Firestore security rules

Deploy [`firestore.rules`](firestore.rules) to your Firebase project:

```bash
# One-time: log in and link your project (use NEXT_PUBLIC_FIREBASE_PROJECT_ID)
npx firebase login
npx firebase use --add

# Deploy rules
npm run deploy:rules
```

Without the Firebase CLI, you can paste `firestore.rules` into Firebase Console → Firestore → **Rules** → **Publish**.

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
users/{uid}
  email, remindersEnabled, notifyDayBefore, notifyDayOf, timezone

users/{uid}/members/{memberId}
  name, birthday, relationship, notes?, photoUrl?, createdAt, updatedAt

users/{uid}/sentReminders/{reminderId}
  memberId, type, year, sentAt
```

## Birthday email reminders

1. Open **Settings** and enable **Email reminders**.
2. Choose **Day before** and/or **On the day**.
3. A daily cron job (`7:00 UTC`) checks each user's timezone and sends emails via Resend.

Reminders are sent once per member per year (duplicates are prevented via `sentReminders`).

**Test locally** (with env vars set):

```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" http://localhost:3000/api/cron/birthday-reminders
```

## Deploy

Deploy to [Vercel](https://vercel.com) and set the same environment variables in the project settings. The cron schedule is defined in [`vercel.json`](vercel.json).

## Roadmap (post-v1)

- Shared family / invite codes
- Browser push notifications
- Photo uploads via Firebase Storage
- Family tree visualization

## License

Private project.
