'use client';

import type { Player } from '@/lib/game-types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserCheck, UserX, Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

type RevealRolesScreenProps = {
  players: Player[];
  onFinished: () => void;
};

export default function RevealRolesScreen({
  players,
  onFinished,
}: RevealRolesScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const currentPlayer = players[currentIndex];
  const isLastPlayer = currentIndex === players.length - 1;

  const handleReveal = () => setIsRevealed(true);

  const handleNext = () => {
    if (isLastPlayer) {
      onFinished();
    } else {
      setIsRevealed(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <Card className="w-full text-center animate-fade-in">
      {!isRevealed ? (
        <>
          <CardHeader>
            <CardTitle className="text-3xl">Pass the device to</CardTitle>
            <p className="text-4xl font-bold text-primary">{currentPlayer.name}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription>
              Only {currentPlayer.name} should see the next screen. Everyone else, look away!
            </CardDescription>
            <Button size="lg" onClick={handleReveal}>
              <Eye className="mr-2" />
              Ready to see my role
            </Button>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle className="text-3xl">Your Role, {currentPlayer.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-8 rounded-lg bg-secondary/50 border-2 border-dashed border-primary">
                {currentPlayer.isImpostor ? (
                    <div className="flex flex-col items-center gap-4">
                        <UserX className="h-16 w-16 text-destructive" />
                        <p className="text-2xl font-bold text-destructive">You are the Impostor!</p>
                        <Alert variant="destructive">
                            <AlertTitle>Your Hint</AlertTitle>
                            <AlertDescription className="text-lg">{currentPlayer.secret}</AlertDescription>
                        </Alert>
                        <p className="text-muted-foreground">Your goal is to blend in and not get caught. Good luck.</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <UserCheck className="h-16 w-16 text-green-500" />
                        <p className="text-2xl font-bold">You are not the impostor.</p>
                         <Alert>
                            <AlertTitle>The Secret Word</AlertTitle>
                            <AlertDescription className="text-lg">{currentPlayer.secret}</AlertDescription>
                        </Alert>
                        <p className="text-muted-foreground">Your goal is to find the player who doesn't know the word.</p>
                    </div>
                )}
            </div>

            <Button size="lg" onClick={handleNext}>
              <EyeOff className="mr-2" />
              {isLastPlayer ? "I'm ready! Start discussion" : "Hide and pass to next player"}
            </Button>
          </CardContent>
        </>
      )}
    </Card>
  );
}
