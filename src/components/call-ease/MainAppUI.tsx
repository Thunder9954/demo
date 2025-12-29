"use client";

import { useState, useEffect, useCallback } from "react";
import type { ActiveTab, CallState, Contact, CallLog, BlockedNumber } from "@/lib/types";
import { mockContacts, mockCallHistory, mockBlockedNumbers } from "@/lib/data";

import { AnimatePresence, motion } from "framer-motion";
import IncomingCallScreen from "./IncomingCallScreen";
import ActiveCallScreen from "./ActiveCallScreen";
import BottomNav from "./BottomNav";
import DialerScreen from "./DialerScreen";
import CallHistoryScreen from "./CallHistoryScreen";
import ContactsScreen from "./ContactsScreen";
import BlockedNumbersScreen from "./BlockedNumbersScreen";
import { useToast } from "@/hooks/use-toast";

export default function MainAppUI() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dialer");
  const [callState, setCallState] = useState<CallState>("idle");
  const [currentNumber, setCurrentNumber] = useState("");
  const [callerInfo, setCallerInfo] = useState<Pick<Contact, 'name' | 'number' | 'avatar'> | null>(null);
  const [callHistory, setCallHistory] = useState<CallLog[]>(mockCallHistory);
  const [contacts] = useState<Contact[]>(mockContacts);
  const [blockedNumbers, setBlockedNumbers] = useState<BlockedNumber[]>(mockBlockedNumbers);
  const { toast } = useToast();

  const handleStartCall = useCallback((number: string, contactInfo?: Pick<Contact, 'name' | 'number' | 'avatar'>) => {
    const isBlocked = blockedNumbers.some(b => b.number === number);
    if (isBlocked) {
        toast({
            title: "Call Blocked",
            description: `${number} is on your block list.`,
            variant: "destructive"
        });
        return;
    }
    
    setCallState("active");
    setCurrentNumber(number);
    const info = contactInfo || contacts.find(c => c.number === number) || { name: "Unknown", number, avatar: mockContacts[5].avatar };
    setCallerInfo(info);
    const newLog: CallLog = {
      id: `cl${Date.now()}`,
      contact: info,
      type: "outgoing",
      timestamp: new Date(),
      duration: 0,
    };
    // Duration will be updated on end call
    setCallHistory(prev => [newLog, ...prev]);
  }, [contacts, blockedNumbers, toast]);

  const handleEndCall = useCallback((duration: number) => {
    setCallState("idle");
    setCurrentNumber("");
    setCallerInfo(null);
    setCallHistory(prev => {
        const newHistory = [...prev];
        if(newHistory.length > 0 && (newHistory[0].type === 'outgoing' || newHistory[0].type === 'incoming')) {
            newHistory[0].duration = duration;
        }
        return newHistory;
    });
  }, []);

  const handleReceiveCall = useCallback((contact: Contact) => {
    const isBlocked = blockedNumbers.some(b => b.number === contact.number);
    if(isBlocked) {
        console.log(`Blocked incoming call from ${contact.name}`);
        return;
    }
    setCallerInfo(contact);
    setCallState("ringing");
  }, [blockedNumbers]);

  const handleAcceptCall = useCallback(() => {
    if (!callerInfo) return;
    setCallState("active");
    const newLog: CallLog = {
        id: `cl${Date.now()}`,
        contact: callerInfo,
        type: 'incoming',
        timestamp: new Date(),
        duration: 0
    };
    setCallHistory(prev => [newLog, ...prev]);
  }, [callerInfo]);
  
  const handleDeclineCall = useCallback(() => {
    if (!callerInfo) return;
    const newLog: CallLog = {
        id: `cl${Date.now()}`,
        contact: callerInfo,
        type: 'missed',
        timestamp: new Date(),
        duration: 0
    };
    setCallHistory(prev => [newLog, ...prev]);
    setCallState("idle");
    setCallerInfo(null);
  }, [callerInfo]);

  useEffect(() => {
    // Simulate an incoming call for demonstration
    const timer = setTimeout(() => {
      if (callState === "idle") {
        const randomContact = contacts[Math.floor(Math.random() * (contacts.length - 1))];
        handleReceiveCall(randomContact);
      }
    }, 10000); // After 10 seconds

    return () => clearTimeout(timer);
  }, [callState, contacts, handleReceiveCall]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "history":
        return <CallHistoryScreen callHistory={callHistory} onCall={handleStartCall} />;
      case "contacts":
        return <ContactsScreen contacts={contacts} onCall={(contact) => {
          setCurrentNumber(contact.number);
          handleStartCall(contact.number, contact);
        }} />;
      case "blocked":
        return <BlockedNumbersScreen blockedNumbers={blockedNumbers} setBlockedNumbers={setBlockedNumbers} />;
      case "dialer":
      default:
        return <DialerScreen currentNumber={currentNumber} setCurrentNumber={setCurrentNumber} onCall={handleStartCall} />;
    }
  };

  return (
    <div className="relative w-full h-full sm:max-w-sm sm:h-[85vh] sm:max-h-[720px] bg-card sm:rounded-3xl sm:shadow-2xl overflow-hidden sm:border-4 sm:border-primary/10 flex flex-col">
      <AnimatePresence>
        {callState === "ringing" && callerInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20"
          >
            <IncomingCallScreen
              caller={callerInfo}
              onAccept={handleAcceptCall}
              onDecline={handleDeclineCall}
            />
          </motion.div>
        )}
        {callState === "active" && callerInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-10"
          >
            <ActiveCallScreen caller={callerInfo} onEndCall={handleEndCall} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow flex flex-col overflow-y-auto">
        {renderActiveTab()}
      </div>
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
