import { Request, Response } from "express";
import TicketModel, { Ticket } from "../models/ticket.model";

export const createTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { eventId, ticketId, nftAddress, walletAddress }: Ticket = req.body;
    if (!eventId || !ticketId || !nftAddress || !walletAddress) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newTicket: Ticket = new TicketModel({
      eventId,
      ticketId,
      nftAddress,
      walletAddress,
    });

    await newTicket.save();

    res
      .status(201)
      .json({ message: "Ticket created successfully", ticket: newTicket });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTickets = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { walletAddress }: { walletAddress?: string } = req.query;

    if (!walletAddress) {
      res
        .status(400)
        .json({ error: "walletAddress is required in the request body" });
      return;
    }

    const tickets: Ticket[] = await TicketModel.find(
      { walletAddress },
      { _id: 0 }
    );

    if (!tickets.length) {
      res
        .status(404)
        .json({ error: "No tickets found for the specified walletAddress" });
      return;
    }

    res.status(200).json({ tickets });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
