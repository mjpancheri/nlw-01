import express from 'express';
import {errors} from 'celebrate';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

/*app.use(cors({
  origin: 'www.dominio.com'
}));*/
app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/assets', express.static(path.resolve(__dirname, '..', 'assets')));
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(3333);