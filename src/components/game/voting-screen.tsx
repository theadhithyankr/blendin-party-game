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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Eye, ThumbsUp, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';


type VotingScreenProps = {
    players: Player[];
    currentPlayerIndex: number;
    onVoteCast: (voterId: string, votedForId: string) => void;
    onShowResults: () => void;
};

export default function VotingScreen({
  players,
  currentPlayerIndex,
  onVoteCast,
  onShowResults
}: VotingScreenProps) {
  const [viewState, setViewState] = useState<'handoff' | 'voting'>('handoff');
  const [selectedVote, setSelectedVote] = useState<string | null>(null);

  const isFinishedVoting = currentPlayerIndex >= players.length;

  if (isFinishedVoting) {
     return (
        <Card className="w-full text-center animate-fade-in">
            <CardHeader>
                <CardTitle className="text-3xl">Voting Complete!</CardTitle>
                <CardDescription>All votes have been cast.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="lg" onClick={onShowResults}>
                    <CheckSquare className="mr-2" />
                    See the Results
                </Button>
            </CardContent>
        </Card>
     )
  }

  const voter = players[currentPlayerIndex];
  const candidates = players.filter(p => p.id !== voter.id);

  const handleReadyToVote = () => setViewState('voting');

  const handleConfirmVote = () => {
    if (!selectedVote) return;
    onVoteCast(voter.id, selectedVote);
    setSelectedVote(null);
    setViewState('handoff');
  };

  if (viewState === 'handoff') {
    return (
        <Card className="w-full text-center animate-fade-in">
            <CardHeader>
                <CardTitle className="text-3xl">Pass the device to</CardTitle>
                <p className="text-4xl font-bold text-primary">{voter.name}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <CardDescription>
                It's your turn to vote for who you think is the impostor.
                </CardDescription>
                <Button size="lg" onClick={handleReadyToVote}>
                <Eye className="mr-2" />
                Ready to Vote
                </Button>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="w-full text-center animate-fade-in">
      <CardHeader>
        <CardTitle className="text-3xl">Vote, {voter.name}!</CardTitle>
        <CardDescription>Who is the impostor?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
            value={selectedVote ?? undefined}
            onValueChange={setSelectedVote}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
            {candidates.map(candidate => (
                <Label key={candidate.id} htmlFor={candidate.id} className={cn(
                    "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors",
                    selectedVote === candidate.id && "border-primary bg-primary/10"
                )}>
                    <RadioGroupItem value={candidate.id} id={candidate.id} className="sr-only" />
                    <span className="text-2xl font-bold">{candidate.name}</span>
                </Label>
            ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" onClick={handleConfirmVote} disabled={!selectedVote}>
          <ThumbsUp className="mr-2" />
          Confirm Vote
        </Button>
      </CardFooter>
    </Card>
  );
}
