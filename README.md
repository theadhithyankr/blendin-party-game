# Blendin Party Game

Next.js social deduction party game with AI-generated keywords and role reveal, discussion, voting, and results flows.

## Key Features
- Next.js social deduction party game with AI-generated keywords and role reveal, discussion, voting, and results flows
- AI/service layer is separated into dedicated source files so prompts, model calls, and UI actions are easier to inspect.
- Firebase or Genkit files are documented where the repository uses them for app services or AI workflows.
- Organized UI components and screens make the main user flows visible from the project structure.
- Package scripts provide reproducible development, build, and preview commands.

## Tech Stack
- JavaScript/TypeScript
- Next.js
- React
- Tailwind CSS
- Firebase

## Project Structure
- src/app or app - application routes, screens, and layout files.
- components - reusable UI and workflow components.
- src/ai - AI flows, model setup, or prompt orchestration.

## Setup and Run
```bash
git clone https://github.com/theadhithyankr/blendin-party-game.git
cd blendin-party-game
npm install
npm run dev
npm run build
```

## What This Project Demonstrates
- Building user-facing web applications with component-based UI and modern frontend tooling.
- Integrating managed backend services for auth, persistence, realtime data, or app infrastructure.
- Presenting project scope, setup, and technical choices clearly for reviewers and recruiters.

## Repository
- GitHub: https://github.com/theadhithyankr/blendin-party-game
