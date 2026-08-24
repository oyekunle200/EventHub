import mongoose from "mongoose";
import Event from "../models/event.model.js"
import Ticket from "../models/ticket.model.js"
import User from "../models/user.model.js";



export const createTicket = async (req, res) => {
    try {
        const { event, name, price, ticketType, quantity } = req.body

        if( !event || !name || !price || !ticketType ||!quantity) {
            return res.status(400).json({
                message: "All field are required to create a ticket"
            })
        }
        const existingTickect = await Ticket.find({name: name, ticketType: ticketType})
        if(existingTickect) {
            return res.staus(400).json({
                message: "Ticket already exists"
            })
        }
        const ticket = await Ticket.create({
            event,
            name,
            price,
            quantity,
            availableQuantity: quantity,
            ticketType,
            organizer: req.user._id
        })
        return res.status(201).json({
            message: "Tickets successfully created",
            ticket
        })
    } catch (error) {
       res.status(500).json({
            message: "failed to create ticket",
            error: error.message
        })  
    }
}
export const getTicketsByEvent = async (req, res) => {
    try {
        const { eventId } = req.params
        const tickets = await Ticket.find({ event: eventId})
        .populate("organizer", "name lastname email")
        .populate("event", "title")
        
        return res.status(201).json({
            message: "Tickets retrieve successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}

export const updateTicket = async (req, res) => {
    try {
        const { event, name, price, ticketType, quantity } = req.body
        if (!event || !name || !price || !ticketType || !quantity) {
            return res.status(400).json({
                message: "All field are required to update a ticket"
            })
        }
           const { id } = req.params
                const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true })
        
                return res.status(200).json({
                    message: "Ticket updated successfully",
                    ticket: updatedTicket
                })
            } catch (error) {
                return res.status(500).json({
                    message: "Failed to update ticket",
                    error: error.message
                })
            }
        }

export const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({
                message: "ticket not found"
            });
        }
            await ticket.deleteOne()
    
    return res.status(200).json({
        message: "ticket deleted successfully"
    })
 } catch (error) {
    res.status(500).json({
            message: "internal server error",
            error: error.message
        })
 }
}