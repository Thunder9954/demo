'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, Users } from 'lucide-react';
import { mockContacts } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleCall = (number: string) => {
    // In a real app, this would initiate a call.
    // For now, we'll just log it and navigate to the app.
    console.log(`Calling ${number}...`);
    router.push('/app');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="text-center space-y-4 max-w-4xl">
        <div className="inline-block bg-primary/10 p-4 rounded-full">
          <Phone className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl font-headline">
          Welcome to CallEase
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          A modern, intuitive, and feature-rich calling experience designed to
          simplify your communication.
        </p>
      </div>

      <div className="mt-12 w-full max-w-4xl">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 mb-4">
          <Users className="h-6 w-6 text-primary" />
          Quick Contacts
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockContacts.slice(0, 4).map((contact) => (
            <div
              key={contact.id}
              className="bg-card p-4 rounded-lg shadow-sm flex flex-col items-center text-center"
            >
              <Avatar className="w-16 h-16 mb-2">
                <AvatarImage src={contact.avatar.imageUrl} alt={contact.name} data-ai-hint={contact.avatar.imageHint} />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="font-semibold truncate w-full">{contact.name}</p>
              <p className="text-sm text-muted-foreground">{contact.number}</p>
              <Button
                size="sm"
                className="mt-3 w-full"
                onClick={() => handleCall(contact.number)}
              >
                <Phone className="mr-2 h-4 w-4" /> Call
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <Button asChild size="lg">
          <Link href="/app">Open Dialer</Link>
        </Button>
      </div>
      <div className="absolute bottom-4 text-xs text-muted-foreground">
        <p>Built with Next.js and Firebase</p>
      </div>
    </div>
  );
}
