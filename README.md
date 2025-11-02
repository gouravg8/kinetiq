# Kinetiq - Fitness Tracker

A modern, comprehensive workout tracking application designed for serious fitness enthusiasts. Track your workouts, monitor progress, and achieve your fitness goals with an intuitive interface and powerful analytics.

## Features

- **Smart Workout Planning**: Plan and organize workouts with an intuitive weekly calendar view
- **Progress Tracking**: Monitor your fitness journey with detailed statistics and analytics
- **Achievement System**: Stay motivated with streak tracking and achievement badges
- **Exercise Library**: Access a comprehensive database of exercises with detailed tracking
- **User Authentication**: Secure login system powered by Better Auth
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Theme**: Modern dark UI with yellow accents

## Tech Stack

- **Frontend**: Next.js 15.4.2 with App Router
- **UI Framework**: Ant Design + Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Jotai
- **Authentication**: Better Auth
- **Database**: PostgreSQL with Drizzle ORM
- **Query Management**: TanStack React Query
- **Styling**: CSS-in-JS with custom theme variables
- **TypeScript**: Strict mode enabled

## Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm package manager

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/gouravg8/kinetiq.git
   cd kinetiq
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/kinetiq_db
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Database Setup**
   
   Run the database migrations:
   ```bash
   pnpm drizzle-kit push
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `pnpm dev` - Start the development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── api/         # API routes
│   ├── dashboard/   # Dashboard page
│   └── signin/      # Authentication page
├── components/      # Reusable UI components
├── db/              # Database schema and configurations
├── hooks/           # Custom React hooks
├── Jotai/           # State management atoms
├── lib/             # Utility functions
├── store/           # Additional state management
├── theme/           # Ant Design theme configurations
└── types/           # TypeScript type definitions
```

## Database

The application uses PostgreSQL with Drizzle ORM for type-safe database operations. The schema is defined in `src/db/schema.ts`.

To generate and run migrations:
```bash
pnpm drizzle-kit generate
pnpm drizzle-kit push
```

## Authentication

Authentication is handled by Better Auth, providing secure user sessions and OAuth integration capabilities.

## Deployment

The application is optimized for deployment on Vercel, Netlify, or any platform supporting Next.js applications.

1. Build the application:
   ```bash
   pnpm build
   ```

2. Set environment variables in your deployment platform

3. Deploy the `.next` build output

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

- todos
- [x] add option like rest day, cheat day with custom icons
- [x] make bottom stats card workable with backend data(wip for streak)
- [ ] add the platform options in db(for stats) like. mobile/web, mobile version, os version(if possible)
- [ ]  skeleton while loading data
- [ ] add biceps, triceps(instead of arms) in edit/add workout
- [ ] user can customize how much exercises they do on week
- [ ] starts cards
  - steak  
    - how to calculate; should i count rest and cheat days
    - what about the user with 3 days per week goal
    - what if user want to change the goal after a time
- [ ] reset session every 2 days
- [ ] add favicon

## License

This project is private and proprietary.
