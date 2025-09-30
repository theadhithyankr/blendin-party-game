'use server';

import { suggestTopicKeywordsAndHints } from '@/ai/flows/suggest-topic-keywords-and-hints';
import type { GameState, SetupOptions } from '@/lib/game-types';
import { predefinedTopics } from '@/lib/predefined-topics';

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function startGame(options: SetupOptions): Promise<GameState> {
  const { playerNames, topic, customTopic } = options;
  const gameTopic = customTopic || topic;

  let keywords: string[] = [];
  let hint: string = '';

  if (customTopic) {
    const result = await suggestTopicKeywordsAndHints({ topic: customTopic });
    keywords = result.keywords;
    hint = result.hint;
  } else {
    const predefined = predefinedTopics[topic];
    keywords = predefined.keywords;
    hint = predefined.hint;
  }

  const keyword = keywords[Math.floor(Math.random() * keywords.length)];

  const impostorIndex = Math.floor(Math.random() * playerNames.length);

  const players = playerNames.map((name, index) => ({
    id: crypto.randomUUID(),
    name,
    isImpostor: index === impostorIndex,
    secret: index === impostorIndex ? hint : keyword,
    votesReceived: 0,
  }));

  const shuffledPlayers = shuffleArray(players);

  return {
    stage: 'reveal',
    players: shuffledPlayers,
    topic: gameTopic,
    impostorHint: hint,
    turnPlayerIndex: 0,
    discussionRounds: 0,
  };
}
