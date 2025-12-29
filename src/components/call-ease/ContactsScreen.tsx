"use client";

import type { FC } from 'react';
import { useState } from 'react';
import type { Contact } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ContactsScreenProps {
  contacts: Contact[];
  onCall: (contact: Contact) => void;
}

const ContactsScreen: FC<ContactsScreenProps> = ({ contacts, onCall }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.number.includes(searchTerm)
  );

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-headline font-bold mb-4">Contacts</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search contacts"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>
      <ScrollArea className="flex-grow">
        <div className="p-2">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="flex items-center p-2 rounded-lg hover:bg-muted/50" onClick={() => onCall(contact)}>
              <Avatar className="h-10 w-10">
                <AvatarImage src={contact.avatar.imageUrl} alt={contact.name} data-ai-hint={contact.avatar.imageHint}/>
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 flex-grow">
                <p className="font-semibold text-foreground">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.number}</p>
              </div>
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5 text-primary" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContactsScreen;
