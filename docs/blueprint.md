# **App Name**: Blend In!

## Core Features:

- Player Management: Allow users to add players to the game by name.
- Topic Selection: Choose from a list of predefined topics (e.g., movies, sports, tech, history), or enter a custom topic.
- Impostor Assignment: Randomly assign one player as the impostor. This assignment should happen server-side and be communicated individually to each client.
- Keyword/Hint Distribution: Distribute secret keywords related to the topic to non-impostor players and a vague hint to the impostor.
- Turn-Based Gameplay: Enable turn-based play where players describe, ask questions, or give clues, to determine the impostor
- Voting System: Allow players to vote on who they think the impostor is at the end of each round.
- Topic Suggestion Tool: Suggest a series of plausible keywords and hints. The LLM tool may reason on whether and when each suggestion might plausibly 'blend in' well enough.

## Style Guidelines:

- Primary color: HSL 220, 60%, 50% - A moderate blue (#337AB7) to give a classic and serious impression, for instance in calls to action
- Background color: HSL 220, 20%, 95% - An off-white (#F2F4F8), with the same bluish hue, as a clean and readable backdrop for the game
- Accent color: HSL 190, 60%, 50% - A cyan blue (#33ABB7), noticeably different from the primary color, provides interactive, fashionable interest
- Font: 'Inter', a grotesque sans-serif font. Suitable for both headlines and body text, to promote a modern, neutral appearance that does not distract from gameplay.
- Use simple, flat icons to represent topics and game actions. The iconography should be easy to understand at a glance.
- A clean, card-based layout will clearly delineate each round, question, and vote. Use whitespace to prevent a cluttered appearance.
- Subtle animations, such as a fade-in effect on turns or a highlight on voting options, enhance the user experience.