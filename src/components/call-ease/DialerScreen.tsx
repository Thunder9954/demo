"use client";

import type { FC } from 'react';
import type { Contact, CallLog } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Phone, Delete, ArrowUpRight, ArrowDownLeft, PhoneMissed } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

interface DialerScreenProps {
  currentNumber: string;
  setCurrentNumber: (num: string) => void;
  onCall: (number: string, contact?: Pick<Contact, 'name' | 'number' | 'avatar'>) => void;
  contacts: Contact[];
  callHistory: CallLog[];
}

const dialPadKeys = [
  { main: '1', sub: '' }, { main: '2', sub: 'ABC' }, { main: '3', sub: 'DEF' },
  { main: '4', sub: 'GHI' }, { main: '5', sub: 'JKL' }, { main: '6', sub: 'MNO' },
  { main: '7', sub: 'PQRS' }, { main: '8', sub: 'TUV' }, { main: '9', sub: 'WXYZ' },
  { main: '*', sub: '' }, { main: '0', sub: '+' }, { main: '#', sub: '' },
];

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


const DialerScreen: FC<DialerScreenProps> = ({ currentNumber, setCurrentNumber, onCall, contacts, callHistory }) => {
  const handleKeyPress = (key: string) => {
    setCurrentNumber(currentNumber + key);
  };

  const handleBackspace = () => {
    setCurrentNumber(currentNumber.slice(0, -1));
  };
  
  const favoriteContacts = contacts.filter(c => c.isFavorite);
  const recentCalls = callHistory.slice(0, 5);

  return (
    <div className="flex flex-col h-full">
        {/* Input and Favorites section */}
        <div className="p-4 flex flex-col">
            <div className="relative w-full text-center h-12 mb-4">
                <p className="text-4xl font-headline tracking-wider h-12 truncate">{currentNumber}</p>
                {currentNumber.length > 0 && (
                    <Button variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2" onClick={handleBackspace}>
                        <Delete className="h-6 w-6" />
                    </Button>
                )}
            </div>
            {favoriteContacts.length > 0 && (
                <div className="flex justify-center gap-4 py-2">
                    {favoriteContacts.map(contact => (
                        <div key={contact.id} className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => onCall(contact.number, contact)}>
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={contact.avatar.imageUrl} alt={contact.name} data-ai-hint={contact.avatar.imageHint} />
                                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground truncate w-14 text-center">{contact.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
        
        {/* Dialer or Recents */}
        {currentNumber.length === 0 ? (
             <ScrollArea className="flex-grow">
                <div className="px-2 divide-y">
                  {recentCalls.map((log) => (
                    <div key={log.id} className="flex items-center p-2 rounded-lg hover:bg-muted/50" onClick={() => onCall(log.contact.number, log.contact)}>
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
                      </div>
                    </div>
                  ))}
                </div>
             </ScrollArea>
        ): (
            <div className="grid grid-cols-3 gap-2 px-4 mb-2">
                {dialPadKeys.map(({ main, sub }) => (
                <Button
                    key={main}
                    variant="ghost"
                    className="h-16 rounded-2xl text-3xl font-light flex flex-col bg-muted/50"
                    onClick={() => handleKeyPress(main)}
                >
                    <span>{main}</span>
                    {sub && <span className="text-xs font-normal tracking-widest">{sub}</span>}
                </Button>
                ))}
            </div>
        )}

      <div className="flex justify-center items-center p-4">
        <Button
            size="lg"
            className="w-20 h-20 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
            onClick={() => onCall(currentNumber)}
            disabled={!currentNumber}
        >
            <Phone className="h-8 w-8 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default DialerScreen;
