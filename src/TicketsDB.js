const { Ticket, TicketFull } = require('./Ticket');

class TicketsDB {
  constructor() {
    this.tickets = [];
    this.ticketsDescription = new Map();
  }

  createTicket({ name, status, description }) {
    const id = `${this.tickets.length}`;
    this.tickets.push(new Ticket({
      id, name, status, created: new Date(),
    }));
    this.ticketsDescription.set(id, description);
  }

  getTickets() {
    return this.tickets;
  }

  getTicketFull(id) {
    return new TicketFull({ ...this.tickets[id], description: this.ticketsDescription.get(id) });
  }
}

module.exports = {
  TicketsDB,
};
