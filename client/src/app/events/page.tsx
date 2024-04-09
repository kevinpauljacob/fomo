"use client";
import { useState, useEffect } from "react";
import YourEventsCard from "@/components/explore/YourEventsCard";
interface Event {
  src: string;
  href: string;
  title: string;
  // hostedBy: string;
  // startDate: string;
  // endDate: string;
  // location: string;
  // ticketPrice: number;
  // capacity: number;
  description: string;
  // eventId: string;
  // organizerWalletAddress: string;
}

export default function page() {
  const [yourEvents, setYourEvents] = useState<Event[]>([
    {
      src: "/assets/image1.avif",
      href: "/link/destination1",
      title: "Music Festival Spectacular",
      description:
        "Experience the ultimate music festival with top artists performing live, food stalls, and exciting activities for all music enthusiasts.",
    },
    {
      src: "/assets/image2.avif",
      href: "/link/destination2",
      title: "Adventure Trekking Expedition",
      description:
        "Embark on an adventurous trekking expedition through breathtaking landscapes, challenging terrains, and hidden trails.",
    },
  ]);

  return (
    <div className="min-h-[calc(100vh-161px)] max-h-full max-w-[768px] mx-auto mt-7">
      <div className="border-b border-white/20 pb-5 mb-5">
        <h1 className="text-3xl font-bold mb-2">Your Events</h1>
        <p className="text-lg font-base text-white text-opacity-90">
          Discover a world of excitement with our diverse range of events.
          Explore unique experiences and create unforgettable memories today.
        </p>
      </div>
      {yourEvents && yourEvents.length !== 0 && (
        <div className="mt-5 mb-7">
          <h2 className="text-lg font-semibold mb-2">Your Events</h2>
          <div className="">
            {yourEvents.map((data, index) => (
              <YourEventsCard
                key={index}
                src={data.src}
                href={data.href}
                title={data.title}
                description={data.description}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
