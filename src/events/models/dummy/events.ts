import type { Event } from '../interfaces/event';

export const dummyEvents: Event[] = [
  {
    id: 1,
    name: 'Rock Night',
    description: 'A night of classic rock music.',
    date: '2025-08-01',
    time: '19:00',
    venue: 'Stadium A',
    location: 'New York, NY',
    genre: 'Rock',
    artist: 'The Rockers',
    created_at: '2025-07-01T12:00:00Z',
  },
  {
    id: 2,
    name: 'Jazz Evening',
    description: 'Smooth jazz performances.',
    date: '2025-08-05',
    time: '20:00',
    venue: 'Jazz Club',
    location: 'Chicago, IL',
    genre: 'Jazz',
    artist: 'Jazz Masters',
    created_at: '2025-07-02T12:00:00Z',
  },
];
