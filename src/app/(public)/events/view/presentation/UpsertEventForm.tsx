"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMemo, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DateTimePicker } from "@/components/ui/date-picker"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Copy } from "lucide-react"

import { useCreateEvent } from '../../usecases/useCreateEvent'
import { useUpdateEvent } from '../../usecases/useUpdateEvent'
import { useVenues } from '../../usecases/useVenues'
import { useArtists } from '../../usecases/useArtists'
import { useEventCategories } from '../../usecases/useEventCategories'
import type { Event } from '../../models/interfaces/event'
import type { CreateEventInput, UpdateEventInput } from '../../models/interfaces/create-event'

// Unified validation schema for both create and edit operations
const upsertEventFormSchema = z.object({
  name: z.string()
    .min(3, "Event name must be at least 3 characters")
    .max(100, "Event name must be less than 100 characters"),

  short_description: z.string()
    .min(10, "Short description must be at least 10 characters")
    .max(200, "Short description must be less than 200 characters"),

  description: z.string()
    .min(50, "Description must be at least 50 characters")
    .max(2000, "Description must be less than 2000 characters"),

  start_date: z.date({
    required_error: "Start date is required",
  }).optional(),

  end_date: z.date({
    required_error: "End date is required",
  }).optional(),

  doors_open: z.date({
    required_error: "Doors open time is required",
  }).optional(),

  sale_start_date: z.date({
    required_error: "Sale start date is required",
  }).optional(),

  sale_end_date: z.date({
    required_error: "Sale end date is required",
  }).optional(),

  venue_id: z.string({
    required_error: "Please select a venue",
  }).min(1, "Please select a venue"),

  primary_artist_id: z.string({
    required_error: "Please select a primary artist",
  }).min(1, "Please select a primary artist"),

  category_id: z.string().optional(),

  age_restriction: z.string().optional(),
  dress_code: z.string().optional(),
  image_url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  banner_url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),

  total_capacity: z.number()
    .min(1, "Capacity must be at least 1")
    .max(100000, "Capacity must be less than 100,000"),

  max_tickets_per_user: z.number()
    .min(1, "Must allow at least 1 ticket per user")
    .max(20, "Maximum 20 tickets per user"),

  is_featured: z.boolean().default(false),
}).superRefine((data, ctx) => {
  // Required date validation
  if (!data.start_date) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Start date is required",
      path: ["start_date"],
    })
  }
  if (!data.end_date) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "End date is required",
      path: ["end_date"],
    })
  }
  if (!data.doors_open) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Doors open time is required",
      path: ["doors_open"],
    })
  }
  if (!data.sale_start_date) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Sale start date is required",
      path: ["sale_start_date"],
    })
  }
  if (!data.sale_end_date) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Sale end date is required",
      path: ["sale_end_date"],
    })
  }
}).refine((data) => {
  if (!data.end_date || !data.start_date) return true // Skip validation if dates are undefined
  return data.end_date > data.start_date
}, {
  message: "End date must be after start date",
  path: ["end_date"],
}).refine((data) => {
  if (!data.doors_open || !data.start_date) return true // Skip validation if dates are undefined
  return data.doors_open <= data.start_date
}, {
  message: "Doors must open before or at event start time",
  path: ["doors_open"],
}).refine((data) => {
  if (!data.sale_start_date || !data.sale_end_date) return true // Skip validation if dates are undefined
  return data.sale_start_date <= data.sale_end_date
}, {
  message: "Sale end date must be after sale start date",
  path: ["sale_end_date"],
}).refine((data) => {
  if (!data.sale_end_date || !data.start_date) return true // Skip validation if dates are undefined
  return data.sale_end_date <= data.start_date
}, {
  message: "Sale must end before or at event start time",
  path: ["sale_end_date"],
})

type UpsertEventFormValues = z.infer<typeof upsertEventFormSchema>

