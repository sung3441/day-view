import { rest } from 'msw';

export const handlers = [
  rest.get('/test', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 'test',
        title: 'Spider Man',
        rate: 4.5,
      })
    );
  }),

  rest.get('/people', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 'test',
        title: 'Spider Man',
        rate: 4.5,
      })
    );
  }),
];
