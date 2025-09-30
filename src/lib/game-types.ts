export type Player = {
  id: string;
  name: string;
  isImpostor: boolean;
  secret: string;
  votedFor?: string; // player id
  votesReceived: number;
};

export type GameStage =
  | 'setup'
  | 'reveal'
  | 'discussion'
  | 'voting'
  | 'results';

export type GameState = {
  stage: GameStage;
  players: Player[];
  topic: string;
  impostorHint: string;
  turnPlayerIndex: number;
  discussionRounds: number;
};

export type SetupOptions = {
    playerNames: string[];
    topic: string;
    customTopic?: string;
}
