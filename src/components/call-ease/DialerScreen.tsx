"use client";

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Delete } from 'lucide-react';

interface DialerScreenProps {
  currentNumber: string;
  setCurrentNumber: (num: string) => void;
  onCall: (number: string) => void;
}

const dialPadKeys = [
  { main: '1', sub: '' }, { main: '2', sub: 'ABC' }, { main: '3', sub: 'DEF' },
  { main: '4', sub: 'GHI' }, { main: '5', sub: 'JKL' }, { main: '6', sub: 'MNO' },
  { main: '7', sub: 'PQRS' }, { main: '8', sub: 'TUV' }, { main: '9', sub: 'WXYZ' },
  { main: '*', sub: '' }, { main: '0', sub: '+' }, { main: '#', sub: '' },
];

const DialerScreen: FC<DialerScreenProps> = ({ currentNumber, setCurrentNumber, onCall }) => {
  const handleKeyPress = (key: string) => {
    setCurrentNumber(currentNumber + key);
  };

  const handleBackspace = () => {
    setCurrentNumber(currentNumber.slice(0, -1));
  };

  return (
    <div className="flex flex-col justify-between h-full p-4">
      <div className="flex-grow flex items-center justify-center">
        <div className="relative w-full text-center">
            <p className="text-4xl font-headline tracking-wider h-12">{currentNumber}</p>
            {currentNumber.length > 0 && (
                <Button variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2" onClick={handleBackspace}>
                    <Delete className="h-6 w-6" />
                </Button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {dialPadKeys.map(({ main, sub }) => (
          <Button
            key={main}
            variant="ghost"
            className="h-20 rounded-full text-3xl font-light flex flex-col"
            onClick={() => handleKeyPress(main)}
          >
            <span>{main}</span>
            {sub && <span className="text-xs font-normal tracking-widest">{sub}</span>}
          </Button>
        ))}
      </div>
      
      <div className="flex justify-center items-center">
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
