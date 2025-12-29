"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import type { Contact, CallLog } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Phone, Delete, ArrowUpRight, ArrowDownLeft, PhoneMissed, Plus } from 'lucide-react';
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

const TimeAgo: FC<{ date: Date }> = ({ date }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    setTimeAgo(formatDistanceToNow(date, { addSuffix: true }));
  }, [date]);

  return <>{timeAgo}</>;
};

const DialerScreen: FC<DialerScreenProps> = ({ currentNumber, setCurrentNumber, onCall, contacts, callHistory }) => {
  const handleKeyPress = (key: string) => {
    setCurrentNumber(currentNumber + key);
  };

  const handleBackspace = () => {
    setCurrentNumber(currentNumber.slice(0, -1));
  };

  const handleClear = () => {
    setCurrentNumber('');
  };

  const handleRecentCallClick = (number: string) => {
    setCurrentNumber(number);
  };
  
  const favoriteContacts = contacts.filter(c => c.isFavorite);
  const recentCalls = callHistory.slice(0, 15);
  const matchingContact = currentNumber ? contacts.find(c => c.number.replace(/\D/g, '').includes(currentNumber.replace(/\D/g, ''))) : null;

  return (
    <div className="flex flex-col h-full bg-card">
        {/* Number Display */}
        <div className="flex flex-col justify-end h-28 p-4">
            <div className="relative text-center">
                <p className="text-4xl font-headline tracking-wider h-12 truncate text-foreground">{currentNumber}</p>
                 {currentNumber.length > 0 && (
                    <div className="flex items-center justify-center text-sm h-5">
                        <span className="text-muted-foreground">{matchingContact ? matchingContact.name : 'Add to contacts'}</span>
                    </div>
                )}
            </div>
        </div>

        {/* Favorites and Recents */}
        <ScrollArea className="flex-grow">
             {currentNumber.length === 0 ? (
                <>
                    {favoriteContacts.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold uppercase text-muted-foreground px-4 mt-2">Favorites</p>
                            <div className="grid grid-cols-4 gap-4 p-4">
                                {favoriteContacts.map(contact => (
                                    <div key={contact.id} className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => onCall(contact.number, contact)}>
                                        <Avatar className="h-14 w-14 border-2 border-primary/20">
                                            <AvatarImage src={contact.avatar.imageUrl} alt={contact.name} data-ai-hint={contact.avatar.imageHint} />
                                            <AvatarFallback className="text-xl">{contact.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs text-foreground truncate w-16 text-center">{contact.name}</span>
                                    </div>
                                ))}
                                 <div className="flex flex-col items-center gap-1 cursor-pointer">
                                    <Avatar className="h-14 w-14 border-2 border-dashed border-muted-foreground/50 flex items-center justify-center bg-muted/30">
                                        <Plus className="h-6 w-6 text-muted-foreground"/>
                                    </Avatar>
                                    <span className="text-xs text-muted-foreground truncate w-16 text-center">Add New</span>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <p className="text-xs font-semibold uppercase text-muted-foreground px-4 mt-2">Recents</p>
                    <div className="px-2 divide-y divide-border">
                        {recentCalls.map((log) => (
                            <div key={log.id} className="flex items-center p-2 rounded-lg hover:bg-muted/50 cursor-pointer" onClick={() => handleRecentCallClick(log.contact.number)}>
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
                                <div className="flex flex-col items-end gap-1">
                                    <p className="text-xs text-muted-foreground text-right">
                                        <TimeAgo date={log.timestamp} />
                                    </p>
                                     <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); onCall(log.contact.number, log.contact);}}>
                                        <Phone className="h-4 w-4 text-primary" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
             ) : null}
        </ScrollArea>
        
        {/* Dial Pad */}
        <div className="mt-auto pt-2 pb-4 bg-card">
            <div className="grid grid-cols-3 gap-y-2 gap-x-4 px-8">
                {dialPadKeys.map(({ main, sub }) => (
                <Button
                    key={main}
                    variant="ghost"
                    className="h-16 rounded-full text-3xl font-light flex flex-col bg-muted/30 hover:bg-muted"
                    onClick={() => handleKeyPress(main)}
                >
                    <span>{main}</span>
                    {sub && <span className="text-[10px] font-normal tracking-widest text-muted-foreground">{sub}</span>}
                </Button>
                ))}
            </div>

            <div className="flex justify-evenly items-center px-4 pt-4">
                 <div className="w-16 h-16"></div>
                <Button
                    size="lg"
                    className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
                    onClick={() => onCall(currentNumber)}
                    disabled={!currentNumber}
                >
                    <Phone className="h-7 w-7 text-white" />
                </Button>
                <Button variant="ghost" size="icon" className="w-16 h-16" onClick={handleBackspace} disabled={!currentNumber}>
                    <Delete className="h-6 w-6 text-muted-foreground" />
                </Button>
            </div>
        </div>
    </div>
  );
};

export default DialerScreen;
