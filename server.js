// eslint-disable-next-line import/order
const { TicketsDB } = require('./src/TicketsDB');

const ticketsDB = new TicketsDB();

// Тестовые заявки
ticketsDB.createTicket({
  name: 'Поменять краску в принтере',
  description: 'Описание для замены краски в принтере.',
});

ticketsDB.createTicket({
  name: 'Переустановить Windows',
  description: 'Описание для переустановки Windows.',
});

ticketsDB.changeStatus({ id: '1' });

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

  const response = {
    success: true,
    data: '',
  };

  switch (method) {
    case 'allTickets': response.data = ticketsDB.getTickets();
      break;
    case 'ticketById': response.data = ticketsDB.getTicketFull(ctx.request.query);
      break;
    case 'createTicket': response.data = ticketsDB.createTicket(ctx.request.body);
      break;
    case 'changeStatus': response.data = ticketsDB.changeStatus(ctx.request.body);
      break;
    case 'updateTicket': response.data = ticketsDB.updateTicket(ctx.request.body);
      break;
    case 'deleteTicket': response.data = ticketsDB.deleteTicket(ctx.request.body);
      break;
    default:
      response.success = false;
      response.data = `Unknown method '${method}' in request parameters`;
  }

  ctx.body = JSON.stringify(response);
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Koa server has been started on port ${PORT} ...`));
