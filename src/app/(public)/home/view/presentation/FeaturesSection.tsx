import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Shield, Zap, Users, MapPin, Star } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Book tickets for your favorite events in just a few clicks with our streamlined checkout process.',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your payment information is protected with industry-standard security measures.',
    },
    {
      icon: Zap,
      title: 'Instant Confirmation',
      description: 'Get instant email confirmations and mobile tickets delivered straight to your phone.',
    },
    {
      icon: Users,
      title: 'Event Management',
      description: 'Organizers can create, manage, and promote events with our comprehensive dashboard.',
    },
    {
      icon: MapPin,
      title: 'Local Discovery',
      description: 'Discover events happening in your city with location-based recommendations.',
    },
    {
      icon: Star,
      title: 'Premium Support',
      description: '24/7 customer support to help you with any questions or issues you might have.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose TicketMine?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We make discovering and booking events simple, secure, and enjoyable for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
