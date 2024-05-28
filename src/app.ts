import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { KBRoutes } from './app/modules/KBS/KB.route';
import { orderRoutes } from './app/modules/Orders/order.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application

app.use('/api/products', KBRoutes);
app.use('/api/orders', orderRoutes);

const home = (req: Request, res: Response) => {
  res.send('WOHOOOOO HIIII <33333');
};

app.get('/', home);



app.all('*', (req, res) => {
  res.status(400).json({
    success: false,
    message: 'route not found',
  });
});

export default app;
