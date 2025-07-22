import { EventEditContainer } from '../../view/container/EventEditContainer';

interface EventEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventEditPage({ params }: EventEditPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      <EventEditContainer eventId={id} />
    </div>
  );
}

export async function generateMetadata({ params }: EventEditPageProps) {
  const { id } = await params;

  return {
    title: `Edit Event #${id} | TicketMine`,
    description: 'Edit event details and settings',
  };
}
