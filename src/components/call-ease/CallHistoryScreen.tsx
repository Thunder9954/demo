"use client";

import type { FC } from 'react';
import type { CallLog } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Phone, ArrowUpRight, ArrowDownLeft, PhoneMissed } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CallHistoryScreenProps {
  callHistory: CallLog[];
  onCall: (number: string) => void;
}

const CallTypeIcon = ({ type }: { type: CallLog['type'] }) => {
  switch (type) {
    case 'incoming':
      return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
    case 'outgoing':
      return <ArrowUpRight className="h-4 w-4 text-blue-500" />;
    case 'missed':
      return <PhoneMissed className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

const CallHistoryScreen: FC<CallHistoryScreenProps> = ({ callHistory, onCall }) => {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-headline font-bold">Recents</h1>
      </header>
      <ScrollArea className="flex-grow">
        <div className="p-2">
          {callHistory.map((log) => (
            <div key={log.id} className="flex items-center p-2 rounded-lg hover:bg-muted/50">
              <Avatar className="h-10 w-10">
                <AvatarImage src={log.contact.avatar.imageUrl} alt={log.contact.name} data-ai-hint={log.contact.avatar.imageHint} />
                <AvatarFallback>{log.contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 flex-grow">
                <p className={`font-semibold ${log.type === 'missed' ? 'text-red-500' : 'text-foreground'}`}>
                  {log.contact.name}
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CallTypeIcon type={log.type} />
                  <span className="ml-1">{log.contact.number}</span>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-xs text-muted-foreground mr-4">
                  {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                </p>
                <Button variant="ghost" size="icon" onClick={() => onCall(log.contact.number)}>
                  <Phone className="h-5 w-5 text-primary" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CallHistoryScreen;
