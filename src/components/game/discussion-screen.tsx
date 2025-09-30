'use client';

import type { Player } from '@/lib/game-types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, MessageCircle } from 'lucide-react';

type DiscussionScreenProps = {
  players: Player[];
  currentPlayerIndex: number;
  discussionRounds: number;
  onNextTurn: () => void;
  onStartVoting: () => void;
};

export default function DiscussionScreen({
  players,
  currentPlayerIndex,
  discussionRounds,
  onNextTurn,
  onStartVoting,
}: DiscussionScreenProps) {
  const currentPlayer = players[currentPlayerIndex];

  return (
    <Card className="w-full text-center animate-fade-in">
      <CardHeader>
        <div className="flex justify-center items-center gap-2">
            <MessageCircle className="h-8 w-8" />
            <CardTitle className="text-3xl">Discussion Time</CardTitle>
        </div>
        <CardDescription>
            Take turns describing your secret word. The impostor must blend in!
            <br />
            Round {discussionRounds + 1}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-6 rounded-lg bg-secondary/50 text-center">
            <p className="text-xl text-muted-foreground">It's your turn,</p>
            <p className="text-5xl font-bold text-primary tracking-tight">{currentPlayer.name}</p>
        </div>
        
        <div className="space-y-3">
          <p className="font-semibold">Turn Order</p>
          <div className="flex flex-wrap justify-center gap-2">
            {players.map((player, index) => (
              <Badge
                key={player.id}
                variant={index === currentPlayerIndex ? 'default' : 'secondary'}
                className="text-lg p-2 px-4 shadow-sm"
              >
                <User className="mr-2 h-4 w-4" />
                {player.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button className="w-full" size="lg" onClick={onNextTurn}>Next Turn</Button>
        {discussionRounds >= 1 && (
            <Button className="w-full" size="lg" variant="destructive" onClick={onStartVoting}>Go to Vote</Button>
        )}
      </CardFooter>
    </Card>
  );
}
