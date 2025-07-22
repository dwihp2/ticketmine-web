"use client";

import { useState } from 'react';
import { useEvents } from '../../usecases/useEvents';
import { useVenues } from '../../usecases/useVenues';
import { EnhancedEventCard } from '../presentation/EnhancedEventCard';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import type { Event } from '../../models/interfaces/event';

export function EventDiscoveryContainer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [sortBy, setSortBy] = useState('start_date');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  const { data: events, isLoading: eventsLoading, error } = useEvents();
  const { data: venues, isLoading: venuesLoading } = useVenues();

  // Filter and sort events
  const filteredEvents = events?.filter((event: Event) => {
    // Search term filter
    if (searchTerm && !event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !event.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !event.primary_artist?.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !event.venue?.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Venue filter
    if (selectedVenue && event.venue?.id !== parseInt(selectedVenue)) {
      return false;
    }

    // Date range filter
    if (selectedDateRange) {
      const now = new Date();
      const eventDate = new Date(event.start_date);

      switch (selectedDateRange) {
        case 'today':
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          return eventDate >= today && eventDate < tomorrow;
        case 'this_week':
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay());
          weekStart.setHours(0, 0, 0, 0);
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 7);
          return eventDate >= weekStart && eventDate < weekEnd;
        case 'this_month':
          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
          const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          return eventDate >= monthStart && eventDate <= monthEnd;
        case 'upcoming':
          return eventDate >= now;
        default:
          return true;
      }
    }

    return true;
  }) || [];

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a: Event, b: Event) => {
    switch (sortBy) {
      case 'start_date':
        return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      case 'popularity':
        return (b.sold_tickets || 0) - (a.sold_tickets || 0);
      case 'price_low':
        // TODO: Implement when ticket pricing is available
        return 0;
      case 'price_high':
        // TODO: Implement when ticket pricing is available
        return 0;
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedVenue('');
    setSelectedDateRange('');
    setSortBy('start_date');
  };

  const hasActiveFilters = searchTerm || selectedVenue || selectedDateRange || sortBy !== 'start_date';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/events"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Back to Events
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">Discover Events</h1>
        <p className="text-gray-600">Find amazing events happening near you with advanced search and filtering</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        {/* Search Bar */}
        <div className="mb-6">
          <label htmlFor="search" className="block text-sm font-medium mb-2">
            Search Events
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search by event name, artist, venue, or description..."
          />
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Venue Filter */}
          <div>
            <label htmlFor="venue" className="block text-sm font-medium mb-2">
              Venue
            </label>
            <select
              id="venue"
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={venuesLoading}
            >
              <option value="">All Venues</option>
              {venues?.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name} - {venue.city}, {venue.state}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium mb-2">
              When
            </label>
            <select
              id="dateRange"
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium mb-2">
              Sort By
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="start_date">Date</option>
              <option value="name">Name</option>
              <option value="popularity">Popularity</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
            {hasActiveFilters && ' with current filters'}
          </div>

          <div className="flex items-center gap-4">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Clear All Filters
              </button>
            )}

            {/* View Toggle */}
            <div className="flex border rounded-md">
              <button
                onClick={() => setViewType('grid')}
                className={`px-3 py-1.5 text-sm ${viewType === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  } rounded-l-md border-r`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`px-3 py-1.5 text-sm ${viewType === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  } rounded-r-md`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {eventsLoading && (
        <div className={`grid gap-6 ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-96 w-full" />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-lg font-medium text-red-800">Error Loading Events</h3>
          <p className="text-red-600 mt-2">
            {error instanceof Error ? error.message : 'Failed to load events'}
          </p>
        </div>
      )}

      {/* No Events State */}
      {!eventsLoading && !error && sortedEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎪</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {hasActiveFilters ? 'No Events Match Your Filters' : 'No Events Found'}
          </h3>
          <p className="text-gray-500 mb-6">
            {hasActiveFilters
              ? 'Try adjusting your search criteria or removing some filters.'
              : 'Check back later for upcoming events!'
            }
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {/* Events Display */}
      {!eventsLoading && !error && sortedEvents.length > 0 && (
        <div className={`grid gap-6 ${viewType === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1'
          }`}>
          {sortedEvents.map((event) => (
            <EnhancedEventCard
              key={event.id}
              event={event}
              layout={viewType}
            />
          ))}
        </div>
      )}
    </div>
  );
}
