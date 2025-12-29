import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="text-center space-y-4 max-w-2xl">
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
      <div className="mt-8">
        <Button asChild size="lg">
          <Link href="/app">Get Started</Link>
        </Button>
      </div>
      <div className="absolute bottom-4 text-xs text-muted-foreground">
        <p>Built with Next.js and Firebase</p>
      </div>
    </div>
  );
}
