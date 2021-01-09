// eslint-disable-next-line import/order
const { TicketsDB } = require('./src/TicketsDB');

const ticketsDB = new TicketsDB();

ticketsDB.createTicket({
  name: 'Поменять краску в принтере',
  status: 'todo',
  description: 'Описание для замены краски в принтере.',
});

ticketsDB.createTicket({
  name: 'Переустановить Windows',
  status: 'done',
  description: 'Описание для переустановки Windows.',
});

const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();
const PORT = process.env.PORT || 3000;

// Чтобы Koa мог обработать запрос, в теле которого передано FormData
app.use(koaBody({
  multipart: true,
}));

app.use(async (ctx) => {
  // ctx.response.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  ctx.response.set('Access-Control-Allow-Origin', 'https://mksinc.github.io');

  let method;
  if (ctx.request.method === 'GET') ({ method } = ctx.request.query);
  else if (ctx.request.method === 'POST') ({ method } = ctx.request.body);

  let response;

  switch (method) {
    case 'allTickets': response = ticketsDB.getTickets();
      break;
    case 'ticketById': response = ticketsDB.getTicketFull(ctx.request.query.id);
      break;
    case 'createTicket': response = 'Ticket created'; ticketsDB.createTicket(ctx.request.body);
      break;
    default: response = `Unknown method '${method}' in request parameters`; ctx.status = 404;
  }

  ctx.body = response;
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Koa server has been started on port ${PORT} ...`));
