"use client";

import type { FC } from 'react';
import { useState } from 'react';
import type { BlockedNumber } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from "@/hooks/use-toast";

interface BlockedNumbersScreenProps {
  blockedNumbers: BlockedNumber[];
  setBlockedNumbers: React.Dispatch<React.SetStateAction<BlockedNumber[]>>;
}

const BlockedNumbersScreen: FC<BlockedNumbersScreenProps> = ({ blockedNumbers, setBlockedNumbers }) => {
  const [newNumber, setNewNumber] = useState('');
  const { toast } = useToast();

  const handleAddNumber = () => {
    if (newNumber.trim() === '') return;
    const newBlockedNumber: BlockedNumber = {
      id: `bn${Date.now()}`,
      number: newNumber.trim(),
    };
    setBlockedNumbers(prev => [newBlockedNumber, ...prev]);
    setNewNumber('');
    toast({
      title: "Number Blocked",
      description: `${newNumber.trim()} has been added to your block list.`,
    });
  };

  const handleRemoveNumber = (id: string) => {
    setBlockedNumbers(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-headline font-bold">Blocked Numbers</h1>
      </header>
      <div className="p-4">
        <div className="flex gap-2">
          <Input
            type="tel"
            placeholder="Enter number to block"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
          <Button onClick={handleAddNumber}>
            <Plus className="h-4 w-4 mr-2" /> Block
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-2">
          {blockedNumbers.length === 0 ? (
             <p className="text-center text-muted-foreground p-8">Your block list is empty.</p>
          ) : (
            blockedNumbers.map((bn) => (
                <div key={bn.id} className="flex items-center p-3 rounded-lg hover:bg-muted/50">
                <div className="flex-grow">
                    <p className="font-semibold text-foreground">{bn.name || bn.number}</p>
                    {bn.name && <p className="text-sm text-muted-foreground">{bn.number}</p>}
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveNumber(bn.id)}>
                    <X className="h-5 w-5 text-destructive" />
                </Button>
                </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default BlockedNumbersScreen;
