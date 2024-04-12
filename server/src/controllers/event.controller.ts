import { Request, Response } from "express";
import EventModel, { Event } from "../models/event.model"; // Assuming your model file is named Event.ts
import { v4 as uuidv4 } from "uuid";

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const eventId: string = uuidv4();
    const eventData: Event = req.body;
    const newEvent: Event = new EventModel({
      ...eventData,
      eventId: eventId,
    });
    await newEvent.save();

    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetch all events from the database
    const events: Event[] = await EventModel.find();

    res.status(200).json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEventsByIds = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { eventIds }: { eventIds?: string[] } = req.query;

    if (!eventIds || !Array.isArray(eventIds) || eventIds.length === 0) {
      res.status(400).json({
        error: "eventIds must be a non-empty array in the request body",
      });
      return;
    }

    const events: Event[] = await EventModel.find({
      eventId: { $in: eventIds },
    });

    if (events.length === 0) {
      res
        .status(404)
        .json({ error: "No events found for the specified eventIds" });
      return;
    }

    res.status(200).json({ events });
  } catch (error) {
    console.error("Error fetching events by eventIds:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
