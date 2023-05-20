import { rest } from 'msw';

export const handlers = [
  rest.get('https://test.api.com/movies', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 1,
            title: 'Spider Man',
            rate: 4.5,
          },
          {
            id: 2,
            title: 'Kings Man',
            rate: 4.5,
          },
        ],
      })
    );
  }),

  rest.get('https://test.api.com/movies/1', (req, res, ctx) => {
    console.log('res', res);
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        title: 'Spider Man',
        rate: 4.5,
      })
    );
  }),

  rest.get('/test', (req, res, ctx) => {
    console.log('res', res);
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
    console.log('res', res);
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
