import { db } from '../connection';
import {
  users,
  venues,
  eventCategories,
  artists,
  events,
  eventArtists,
  ticketTypes,
  promotionalCodes,
  orders,
  orderItems,
  tickets,
  waitlists,
  resaleListings,
  supportTickets,
  supportMessages,
  analyticsEvents
} from '../schema/schema';

const seedData = async () => {
  console.log('🌱 Starting comprehensive database seeding...');

  try {
    // Clear existing data (in reverse order of dependencies) - skip if tables don't exist
    console.log('🧹 Clearing existing data...');
    try {
      await db.delete(analyticsEvents);
      await db.delete(supportMessages);
      await db.delete(supportTickets);
      await db.delete(resaleListings);
      await db.delete(waitlists);
      await db.delete(tickets);
      await db.delete(orderItems);
      await db.delete(orders);
      await db.delete(promotionalCodes);
      await db.delete(ticketTypes);
      await db.delete(eventArtists);
      await db.delete(events);
      await db.delete(artists);
      await db.delete(eventCategories);
      await db.delete(venues);
      await db.delete(users);
      console.log('✅ Existing data cleared');
    } catch {
      console.log('ℹ️ No existing data to clear (tables may be empty)');
    }

    // 1. Seed Users
    console.log('👤 Seeding users...');
    const [, , , , user5] = await db.insert(users).values([
      {
        email: 'john.doe@example.com',
        password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // hashed "password"
        name: 'John Doe',
        phone: '+1234567890',
        avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=john',
        bio: 'Music enthusiast and concert regular',
        location: 'San Francisco, CA',
        date_of_birth: new Date('1990-05-15'),
        is_active: true,
        is_verified: true,
        email_verified_at: new Date(),
        last_login_at: new Date(),
      },
      {
        email: 'jane.smith@example.com',
        password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        name: 'Jane Smith',
        phone: '+1234567891',
        avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=jane',
        bio: 'Event organizer and music lover',
        location: 'Los Angeles, CA',
        date_of_birth: new Date('1985-08-22'),
        is_active: true,
        is_verified: true,
        email_verified_at: new Date(),
      },
      {
        email: 'mike.johnson@example.com',
        password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        name: 'Mike Johnson',
        phone: '+1234567892',
        avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=mike',
        bio: 'Rock music fan and guitar player',
        location: 'New York, NY',
        date_of_birth: new Date('1992-12-03'),
        is_active: true,
        is_verified: true,
        email_verified_at: new Date(),
      },
      {
        email: 'sarah.wilson@example.com',
        password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        name: 'Sarah Wilson',
        phone: '+1234567893',
        avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=sarah',
        bio: 'Jazz enthusiast and event photographer',
        location: 'Chicago, IL',
        date_of_birth: new Date('1988-03-17'),
        is_active: true,
        is_verified: true,
        email_verified_at: new Date(),
      },
      {
        email: 'admin@ticketmine.com',
        password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        name: 'Admin User',
        phone: '+1234567894',
        avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=admin',
        bio: 'System administrator',
        location: 'San Francisco, CA',
        is_active: true,
        is_verified: true,
        email_verified_at: new Date(),
      },
    ]).returning();

    // 2. Seed Venues
    console.log('🏛️ Seeding venues...');
    const [venue1, venue2, venue3, venue4, venue5] = await db.insert(venues).values([
      {
        name: 'Madison Square Garden',
        address: '4 Pennsylvania Plaza',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postal_code: '10001',
        latitude: '40.7505',
        longitude: '-73.9934',
        capacity: 20000,
        description: 'The World\'s Most Famous Arena',
        amenities: JSON.stringify(['Parking', 'Concessions', 'Merchandise', 'VIP Lounges', 'Accessible Seating']),
        contact_email: 'info@msg.com',
        contact_phone: '+1-212-465-6741',
        website: 'https://www.msg.com',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        is_active: true,
      },
      {
        name: 'The Fillmore',
        address: '1805 Geary Blvd',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        postal_code: '94115',
        latitude: '37.7849',
        longitude: '-122.4194',
        capacity: 1315,
        description: 'Historic music venue in San Francisco',
        amenities: JSON.stringify(['Bar', 'Standing Room', 'Balcony', 'Coat Check']),
        contact_email: 'info@thefillmore.com',
        contact_phone: '+1-415-346-6000',
        website: 'https://www.thefillmore.com',
        image_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
        is_active: true,
      },
      {
        name: 'Red Rocks Amphitheatre',
        address: '18300 W Alameda Pkwy',
        city: 'Morrison',
        state: 'CO',
        country: 'USA',
        postal_code: '80465',
        latitude: '39.6654',
        longitude: '-105.2057',
        capacity: 9525,
        description: 'Naturally formed amphitheatre',
        amenities: JSON.stringify(['Outdoor Seating', 'Natural Acoustics', 'Hiking Trails', 'Gift Shop']),
        contact_email: 'info@redrocksonline.com',
        contact_phone: '+1-720-865-2494',
        website: 'https://www.redrocksonline.com',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        is_active: true,
      },
      {
        name: 'The Troubadour',
        address: '9081 Santa Monica Blvd',
        city: 'West Hollywood',
        state: 'CA',
        country: 'USA',
        postal_code: '90069',
        latitude: '34.0900',
        longitude: '-118.3850',
        capacity: 400,
        description: 'Legendary nightclub and music venue',
        amenities: JSON.stringify(['Full Bar', 'Intimate Setting', 'Standing Room', 'VIP Area']),
        contact_email: 'info@troubadour.com',
        contact_phone: '+1-310-276-1158',
        website: 'https://www.troubadour.com',
        image_url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
        is_active: true,
      },
      {
        name: 'Chicago Theatre',
        address: '175 N State St',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        postal_code: '60601',
        latitude: '41.8855',
        longitude: '-87.6279',
        capacity: 3600,
        description: 'Historic landmark theatre',
        amenities: JSON.stringify(['Historic Building', 'Balcony Seating', 'Concessions', 'Valet Parking']),
        contact_email: 'info@chicagotheatre.com',
        contact_phone: '+1-312-462-6300',
        website: 'https://www.chicagotheatre.com',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        is_active: true,
      },
    ]).returning();

    // 3. Seed Event Categories
    console.log('🎭 Seeding event categories...');
    const [rock, pop, jazz, electronic, , classical, ,] = await db.insert(eventCategories).values([
      {
        name: 'Rock',
        description: 'Rock music concerts and festivals',
        color: '#FF6B6B',
        icon: 'guitar',
        is_active: true,
      },
      {
        name: 'Pop',
        description: 'Pop music performances',
        color: '#4ECDC4',
        icon: 'microphone',
        is_active: true,
      },
      {
        name: 'Jazz',
        description: 'Jazz performances and sessions',
        color: '#45B7D1',
        icon: 'saxophone',
        is_active: true,
      },
      {
        name: 'Electronic',
        description: 'Electronic music and DJ sets',
        color: '#96CEB4',
        icon: 'headphones',
        is_active: true,
      },
      {
        name: 'Country',
        description: 'Country music concerts',
        color: '#FFEAA7',
        icon: 'hat',
        is_active: true,
      },
      {
        name: 'Classical',
        description: 'Classical music performances',
        color: '#DDA0DD',
        icon: 'piano',
        is_active: true,
      },
      {
        name: 'Hip-Hop',
        description: 'Hip-hop and rap concerts',
        color: '#FD79A8',
        icon: 'microphone-alt',
        is_active: true,
      },
      {
        name: 'Indie',
        description: 'Independent music artists',
        color: '#FDCB6E',
        icon: 'music-note',
        is_active: true,
      },
    ]).returning();

    // 4. Seed Artists
    console.log('🎤 Seeding artists...');
    const [artist1, artist2, artist3, artist4, , artist6] = await db.insert(artists).values([
      {
        name: 'The Electric Storm',
        bio: 'High-energy rock band from Seattle known for their electrifying performances and powerful vocals.',
        genre: 'Rock',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        website: 'https://www.electricstorm.com',
        social_media: JSON.stringify({
          spotify: 'https://open.spotify.com/artist/electricstorm',
          instagram: '@electricstormband',
          twitter: '@electricstorm',
          facebook: 'ElectricStormBand'
        }),
        is_active: true,
      },
      {
        name: 'Luna Martinez',
        bio: 'Solo pop artist with a unique voice and captivating stage presence.',
        genre: 'Pop',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        website: 'https://www.lunamartinez.com',
        social_media: JSON.stringify({
          spotify: 'https://open.spotify.com/artist/lunamartinez',
          instagram: '@lunamartinez',
          twitter: '@luna_martinez',
          tiktok: '@lunamartinez'
        }),
        is_active: true,
      },
      {
        name: 'The Midnight Collective',
        bio: 'Jazz ensemble specializing in modern interpretations of classic jazz standards.',
        genre: 'Jazz',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        website: 'https://www.midnightcollective.com',
        social_media: JSON.stringify({
          spotify: 'https://open.spotify.com/artist/midnightcollective',
          instagram: '@midnightcollective',
          youtube: 'MidnightCollectiveJazz'
        }),
        is_active: true,
      },
      {
        name: 'DJ Nexus',
        bio: 'Electronic music producer and DJ known for innovative soundscapes and immersive performances.',
        genre: 'Electronic',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        website: 'https://www.djnexus.com',
        social_media: JSON.stringify({
          spotify: 'https://open.spotify.com/artist/djnexus',
          soundcloud: 'djnexus',
          instagram: '@djnexus',
          twitter: '@dj_nexus'
        }),
        is_active: true,
      },
      {
        name: 'Wildfire Country',
        bio: 'Country music duo with authentic storytelling and harmonious vocals.',
        genre: 'Country',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        website: 'https://www.wildfirecountry.com',
        social_media: JSON.stringify({
          spotify: 'https://open.spotify.com/artist/wildfirecountry',
          instagram: '@wildfirecountry',
          twitter: '@wildfire_country',
          facebook: 'WildfireCountryMusic'
        }),
        is_active: true,
      },
      {
        name: 'Symphony Orchestra',
        bio: 'World-renowned orchestra performing classical masterpieces with modern interpretations.',
        genre: 'Classical',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        website: 'https://www.symphonyorchestra.com',
        social_media: JSON.stringify({
          website: 'https://www.symphonyorchestra.com',
          instagram: '@symphonyorchestra',
          facebook: 'SymphonyOrchestra'
        }),
        is_active: true,
      },
    ]).returning();

    // 5. Seed Events
    console.log('🎉 Seeding events...');
    const [event1, event2, event3, event4, event5] = await db.insert(events).values([
      {
        name: 'Electric Storm: Thunder Tour 2025',
        description: 'Join The Electric Storm for their biggest tour yet! Experience their latest album "Thunder" live with special effects and an unforgettable rock experience.',
        short_description: 'The Electric Storm\'s biggest tour with special effects and rock anthems',
        start_date: new Date('2025-08-15T20:00:00'),
        end_date: new Date('2025-08-15T23:00:00'),
        doors_open: new Date('2025-08-15T19:00:00'),
        venue_id: venue1.id,
        category_id: rock.id,
        primary_artist_id: artist1.id,
        age_restriction: '18+',
        dress_code: 'Casual',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        banner_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200',
        status: 'published',
        is_featured: true,
        max_tickets_per_user: 8,
        sale_start_date: new Date('2025-01-01T10:00:00'),
        sale_end_date: new Date('2025-08-15T20:00:00'),
        total_capacity: 18000,
        sold_tickets: 12500,
        created_by: user5.id,
      },
      {
        name: 'Luna Martinez: Moonlight Sessions',
        description: 'An intimate evening with pop sensation Luna Martinez. Experience her hit songs and new material in an acoustic setting.',
        short_description: 'Intimate acoustic session with pop star Luna Martinez',
        start_date: new Date('2025-07-22T19:30:00'),
        end_date: new Date('2025-07-22T21:30:00'),
        doors_open: new Date('2025-07-22T18:30:00'),
        venue_id: venue2.id,
        category_id: pop.id,
        primary_artist_id: artist2.id,
        age_restriction: 'All Ages',
        dress_code: 'Smart Casual',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        banner_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200',
        status: 'published',
        is_featured: true,
        max_tickets_per_user: 6,
        sale_start_date: new Date('2025-01-15T10:00:00'),
        sale_end_date: new Date('2025-07-22T19:30:00'),
        total_capacity: 1200,
        sold_tickets: 950,
        created_by: user5.id,
      },
      {
        name: 'Jazz Under the Stars',
        description: 'The Midnight Collective performs under the open sky at Red Rocks. A magical evening of jazz classics and contemporary pieces.',
        short_description: 'Outdoor jazz performance at the iconic Red Rocks venue',
        start_date: new Date('2025-09-05T20:00:00'),
        end_date: new Date('2025-09-05T22:30:00'),
        doors_open: new Date('2025-09-05T19:00:00'),
        venue_id: venue3.id,
        category_id: jazz.id,
        primary_artist_id: artist3.id,
        age_restriction: '21+',
        dress_code: 'Casual',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        banner_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200',
        status: 'published',
        is_featured: false,
        max_tickets_per_user: 4,
        sale_start_date: new Date('2025-02-01T10:00:00'),
        sale_end_date: new Date('2025-09-05T20:00:00'),
        total_capacity: 9000,
        sold_tickets: 3200,
        created_by: user5.id,
      },
      {
        name: 'DJ Nexus: Neon Nights',
        description: 'Experience the future of electronic music with DJ Nexus. Featuring state-of-the-art sound and lighting systems.',
        short_description: 'Electronic music experience with cutting-edge production',
        start_date: new Date('2025-08-30T22:00:00'),
        end_date: new Date('2025-08-31T03:00:00'),
        doors_open: new Date('2025-08-30T21:00:00'),
        venue_id: venue4.id,
        category_id: electronic.id,
        primary_artist_id: artist4.id,
        age_restriction: '21+',
        dress_code: 'Club Attire',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        banner_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200',
        status: 'published',
        is_featured: true,
        max_tickets_per_user: 10,
        sale_start_date: new Date('2025-03-01T10:00:00'),
        sale_end_date: new Date('2025-08-30T22:00:00'),
        total_capacity: 350,
        sold_tickets: 280,
        created_by: user5.id,
      },
      {
        name: 'Symphony Orchestra: Beethoven\'s 9th',
        description: 'A grand performance of Beethoven\'s 9th Symphony with full orchestra and choir at the historic Chicago Theatre.',
        short_description: 'Classical masterpiece performed by world-renowned orchestra',
        start_date: new Date('2025-10-12T19:00:00'),
        end_date: new Date('2025-10-12T21:00:00'),
        doors_open: new Date('2025-10-12T18:00:00'),
        venue_id: venue5.id,
        category_id: classical.id,
        primary_artist_id: artist6.id,
        age_restriction: 'All Ages',
        dress_code: 'Formal',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        banner_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200',
        status: 'published',
        is_featured: false,
        max_tickets_per_user: 6,
        sale_start_date: new Date('2025-04-01T10:00:00'),
        sale_end_date: new Date('2025-10-12T19:00:00'),
        total_capacity: 3500,
        sold_tickets: 1200,
        created_by: user5.id,
      },
    ]).returning();

    // 6. Seed Event Artists (many-to-many relationships)
    console.log('🎭 Seeding event-artist relationships...');
    await db.insert(eventArtists).values([
      {
        event_id: event1.id,
        artist_id: artist1.id,
        role: 'headliner',
        order: 1,
      },
      {
        event_id: event2.id,
        artist_id: artist2.id,
        role: 'headliner',
        order: 1,
      },
      {
        event_id: event3.id,
        artist_id: artist3.id,
        role: 'headliner',
        order: 1,
      },
      {
        event_id: event4.id,
        artist_id: artist4.id,
        role: 'headliner',
        order: 1,
      },
      {
        event_id: event5.id,
        artist_id: artist6.id,
        role: 'headliner',
        order: 1,
      },
    ]);

    // 7. Seed Ticket Types
    console.log('🎫 Seeding ticket types...');
    const ticketTypeData = [];

    // Event 1: Electric Storm - Rock Concert
    ticketTypeData.push(
      {
        event_id: event1.id,
        name: 'General Admission',
        description: 'Standing room access to the main floor',
        base_price: '75.00',
        fees: '12.50',
        total_available: 10000,
        remaining_available: 2500,
        min_purchase: 1,
        max_purchase: 8,
        is_vip: false,
        is_active: true,
        sort_order: 1,
      },
      {
        event_id: event1.id,
        name: 'VIP Experience',
        description: 'Premium seating, meet & greet, and exclusive merchandise',
        base_price: '250.00',
        fees: '35.00',
        total_available: 500,
        remaining_available: 150,
        min_purchase: 1,
        max_purchase: 4,
        is_vip: true,
        perks: JSON.stringify(['Meet & Greet', 'Exclusive Merchandise', 'Premium Seating', 'VIP Lounge Access']),
        is_active: true,
        sort_order: 2,
      },
      {
        event_id: event1.id,
        name: 'Balcony Seating',
        description: 'Reserved seating in the balcony section',
        base_price: '125.00',
        fees: '18.75',
        total_available: 7500,
        remaining_available: 2850,
        min_purchase: 1,
        max_purchase: 6,
        is_vip: false,
        is_active: true,
        sort_order: 3,
      }
    );

    // Event 2: Luna Martinez - Pop Concert
    ticketTypeData.push(
      {
        event_id: event2.id,
        name: 'General Admission',
        description: 'Standing room access',
        base_price: '65.00',
        fees: '10.50',
        total_available: 800,
        remaining_available: 50,
        min_purchase: 1,
        max_purchase: 6,
        is_vip: false,
        is_active: true,
        sort_order: 1,
      },
      {
        event_id: event2.id,
        name: 'VIP Package',
        description: 'Priority seating and acoustic session access',
        base_price: '180.00',
        fees: '25.00',
        total_available: 200,
        remaining_available: 0,
        min_purchase: 1,
        max_purchase: 4,
        is_vip: true,
        perks: JSON.stringify(['Priority Seating', 'Acoustic Session', 'Signed Poster', 'VIP Bar Access']),
        is_active: true,
        sort_order: 2,
      },
      {
        event_id: event2.id,
        name: 'Balcony Reserved',
        description: 'Reserved balcony seating with great views',
        base_price: '95.00',
        fees: '14.25',
        total_available: 400,
        remaining_available: 200,
        min_purchase: 1,
        max_purchase: 4,
        is_vip: false,
        is_active: true,
        sort_order: 3,
      }
    );

    // Event 3: Jazz Under the Stars
    ticketTypeData.push(
      {
        event_id: event3.id,
        name: 'General Admission',
        description: 'Open seating on the rocks',
        base_price: '55.00',
        fees: '8.50',
        total_available: 7000,
        remaining_available: 3800,
        min_purchase: 1,
        max_purchase: 8,
        is_vip: false,
        is_active: true,
        sort_order: 1,
      },
      {
        event_id: event3.id,
        name: 'Reserved Seating',
        description: 'Guaranteed seating with optimal sound',
        base_price: '85.00',
        fees: '12.75',
        total_available: 2000,
        remaining_available: 1200,
        min_purchase: 1,
        max_purchase: 6,
        is_vip: false,
        is_active: true,
        sort_order: 2,
      }
    );

    // Event 4: DJ Nexus - Electronic
    ticketTypeData.push(
      {
        event_id: event4.id,
        name: 'General Admission',
        description: 'Dance floor access',
        base_price: '45.00',
        fees: '7.50',
        total_available: 300,
        remaining_available: 20,
        min_purchase: 1,
        max_purchase: 10,
        is_vip: false,
        is_active: true,
        sort_order: 1,
      },
      {
        event_id: event4.id,
        name: 'VIP Booth',
        description: 'Private booth with bottle service',
        base_price: '350.00',
        fees: '50.00',
        total_available: 50,
        remaining_available: 0,
        min_purchase: 1,
        max_purchase: 8,
        is_vip: true,
        perks: JSON.stringify(['Private Booth', 'Bottle Service', 'VIP Entrance', 'Dedicated Server']),
        is_active: true,
        sort_order: 2,
      }
    );

    // Event 5: Symphony Orchestra
    ticketTypeData.push(
      {
        event_id: event5.id,
        name: 'Orchestra Seating',
        description: 'Premium orchestra level seating',
        base_price: '120.00',
        fees: '18.00',
        total_available: 1500,
        remaining_available: 800,
        min_purchase: 1,
        max_purchase: 6,
        is_vip: false,
        is_active: true,
        sort_order: 1,
      },
      {
        event_id: event5.id,
        name: 'Balcony Seating',
        description: 'Upper level seating with excellent acoustics',
        base_price: '75.00',
        fees: '11.25',
        total_available: 1500,
        remaining_available: 1100,
        min_purchase: 1,
        max_purchase: 8,
        is_vip: false,
        is_active: true,
        sort_order: 2,
      },
      {
        event_id: event5.id,
        name: 'Box Seats',
        description: 'Private box seating for groups',
        base_price: '200.00',
        fees: '30.00',
        total_available: 500,
        remaining_available: 300,
        min_purchase: 1,
        max_purchase: 4,
        is_vip: true,
        perks: JSON.stringify(['Private Box', 'Intermission Refreshments', 'Program', 'Coat Check']),
        is_active: true,
        sort_order: 3,
      }
    );

    await db.insert(ticketTypes).values(ticketTypeData);

    // 8. Seed Promotional Codes
    console.log('🎁 Seeding promotional codes...');
    await db.insert(promotionalCodes).values([
      {
        code: 'EARLYBIRD2025',
        description: 'Early bird discount for 2025 events',
        discount_type: 'percentage',
        discount_value: '15.00',
        minimum_purchase: '50.00',
        maximum_discount: '50.00',
        usage_limit: 1000,
        used_count: 243,
        valid_from: new Date('2025-01-01'),
        valid_until: new Date('2025-12-31'),
        applicable_events: JSON.stringify([event1.id, event2.id, event3.id]),
        is_active: true,
        created_by: user5.id,
      },
      {
        code: 'STUDENT50',
        description: 'Student discount - 50% off',
        discount_type: 'percentage',
        discount_value: '50.00',
        minimum_purchase: '25.00',
        maximum_discount: '100.00',
        usage_limit: 500,
        used_count: 87,
        valid_from: new Date('2025-01-01'),
        valid_until: new Date('2025-12-31'),
        applicable_events: JSON.stringify([event2.id, event3.id, event5.id]),
        is_active: true,
        created_by: user5.id,
      },
      {
        code: 'NEWUSER20',
        description: 'New user welcome discount',
        discount_type: 'fixed_amount',
        discount_value: '20.00',
        minimum_purchase: '75.00',
        usage_limit: 2000,
        used_count: 456,
        valid_from: new Date('2025-01-01'),
        valid_until: new Date('2025-12-31'),
        is_active: true,
        created_by: user5.id,
      },
    ]);

    console.log('✅ Comprehensive database seeding completed successfully!');
    console.log('📊 Seeded data summary:');
    console.log('  - 5 Users (including 1 admin)');
    console.log('  - 5 Venues across different cities');
    console.log('  - 8 Event categories');
    console.log('  - 6 Artists across different genres');
    console.log('  - 5 Events with comprehensive details');
    console.log('  - 13 Ticket types with various pricing');
    console.log('  - 3 Promotional codes');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

export default seedData;