interface UpsertEventFormProps {
  event?: Event; // Optional - if provided, form is in edit mode
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UpsertEventForm({ event, onSuccess, onCancel }: UpsertEventFormProps) {
  const isEditMode = !!event
  const createEventMutation = useCreateEvent()
  const updateEventMutation = useUpdateEvent()
  const { data: venues, isLoading: venuesLoading } = useVenues()
  const { data: artists, isLoading: artistsLoading } = useArtists()
  const { data: categories, isLoading: categoriesLoading } = useEventCategories()

  // Create form values based on mode (create vs edit)
  const defaultValues = useMemo(() => {
    if (isEditMode && event) {
      return {
        name: event.name || "",
        short_description: event.short_description || "",
        description: event.description || "",
        start_date: new Date(event.start_date),
        end_date: new Date(event.end_date),
        doors_open: new Date(event.doors_open),
        sale_start_date: new Date(event.sale_start_date),
        sale_end_date: new Date(event.sale_end_date),
        venue_id: event.venue?.id?.toString() || "",
        primary_artist_id: event.primary_artist?.id?.toString() || "",
        category_id: "", // Categories not implemented in current event structure
        age_restriction: event.age_restriction || "",
        dress_code: event.dress_code || "",
        image_url: event.image_url || "",
        banner_url: event.banner_url || "",
        total_capacity: event.total_capacity || 100,
        max_tickets_per_user: event.max_tickets_per_user || 6,
        is_featured: event.is_featured || false,
      }
    }

    // Default values for create mode - use undefined for dates to show placeholders
    return {
      name: "",
      short_description: "",
      description: "",
      start_date: undefined,
      end_date: undefined,
      doors_open: undefined,
      sale_start_date: undefined,
      sale_end_date: undefined,
      venue_id: "",
      primary_artist_id: "",
      category_id: "",
      age_restriction: "",
      dress_code: "",
      image_url: "",
      banner_url: "",
      total_capacity: 100,
      max_tickets_per_user: 6,
      is_featured: false,
    }
  }, [isEditMode, event])

  const form = useForm<UpsertEventFormValues>({
    resolver: zodResolver(upsertEventFormSchema),
    defaultValues,
  })

  // Reset form when switching between create/edit modes or when event changes
  useEffect(() => {
    form.reset(defaultValues)
  }, [form, defaultValues])

  const handleCopyEventId = async () => {
    if (!event) return

    try {
      await navigator.clipboard.writeText(event.id.toString())
      toast.success("Event ID copied to clipboard!")
    } catch (error) {
      console.error("Failed to copy event ID:", error)
      toast.error("Failed to copy Event ID")
    }
  }

  async function onSubmit(values: UpsertEventFormValues) {
    try {
      // Ensure all required dates are present
      if (!values.start_date || !values.end_date || !values.doors_open ||
        !values.sale_start_date || !values.sale_end_date) {
        toast.error("Please fill in all required date fields")
        return
      }

      if (isEditMode && event) {
        // Update existing event
        const updateData: UpdateEventInput = {
          id: event.id,
          name: values.name,
          short_description: values.short_description,
          description: values.description,
          start_date: values.start_date,
          end_date: values.end_date,
          doors_open: values.doors_open,
          sale_start_date: values.sale_start_date,
          sale_end_date: values.sale_end_date,
          venue_id: parseInt(values.venue_id),
          primary_artist_id: parseInt(values.primary_artist_id),
          category_id: values.category_id ? parseInt(values.category_id) : undefined,
          age_restriction: values.age_restriction || null,
          dress_code: values.dress_code || null,
          image_url: values.image_url || null,
          banner_url: values.banner_url || null,
          total_capacity: values.total_capacity,
          max_tickets_per_user: values.max_tickets_per_user,
          is_featured: values.is_featured,
        }

        await updateEventMutation.mutateAsync(updateData)

        toast.success("Event updated successfully!", {
          description: `"${values.name}" has been updated.`,
        })
      } else {
        // Create new event
        const createData: CreateEventInput = {
          name: values.name,
          short_description: values.short_description,
          description: values.description,
          start_date: values.start_date,
          end_date: values.end_date,
          doors_open: values.doors_open,
          sale_start_date: values.sale_start_date,
          sale_end_date: values.sale_end_date,
          venue_id: parseInt(values.venue_id),
          primary_artist_id: parseInt(values.primary_artist_id),
          category_id: values.category_id ? parseInt(values.category_id) : undefined,
          age_restriction: values.age_restriction || null,
          dress_code: values.dress_code || null,
          image_url: values.image_url || null,
          banner_url: values.banner_url || null,
          total_capacity: values.total_capacity,
          max_tickets_per_user: values.max_tickets_per_user,
          is_featured: values.is_featured,
        }

        await createEventMutation.mutateAsync(createData)

        toast.success("Event created successfully!", {
          description: `"${values.name}" has been created and is ready for management.`,
        })
      }

      onSuccess?.()
    } catch (error) {
      console.error(`Failed to ${isEditMode ? 'update' : 'create'} event:`, error)
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} event`, {
        description: error instanceof Error ? error.message : "Please try again.",
      })
    }
  }

  // Show loading state while fetching data
  if (venuesLoading || artistsLoading || categoriesLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-96 w-full" />
        </CardContent>
      </Card>
    )
  }

  const currentMutation = isEditMode ? updateEventMutation : createEventMutation

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">
              {isEditMode ? 'Edit Event' : 'Create New Event'}
            </CardTitle>
            <CardDescription>
              {isEditMode
                ? 'Update event details and settings. All fields marked with * are required.'
                : 'Fill in the details below to create a new event. All fields marked with * are required.'
              }
            </CardDescription>
          </div>

          {/* Event ID and status - only show in edit mode */}
          {isEditMode && event && (
            <div className="text-right text-sm text-muted-foreground">
              <div className="flex items-center gap-2 justify-end">
                <span>Event ID: {event.id}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyEventId}
                  className="h-6 w-6 p-0 hover:bg-muted"
                  title="Copy Event ID"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <div className="mt-1">
                <Badge variant={
                  event.status === 'published' ? 'default' :
                    event.status === 'draft' ? 'secondary' :
                      event.status === 'cancelled' ? 'destructive' : 'outline'
                }>
                  {event.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {/* Status Information - only show in edit mode */}
        {isEditMode && event && (
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card className="border-l-4 border-l-blue-500 max-sm:py-2">
              <CardContent>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Tickets Sold</p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-lg sm:text-2xl font-bold">{event.sold_tickets.toLocaleString()}</p>
                    <span className="text-xs text-muted-foreground">
                      / {event.total_capacity.toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((event.sold_tickets / event.total_capacity) * 100, 100)}%`
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {((event.sold_tickets / event.total_capacity) * 100).toFixed(1)}% capacity
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 max-sm:py-2">
              <CardContent>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Estimated Revenue</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-600">
                    ${(event.sold_tickets * 50).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Based on avg. $50/ticket
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500 max-sm:py-2">
              <CardContent>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Last Updated</p>
                  <p className="text-sm sm:text-lg font-semibold">
                    {new Date(event.updated_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.updated_at).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Event Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter event name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="short_description"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Brief description for listings" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs text-muted-foreground">
                        Used in event cards and previews (max 200 characters)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed event description"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Detailed description shown on event detail page (min 50 characters)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Date and Time Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Event Schedule</h3>

              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="doors_open"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Doors Open</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          onSelect={field.onChange}
                          placeholder="Select doors open time"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Event Start</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          onSelect={field.onChange}
                          placeholder="Select start date and time"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Event End</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          onSelect={field.onChange}
                          placeholder="Select end date and time"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Ticket Sales Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Ticket Sales</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sale_start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale Start Date</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          onSelect={field.onChange}
                          placeholder="When ticket sales begin"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sale_end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale End Date</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          date={field.value}
                          onSelect={field.onChange}
                          placeholder="When ticket sales end"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <FormField
                  control={form.control}
                  name="total_capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Capacity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Maximum number of tickets"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      {isEditMode && event && event.sold_tickets > 0 && (
                        <FormDescription className="text-amber-600">
                          ⚠️ Warning: {event.sold_tickets} tickets already sold.
                          New capacity should be ≥ {event.sold_tickets}
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="max_tickets_per_user"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Tickets Per User</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Maximum tickets per purchase"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormDescription>
                        Limit purchases to prevent scalping (1-20)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Venue and Artist Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Venue & Artists</h3>

              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="venue_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a venue" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {venues?.map((venue) => (
                            <SelectItem key={venue.id} value={venue.id.toString()}>
                              <div className="flex flex-col items-start w-full">
                                <span className="font-medium">{venue.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {venue.city}, {venue.state} (Cap: {venue.capacity?.toLocaleString()})
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="primary_artist_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Artist</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select primary artist" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {artists?.map((artist) => (
                            <SelectItem key={artist.id} value={artist.id.toString()}>
                              <div className="flex flex-col items-start w-full">
                                <span className="font-medium">{artist.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {artist.genre}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {categories && categories.length > 0 && (
                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event category (optional)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">No category</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Event Policies */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Event Policies</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="age_restriction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age Restriction</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select age restriction" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="No restriction">No restriction</SelectItem>
                          <SelectItem value="All Ages">All Ages</SelectItem>
                          <SelectItem value="18+">18+</SelectItem>
                          <SelectItem value="21+">21+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dress_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dress Code</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select dress code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="No Dress Code">No dress code</SelectItem>
                          <SelectItem value="Casual">Casual</SelectItem>
                          <SelectItem value="Smart Casual">Smart Casual</SelectItem>
                          <SelectItem value="Business Casual">Business Casual</SelectItem>
                          <SelectItem value="Formal">Formal</SelectItem>
                          <SelectItem value="Black Tie">Black Tie</SelectItem>
                          <SelectItem value="Club Attire">Club Attire</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Media URLs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Event Media</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Image URL</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com/event-image.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Primary image displayed on event cards (recommended: 800x600)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="banner_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banner Image URL</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com/event-banner.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Wide banner for event detail page (recommended: 1200x400)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Promotion Settings</h3>

              <FormField
                control={form.control}
                name="is_featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Featured Event</FormLabel>
                      <FormDescription>
                        Featured events appear prominently on the homepage and get higher visibility
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={currentMutation.isPending}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                disabled={currentMutation.isPending}
                className="min-w-[120px]"
              >
                {currentMutation.isPending
                  ? (isEditMode ? "Updating..." : "Creating...")
                  : (isEditMode ? "Update Event" : "Create Event")
                }
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
