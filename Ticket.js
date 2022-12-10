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

    static updateTicket(arr, ...params) {
        const {id, name, description} = params[0];

        const ticketIndex = arr.findIndex(item => item.id == id);

        arr[ticketIndex].name = name;

        if ('description' in arr[ticketIndex]) {
            arr[ticketIndex].description = description;
        }
    }
}

module.exports = Ticket;