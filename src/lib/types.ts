import type { ImagePlaceholder } from './placeholder-images';

export type Contact = {
  id: string;
  name: string;
  number: string;
  avatar: ImagePlaceholder;
};

export type CallLog = {
  id: string;
  contact: Pick<Contact, 'name' | 'number' | 'avatar'>;
  type: 'incoming' | 'outgoing' | 'missed';
  timestamp: Date;
  duration: number; // in seconds
};

export type BlockedNumber = {
    id: string;
    number: string;
    name?: string;
};

export type ActiveTab = 'contacts' | 'history' | 'dialer' | 'blocked';
export type CallState = 'idle' | 'dialing' | 'ringing' | 'active' | 'ended';
