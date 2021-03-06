const { nanoid } = require('nanoid');
const { Ticket, TicketFull } = require('./Ticket');

class TicketsDB {
  constructor() {
    this.tickets = [];
    this.ticketsDescription = new Map();
  }

  createTicket({ name, description }) {
    const id = nanoid();
    const ticket = new Ticket({
      id, name, created: new Date(),
    });

    this.tickets.push(ticket);
    this.ticketsDescription.set(id, description);

    return ticket;
  }

  getTickets() {
    return this.tickets;
  }

  getTicketFull({ id }) {
    const ticket = this.tickets.find((el) => el.id === id);
    return new TicketFull({ ...ticket, description: this.ticketsDescription.get(id) });
  }

  changeStatus({ id }) {
    const ticket = this.tickets.find((el) => el.id === id);

    if (ticket.status === 'todo') ticket.status = 'done';
    else ticket.status = 'todo';

    return ticket.status;
  }

  updateTicket({ id, name, description }) {
    this.tickets.find((el) => el.id === id)
      .name = name;
    this.ticketsDescription.set(id, description);

    return this.getTicketFull({ id });
  }

  deleteTicket({ id }) {
    this.tickets = this.tickets.filter((ticket) => ticket.id !== id);
    this.ticketsDescription.delete(id);
    console.log(this.tickets);
    console.log(this.ticketsDescription);

    return 'Ticket deleted';
  }
}

module.exports = {
  TicketsDB,
};
