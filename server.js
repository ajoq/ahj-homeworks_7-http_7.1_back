
const http = require('http');
const Koa = require('koa');
const { koaBody } = require('koa-body');
const app = new Koa();
const Ticket = require('./Ticket');
const TicketFull = require('./TicketFull');

const tickets = [];
const ticketsFull = [];

//Тестовые данные
const ticket1 = new Ticket(1, 'Поменять краску в принтере, ком. 404');
const ticket2 = new Ticket(2, 'Переустановить Windows, ПК-Hall24');
const ticket3 = new Ticket(3, 'Установить обновление KB-XXX');
tickets.push(ticket1, ticket2, ticket3);

const ticketFull1 = new TicketFull(1, 'Поменять краску в принтере, ком. 404', 'ДЕТАЛЬНО Поменять краску в принтере, ком. 404');
const ticketFull2 = new TicketFull(2, 'Переустановить Windows, ПК-Hall24', 'ДЕТАЛЬНО Переустановить Windows, ПК-Hall24');
const ticketFull3 = new TicketFull(3, 'Установить обновление KB-XXX', 'ДЕТАЛЬНО Установить обновление KB-XXX');
ticketsFull.push(ticketFull1, ticketFull2, ticketFull3);
//Тестовые данные

app.use(koaBody({
    urlencoded: true,
    multipart: true
}));

app.use((ctx, next) => {
    if (ctx.request.method !== 'OPTIONS') {
        next();
        return;
    }

    ctx.response.set('Access-Control-Allow-Origin', '*');
    ctx.response.set('Access-Control-Allow-Methods', 'DELETE, PUT, PATCH, GET, POST');
    ctx.response.status = 204;
});

app.use(async ctx => {
    const { method } = ctx.request.query;
    console.log(method);

    switch (method) {
        case 'allTickets':
            ctx.response.body = tickets;
            ctx.response.status = 200;
            ctx.response.set('Access-Control-Allow-Origin', '*');
            return;
        case 'ticketById':
            const { id } = ctx.request.query;
            const result = ticketsFull.find(item => item.id == id);
            ctx.response.body = result;
            ctx.response.status = 200;
            ctx.response.set('Access-Control-Allow-Origin', '*');
            return;
        case 'createTicket':
            console.log(ctx.request.body);
            const {name, description} = ctx.request.body;
            console.log(name);
            console.log(description);
            ctx.response.status = 200;
            ctx.response.set('Access-Control-Allow-Origin', '*');
            return;
        default:
            ctx.response.status = 404;
            return;
    }
});


const server = http.createServer(app.callback());
const port = 7070;

server.listen(port, (err) => {
    if (err) {
        console.log('Error occured: ', err);
        return;
    }
    console.log(`Сервер слушает тебя, порт ${port}`);
});
