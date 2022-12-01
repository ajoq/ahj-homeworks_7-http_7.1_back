const Ticket = require('./Ticket');

class TicketFull extends Ticket {
    constructor(id, name, description) {
        super(id, name);
        this.description = description;
    }
}

module.exports = TicketFull;