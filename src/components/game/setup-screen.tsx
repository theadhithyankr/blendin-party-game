'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { predefinedTopics } from '@/lib/predefined-topics';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BlendInIcon } from '@/components/icons';
import { X, Users, Loader2 } from 'lucide-react';
import type { SetupOptions } from '@/lib/game-types';

const topicKeys = Object.keys(predefinedTopics);

type SetupScreenProps = {
  onStartGame: (options: SetupOptions) => Promise<boolean>;
};

export default function SetupScreen({ onStartGame }: SetupScreenProps) {
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(topicKeys[0]);
  const [customTopic, setCustomTopic] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPlayer = () => {
    if (newPlayerName.trim() && !playerNames.includes(newPlayerName.trim())) {
      setPlayerNames([...playerNames, newPlayerName.trim()]);
      setNewPlayerName('');
    }
  };

  const handleRemovePlayer = (name: string) => {
    setPlayerNames(playerNames.filter((p) => p !== name));
  };
  
  const handleTopicChange = (value: string) => {
    if (value === 'custom') {
      setIsCustom(true);
      setSelectedTopic('');
    } else {
      setIsCustom(false);
      setSelectedTopic(value);
      setCustomTopic('');
    }
  }

  const canStart = playerNames.length >= 3 && (selectedTopic || customTopic.trim());

  const handleSubmit = async () => {
    if (!canStart) return;
    setIsLoading(true);
    const success = await onStartGame({
      playerNames,
      topic: selectedTopic,
      customTopic: isCustom ? customTopic : undefined,
    });
    if (!success) {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="text-center">
        <div className="flex justify-center items-center gap-4 mb-2">
            <BlendInIcon className="h-10 w-10 text-primary" />
            <CardTitle className="text-4xl font-bold tracking-tighter">
            Blend In!
            </CardTitle>
        </div>
        <CardDescription>The party game of suspicion and deception.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="new-player" className="text-lg font-semibold">1. Add Players</Label>
          <div className="flex gap-2">
            <Input
              id="new-player"
              placeholder="Enter player name"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
              disabled={isLoading}
            />
            <Button onClick={handleAddPlayer} disabled={!newPlayerName.trim() || isLoading}>Add</Button>
          </div>
          <div className="space-y-2">
            {playerNames.map((name) => (
              <div key={name} className="flex items-center justify-between bg-secondary p-2 rounded-md">
                <span className="font-medium">{name}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemovePlayer(name)} disabled={isLoading}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          {playerNames.length < 3 && (
            <Alert variant="default">
                <Users className="h-4 w-4" />
                <AlertTitle>More Players Needed</AlertTitle>
                <AlertDescription>You need at least 3 players to start a game.</AlertDescription>
            </Alert>
          )}
        </div>
        <div className="space-y-3">
          <Label className="text-lg font-semibold">2. Choose a Topic</Label>
          <RadioGroup onValueChange={handleTopicChange} defaultValue={selectedTopic} disabled={isLoading}>
            {topicKeys.map((topic) => (
                 <div key={topic} className="flex items-center space-x-2">
                    <RadioGroupItem value={topic} id={topic} />
                    <Label htmlFor={topic}>{topic}</Label>
                </div>
            ))}
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Custom Topic</Label>
            </div>
          </RadioGroup>
          {isCustom && (
            <Input
              placeholder="Enter custom topic"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              className="mt-2"
              disabled={isLoading}
            />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full text-lg" size="lg" onClick={handleSubmit} disabled={!canStart || isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            {isLoading ? 'Starting...' : 'Start Game'}
        </Button>
      </CardFooter>
    </Card>
  );
}
