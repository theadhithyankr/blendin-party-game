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
import { Award, RefreshCw, UserCheck, UserX } from 'lucide-react';
import { Badge } from '../ui/badge';

type ResultsScreenProps = {
  players: Player[];
  onPlayAgain: () => void;
};

export default function ResultsScreen({
  players,
  onPlayAgain,
}: ResultsScreenProps) {
  const impostor = players.find((p) => p.isImpostor)!;
  
  let maxVotes = 0;
  let votedOutPlayers: Player[] = [];

  players.forEach(player => {
    if (player.votesReceived > maxVotes) {
      maxVotes = player.votesReceived;
      votedOutPlayers = [player];
    } else if (player.votesReceived === maxVotes && maxVotes > 0) {
      votedOutPlayers.push(player);
    }
  });

  const impostorWasCaught = votedOutPlayers.length === 1 && votedOutPlayers[0].isImpostor;
  const crewWins = impostorWasCaught;

  const getPlayerById = (id: string) => players.find(p => p.id === id)?.name;

  return (
    <Card className="w-full text-center animate-fade-in">
      <CardHeader>
        <CardTitle className="text-4xl font-bold">Game Over!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="p-6 rounded-lg bg-secondary/50 border-2 border-dashed">
            <p className="text-xl text-muted-foreground">The Impostor was...</p>
            <p className="text-5xl font-bold text-primary tracking-tight">{impostor.name}</p>
        </div>
        
        <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Voting Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {players.map(player => (
                    <div key={player.id} className="p-3 bg-secondary rounded-lg">
                        <p className="font-bold text-lg flex items-center">
                            {player.isImpostor ? <UserX className="mr-2 h-5 w-5 text-destructive" /> : <UserCheck className="mr-2 h-5 w-5 text-green-500" />}
                            {player.name}
                        </p>
                        <p className="text-muted-foreground ml-7">
                            Voted for: <span className="font-semibold text-foreground">{player.votedFor ? getPlayerById(player.votedFor) : 'N/A'}</span>
                        </p>
                        <div className="ml-7 mt-1">
                            Votes received: <Badge variant={player.votesReceived > 0 ? "destructive" : "secondary"}>{player.votesReceived}</Badge>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="p-6 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20">
            <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
                <Award className="h-8 w-8"/>
                {crewWins ? "The Crew Wins!" : "The Impostor Wins!"}
            </h3>
            <CardDescription className="mt-2 text-lg">
                {crewWins ? `${impostor.name} was caught! Congratulations to the crew.` : `${impostor.name} successfully blended in!`}
            </CardDescription>
        </div>

      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" onClick={onPlayAgain}>
            <RefreshCw className="mr-2" />
            Play Again
        </Button>
      </CardFooter>
    </Card>
  );
}
