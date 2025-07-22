"use client";

import { useState, useEffect } from 'react';
import type { EventFormData, UpdateEventInput } from '../../models/interfaces/create-event';
import type { Event } from '../../models/interfaces/event';
import { useUpdateEvent } from '../../usecases/useUpdateEvent';
import { useVenues } from '../../usecases/useVenues';
import { useArtists } from '../../usecases/useArtists';
import { useEventCategories } from '../../usecases/useEventCategories';

interface EventEditFormProps {
  event: Event;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EventEditForm({ event, onSuccess, onCancel }: EventEditFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    description: '',
    short_description: '',
    start_date: '',
    end_date: '',
    doors_open: '',
    age_restriction: '',
    dress_code: '',
    image_url: '',
    banner_url: '',
    is_featured: false,
    max_tickets_per_user: 6,
    sale_start_date: '',
    sale_end_date: '',
    total_capacity: 100,
    venue_id: '',
    primary_artist_id: '',
    category_id: '',
  });

  const updateEventMutation = useUpdateEvent();
  const { data: venues, isLoading: venuesLoading } = useVenues();
  const { data: artists, isLoading: artistsLoading } = useArtists();
  const { data: categories, isLoading: categoriesLoading } = useEventCategories();

  // Populate form with existing event data
  useEffect(() => {
    if (event) {
      const formatDateForInput = (date: Date) => {
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16);
      };

      setFormData({
        name: event.name || '',
        description: event.description || '',
        short_description: event.short_description || '',
        start_date: formatDateForInput(event.start_date),
        end_date: formatDateForInput(event.end_date),
        doors_open: formatDateForInput(event.doors_open),
        age_restriction: event.age_restriction || '',
        dress_code: event.dress_code || '',
        image_url: event.image_url || '',
        banner_url: event.banner_url || '',
        is_featured: event.is_featured || false,
        max_tickets_per_user: event.max_tickets_per_user || 6,
        sale_start_date: formatDateForInput(event.sale_start_date),
        sale_end_date: formatDateForInput(event.sale_end_date),
        total_capacity: event.total_capacity || 100,
        venue_id: event.venue?.id?.toString() || '',
        primary_artist_id: event.primary_artist?.id?.toString() || '',
        category_id: '', // We need to get this from the database
      });
    }
  }, [event]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert form data to UpdateEventInput
    const eventInput: UpdateEventInput = {
      id: event.id,
      name: formData.name,
      description: formData.description,
      short_description: formData.short_description,
      start_date: new Date(formData.start_date),
      end_date: new Date(formData.end_date),
      doors_open: new Date(formData.doors_open),
      age_restriction: formData.age_restriction,
      dress_code: formData.dress_code,
      image_url: formData.image_url,
      banner_url: formData.banner_url,
      is_featured: formData.is_featured,
      max_tickets_per_user: formData.max_tickets_per_user,
      sale_start_date: new Date(formData.sale_start_date),
      sale_end_date: new Date(formData.sale_end_date),
      total_capacity: formData.total_capacity,
      venue_id: parseInt(formData.venue_id),
      primary_artist_id: parseInt(formData.primary_artist_id),
      category_id: parseInt(formData.category_id),
    };

    try {
      await updateEventMutation.mutateAsync(eventInput);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  if (venuesLoading || artistsLoading || categoriesLoading) {
    return <div className="p-4">Loading form data...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Edit Event</h2>
        <div className="text-sm text-gray-600">
          Event ID: {event.id}
        </div>
      </div>

      {/* Status indicator */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Current Status:</strong>
              <span className={`ml-2 px-2 py-1 rounded text-xs ${event.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : event.status === 'sold_out'
                    ? 'bg-red-100 text-red-800'
                    : event.status === 'draft'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-100 text-blue-800'
                }`}>
                {event.status.replace('_', ' ').toUpperCase()}
              </span>
            </p>
            <p className="text-sm text-blue-700 mt-1">
              <strong>Sales:</strong> {event.sold_tickets}/{event.total_capacity} tickets sold
            </p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Event Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter event name"
          />
        </div>

        <div>
          <label htmlFor="short_description" className="block text-sm font-medium mb-2">
            Short Description *
          </label>
          <input
            type="text"
            id="short_description"
            name="short_description"
            value={formData.short_description}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Full Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Detailed event description"
        />
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="start_date" className="block text-sm font-medium mb-2">
            Start Date & Time *
          </label>
          <input
            type="datetime-local"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="end_date" className="block text-sm font-medium mb-2">
            End Date & Time *
          </label>
          <input
            type="datetime-local"
            id="end_date"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="doors_open" className="block text-sm font-medium mb-2">
            Doors Open *
          </label>
          <input
            type="datetime-local"
            id="doors_open"
            name="doors_open"
            value={formData.doors_open}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Venue, Artist, Category */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="venue_id" className="block text-sm font-medium mb-2">
            Venue *
          </label>
          <select
            id="venue_id"
            name="venue_id"
            value={formData.venue_id}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a venue</option>
            {venues?.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {venue.name} - {venue.city}, {venue.state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="primary_artist_id" className="block text-sm font-medium mb-2">
            Primary Artist *
          </label>
          <select
            id="primary_artist_id"
            name="primary_artist_id"
            value={formData.primary_artist_id}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select an artist</option>
            {artists?.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name} ({artist.genre})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="category_id" className="block text-sm font-medium mb-2">
            Category *
          </label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Capacity and Restrictions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="total_capacity" className="block text-sm font-medium mb-2">
            Total Capacity *
          </label>
          <input
            type="number"
            id="total_capacity"
            name="total_capacity"
            value={formData.total_capacity}
            onChange={handleInputChange}
            required
            min="1"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {event.sold_tickets > 0 && (
            <p className="text-xs text-amber-600 mt-1">
              ⚠️ Warning: {event.sold_tickets} tickets already sold. New capacity should be ≥ {event.sold_tickets}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="max_tickets_per_user" className="block text-sm font-medium mb-2">
            Max Tickets Per User
          </label>
          <input
            type="number"
            id="max_tickets_per_user"
            name="max_tickets_per_user"
            value={formData.max_tickets_per_user}
            onChange={handleInputChange}
            min="1"
            max="20"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="age_restriction" className="block text-sm font-medium mb-2">
            Age Restriction
          </label>
          <select
            id="age_restriction"
            name="age_restriction"
            value={formData.age_restriction}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">No restriction</option>
            <option value="18+">18+</option>
            <option value="21+">21+</option>
            <option value="All ages">All ages</option>
          </select>
        </div>

        <div>
          <label htmlFor="dress_code" className="block text-sm font-medium mb-2">
            Dress Code
          </label>
          <select
            id="dress_code"
            name="dress_code"
            value={formData.dress_code}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">No dress code</option>
            <option value="Casual">Casual</option>
            <option value="Smart casual">Smart casual</option>
            <option value="Formal">Formal</option>
            <option value="Black tie">Black tie</option>
          </select>
        </div>
      </div>

      {/* Sale Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sale_start_date" className="block text-sm font-medium mb-2">
            Sale Start Date *
          </label>
          <input
            type="datetime-local"
            id="sale_start_date"
            name="sale_start_date"
            value={formData.sale_start_date}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="sale_end_date" className="block text-sm font-medium mb-2">
            Sale End Date *
          </label>
          <input
            type="datetime-local"
            id="sale_end_date"
            name="sale_end_date"
            value={formData.sale_end_date}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="image_url" className="block text-sm font-medium mb-2">
            Event Image URL
          </label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label htmlFor="banner_url" className="block text-sm font-medium mb-2">
            Banner Image URL
          </label>
          <input
            type="url"
            id="banner_url"
            name="banner_url"
            value={formData.banner_url}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/banner.jpg"
          />
        </div>
      </div>

      {/* Featured Event */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_featured"
          name="is_featured"
          checked={formData.is_featured}
          onChange={handleInputChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">
          Mark as featured event
        </label>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={updateEventMutation.isPending}
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {updateEventMutation.isPending ? 'Updating...' : 'Update Event'}
        </button>
      </div>
    </form>
  );
}
