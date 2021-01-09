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
    return JSON.stringify(this.tickets);
  }

  getTicketFull({ id }) {
    return JSON.stringify(
      new TicketFull({ ...this.tickets[id], description: this.ticketsDescription.get(id) }),
    );
  }

  changeStatus({ id }) {
    const ticket = this.tickets.find((el) => el.id === id);

    if (ticket.status === 'todo') ticket.status = 'done';
    else ticket.status = 'todo';

    return JSON.stringify({ status: ticket.status });
  }
}

module.exports = {
  TicketsDB,
};
