// eslint-disable-next-line max-classes-per-file
class Ticket {
  constructor({
    id, name, created,
  }) {
    this.id = id;
    this.name = name;
    this.status = 'todo';
    this.created = created;
  }
}

class TicketFull extends Ticket {
  constructor({
    id, name, status, created, description,
  }) {
    super({
      id, name, created,
    });
    this.status = status;
    this.description = description;
  }
}

module.exports = {
  Ticket,
  TicketFull,
};
