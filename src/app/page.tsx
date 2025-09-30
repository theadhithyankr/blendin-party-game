'use client';

import { useState } from 'react';
import type { GameState, SetupOptions, Player } from '@/lib/game-types';
import { useToast } from '@/hooks/use-toast';
import { startGame } from './actions';
import SetupScreen from '@/components/game/setup-screen';
import RevealRolesScreen from '@/components/game/reveal-roles-screen';
import DiscussionScreen from '@/components/game/discussion-screen';
import VotingScreen from '@/components/game/voting-screen';
import ResultsScreen from '@/components/game/results-screen';

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const { toast } = useToast();

  const handleStartGame = async (options: SetupOptions) => {
    try {
      const initialState = await startGame(options);
      setGameState(initialState);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error starting game',
        description: 'Could not generate keywords. Please try again.',
      });
      return false; // Indicate failure
    }
    return true; // Indicate success
  };

  const handleRolesRevealed = () => {
    setGameState((prev) => (prev ? { ...prev, stage: 'discussion' } : null));
  };

  const handleNextTurn = () => {
    setGameState((prev) => {
      if (!prev) return null;
      const nextTurn = prev.turnPlayerIndex + 1;
      if (nextTurn >= prev.players.length) {
        // End of a round
        return {
          ...prev,
          turnPlayerIndex: 0,
          discussionRounds: prev.discussionRounds + 1,
        };
      }
      return { ...prev, turnPlayerIndex: nextTurn };
    });
  };

  const handleStartVoting = () => {
    setGameState((prev) =>
      prev ? { ...prev, stage: 'voting', turnPlayerIndex: 0 } : null
    );
  };

  const handleVoteCast = (voterId: string, votedForId: string) => {
    setGameState((prev) => {
      if (!prev) return null;
      const newPlayers = prev.players.map((p) =>
        p.id === voterId ? { ...p, votedFor: votedForId } : p
      );
      return { ...prev, players: newPlayers, turnPlayerIndex: prev.turnPlayerIndex + 1 };
    });
  };

  const handleShowResults = () => {
     setGameState((prev) => {
      if (!prev) return null;

      const votes: Record<string, number> = {};
      prev.players.forEach(p => {
        votes[p.id] = 0;
      });

      prev.players.forEach(p => {
        if (p.votedFor && votes[p.votedFor] !== undefined) {
          votes[p.votedFor]++;
        }
      });
      
      const newPlayers = prev.players.map(p => ({
        ...p,
        votesReceived: votes[p.id] || 0,
      }));

      return { ...prev, players: newPlayers, stage: 'results' };
    });
  };

  const handlePlayAgain = () => {
    setGameState(null);
  };
  
  const renderGameStage = () => {
    if (!gameState) {
      return <SetupScreen onStartGame={handleStartGame} />;
    }

    switch (gameState.stage) {
      case 'setup':
        return <SetupScreen onStartGame={handleStartGame} />;
      case 'reveal':
        return (
          <RevealRolesScreen
            players={gameState.players}
            onFinished={handleRolesRevealed}
          />
        );
      case 'discussion':
        return (
          <DiscussionScreen
            players={gameState.players}
            currentPlayerIndex={gameState.turnPlayerIndex}
            discussionRounds={gameState.discussionRounds}
            onNextTurn={handleNextTurn}
            onStartVoting={handleStartVoting}
          />
        );
      case 'voting':
        return (
            <VotingScreen 
                players={gameState.players}
                currentPlayerIndex={gameState.turnPlayerIndex}
                onVoteCast={handleVoteCast}
                onShowResults={handleShowResults}
            />
        );
      case 'results':
        return (
          <ResultsScreen 
            players={gameState.players}
            onPlayAgain={handlePlayAgain}
          />
        );
      default:
        return <SetupScreen onStartGame={handleStartGame} />;
    }
  };

  return <div className="w-full max-w-2xl">{renderGameStage()}</div>;
}
