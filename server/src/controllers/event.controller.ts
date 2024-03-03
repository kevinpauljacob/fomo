import { Request, Response } from "express";
import EventModel, { Event } from "../models/event.model"; // Assuming your model file is named Event.ts

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Extract event details from request body
    const eventData: Event = req.body;

    // Create a new event document
    const newEvent: Event = new EventModel(eventData);

    // Save the new event to the database
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
