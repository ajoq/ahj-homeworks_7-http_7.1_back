class Ticket {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.status = false;
        this.created = this.createDate();
    }

    createDate() {
        const date = new Date();
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear().toString().slice(-2)} ${date.getHours()}:${date.getMinutes()}`;
    }

    static findIndex(arr, id) {
        return arr.findIndex(item => item.id == id);
    }

    static deteleTicket(arr, id) {
        const ticketIndex = Ticket.findIndex(arr, id);
        arr.splice(ticketIndex, 1);
    }

    static updateStatus(arr, id) {
        const ticketIndex = Ticket.findIndex(arr, id);
        arr[ticketIndex].status ? arr[ticketIndex].status = false : arr[ticketIndex].status = true;
    }

    static updateTicket(arr, id, ...params) {
        const {name, description} = params[0];

        const ticketIndex = Ticket.findIndex(arr, id);

        arr[ticketIndex].name = name;

        if ('description' in arr[ticketIndex]) {
            arr[ticketIndex].description = description;
        }
    }
}

module.exports = Ticket;