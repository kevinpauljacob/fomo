"use client";
import { useState, useEffect, useContext } from "react";
import FeaturedEventsCard from "@/components/explore/FeaturedEventsCard";
import { UserContext } from "@/context/userContext";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Event {
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
}

export default function page() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!user || !user.isLoggedIn) {
      router.replace("/auth/signin");
    }
  }, [router, user]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3333/api/events/explore",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setEvents(response.data.events);
        console.log("Events:", response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  return (
    <div className="min-h-[calc(100vh-161px)] max-h-full max-w-[768px] mx-auto mt-7">
      <div className="border-b border-white/20 pb-5 mb-5">
        <h1 className="text-3xl font-bold mb-2">Explore Events</h1>
        <p className="text-lg font-base text-white text-opacity-90">
          Discover a world of excitement with our diverse range of events.
          Explore unique experiences and create unforgettable memories today.
        </p>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Featured Events</h2>
        <div className="grid grid-cols-3 gap-4">
          {events.length > 0 ? (
            events.map((event, index) => (
              <FeaturedEventsCard key={index} event={event} />
            ))
          ) : (
            <p>No featured events available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
