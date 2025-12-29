"use client";

import type { FC } from 'react';
import type { Contact } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Phone, PhoneOff } from 'lucide-react';

interface IncomingCallScreenProps {
  caller: Pick<Contact, 'name' | 'number' | 'avatar'>;
  onAccept: () => void;
  onDecline: () => void;
}

const IncomingCallScreen: FC<IncomingCallScreenProps> = ({ caller, onAccept, onDecline }) => {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-xl flex flex-col items-center justify-between p-8 text-foreground z-50">
      <div className="text-center mt-16">
        <p className="text-lg text-muted-foreground">Incoming call...</p>
      </div>

      <div className="flex flex-col items-center">
        <Avatar className="w-32 h-32 border-4 border-primary mb-4">
          <AvatarImage src={caller.avatar.imageUrl} alt={caller.name} data-ai-hint={caller.avatar.imageHint} />
          <AvatarFallback className="text-4xl">{caller.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="text-4xl font-headline font-bold">{caller.name}</h2>
        <p className="text-lg text-muted-foreground mt-1">{caller.number}</p>
      </div>

      <div className="flex justify-around w-full max-w-xs">
        <div className="flex flex-col items-center">
            <Button
                className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 shadow-lg"
                onClick={onDecline}
                aria-label="Decline call"
            >
                <PhoneOff className="h-8 w-8 text-white" />
            </Button>
            <span className="mt-2 text-muted-foreground">Decline</span>
        </div>
        <div className="flex flex-col items-center">
            <Button
                className="w-20 h-20 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
                onClick={onAccept}
                aria-label="Accept call"
            >
                <Phone className="h-8 w-8 text-white" />
            </Button>
            <span className="mt-2 text-muted-foreground">Accept</span>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallScreen;
