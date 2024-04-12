"use client";
import { useState, useEffect, useContext } from "react";
import YourEventsCard from "@/components/explore/YourEventsCard";
import { UserContext } from "@/context/userContext";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Ticket {
  eventId: string;
  ticketId: string;
  nftAddress: string;
  walletAddress: string;
}

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
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!user || !user.isLoggedIn) {
      router.replace("/auth/signin");
    }
  }, [router, user]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:3333/api/tickets", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: { walletAddress: user.walletAddress },
        });
        setTickets(response.data.tickets);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (user && user.token !== "" && user.walletAddress !== "") {
      fetchTickets();
    }
  }, [user]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventIds = tickets.map((ticket) => ticket.eventId);
        const response = await axios.get("http://localhost:3333/api/events", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: { eventIds: eventIds },
        });
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (tickets.length > 0) {
      fetchEvents();
    }
  }, [tickets]);

  return (
    <div className="min-h-[calc(100vh-161px)] max-h-full max-w-[768px] mx-auto mt-7">
      <div className="border-b border-white/20 pb-5 mb-5">
        <h1 className="text-3xl font-bold mb-2">Your Events</h1>
        <p className="text-lg font-base text-white text-opacity-90">
          Discover a world of excitement with our diverse range of events.
          Explore unique experiences and create unforgettable memories today.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {events && events.length !== 0 ? (
          <div className="mt-5 mb-7">
            <h2 className="text-lg font-semibold mb-2">Your Events</h2>
            <div className="">
              {events.map((event, index) => (
                <YourEventsCard key={index} event={event} />
              ))}
            </div>
          </div>
        ) : (
          <p>You have not attended any events.</p>
        )}
      </div>
    </div>
  );
}
