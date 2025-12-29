import { PlaceHolderImages } from './placeholder-images';
import type { Contact, CallLog, BlockedNumber } from './types';

const avatars = PlaceHolderImages;

export const mockContacts: Contact[] = [
  { id: '1', name: 'Ava', number: '555-0101', avatar: avatars[0], isFavorite: true },
  { id: '2', name: 'Liam', number: '555-0102', avatar: avatars[1], isFavorite: true },
  { id: '3', name: 'Olivia', number: '555-0103', avatar: avatars[2], isFavorite: false },
  { id: '4', name: 'Noah', number: '555-0104', avatar: avatars[3], isFavorite: true },
  { id: '5', name: 'Emma', number: '555-0105', avatar: avatars[4], isFavorite: false },
  { id: '6', name: 'Work', number: '555-0199', avatar: avatars[5], isFavorite: false },
];

export const mockCallHistory: CallLog[] = [
  {
    id: 'cl1',
    contact: mockContacts[0],
    type: 'missed',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    duration: 0,
  },
  {
    id: 'cl2',
    contact: mockContacts[1],
    type: 'outgoing',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    duration: 125,
  },
  {
    id: 'cl3',
    contact: { name: 'Unknown', number: '555-0123', avatar: avatars[5] },
    type: 'incoming',
    timestamp: new Date(Date.now() - 1000 * 3600 * 2),
    duration: 310,
  },
  {
    id: 'cl4',
    contact: mockContacts[3],
    type: 'incoming',
    timestamp: new Date(Date.now() - 1000 * 3600 * 8),
    duration: 15,
  },
  {
    id: 'cl5',
    contact: mockContacts[4],
    type: 'missed',
    timestamp: new Date(Date.now() - 1000 * 3600 * 24),
    duration: 0,
  },
];

export const mockBlockedNumbers: BlockedNumber[] = [
    { id: 'bn1', number: '555-0188', name: 'Spam' },
    { id: 'bn2', number: '555-0177' },
];
