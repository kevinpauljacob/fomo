import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
interface CardProps {
  event: {
    eventName: string;
    organizer: string;
    organizerWalletAddress: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
    capacity: string;
    ticketPrice: string;
    eventId: string;
    imgUri: string;
  };
}

const Card: React.FC<CardProps> = ({ event }) => {
  return (
    <div className="bg-black/30 hover:bg-black/40 transition-all rounded-lg border border-black/10 p-3 min-h-[220px]">
      <div className="flex justify-between mb-2">
        <Image
          src={event.imgUri}
          alt={event.eventName}
          width={40}
          height={40}
          className="rounded-md"
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-sm font-semibold text-white text-opacity-90 hover:text-opacity-100 transition-all px-4 py-1 h-min"
            >
              View Details
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-gray-950">
            <SheetHeader>
              <Image
                src={event.imgUri}
                alt={event.eventName}
                width={100}
                height={100}
              />
              <SheetTitle className="text-white text-opacity-90">
                {event.eventName}
              </SheetTitle>
              <SheetDescription>{event.description}</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <h2 className="text-xl font-semibold">{event.eventName}</h2>
      <p className="text-sm font-semibold text-white text-opacity-80 text-ellipsis overflow-hidden">
        {event.description}
      </p>
    </div>
  );
};

export default Card;
