"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import type { Contact } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PhoneOff, Mic, MicOff, Volume2, Video, UserPlus, Circle, Settings, VolumeX } from 'lucide-react';

interface ActiveCallScreenProps {
  caller: Pick<Contact, 'name' | 'number' | 'avatar'>;
  onEndCall: (duration: number) => void;
}

const ActiveCallScreen: FC<ActiveCallScreenProps> = ({ caller, onEndCall }) => {
  const [timer, setTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const actionButtons = [
    { label: isMuted ? 'Unmute' : 'Mute', icon: isMuted ? MicOff : Mic, action: () => setIsMuted(!isMuted), active: isMuted },
    { label: 'Settings', icon: Settings, action: () => {}, active: false },
    { label: isSpeaker ? 'Earpiece' : 'Speaker', icon: isSpeaker ? VolumeX : Volume2, action: () => setIsSpeaker(!isSpeaker), active: isSpeaker },
    { label: 'Add call', icon: UserPlus, action: () => {}, active: false },
    { label: 'Video', icon: Video, action: () => {}, active: false },
    { label: isRecording ? 'Stop' : 'Record', icon: Circle, action: () => setIsRecording(!isRecording), active: isRecording, activeClass: 'text-red-500' },
  ];

  return (
    <div className="absolute inset-0 bg-card flex flex-col items-center justify-between p-8 text-foreground z-40">
      <div className="text-center mt-8">
        <h2 className="text-3xl font-headline font-bold">{caller.name}</h2>
        <p className="text-lg text-muted-foreground mt-1">{caller.number}</p>
        <p className="text-lg text-primary mt-2">{formatTime(timer)}</p>
      </div>
      
      <div className="flex-grow flex items-center">
        <Avatar className="w-40 h-40 border-4 border-primary/50">
            <AvatarImage src={caller.avatar.imageUrl} alt={caller.name} data-ai-hint={caller.avatar.imageHint} />
            <AvatarFallback className="text-5xl">{caller.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>

      <div className="grid grid-cols-3 gap-6 w-full max-w-xs mb-8">
        {actionButtons.map(({ label, icon: Icon, action, active, activeClass }) => (
          <div key={label} className="flex flex-col items-center">
            <Button
              variant="ghost"
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${active ? 'bg-primary/20' : 'bg-muted/50'}`}
              onClick={action}
              aria-label={label}
            >
              <Icon className={`h-6 w-6 ${active && activeClass ? activeClass : ''}`} />
            </Button>
            <span className="mt-2 text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      <Button
        className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 shadow-lg"
        onClick={() => onEndCall(timer)}
        aria-label="End call"
      >
        <PhoneOff className="h-8 w-8 text-white" />
      </Button>
    </div>
  );
};

export default ActiveCallScreen;
