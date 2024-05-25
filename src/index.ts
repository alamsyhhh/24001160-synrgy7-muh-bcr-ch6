import express, { Express } from 'express';
import { carRoutes } from './routes/carsRoutes';
import { userRoutes } from './routes/usersRoutes';
import { knexInstance } from '../config/config';
import { Model } from 'objection';
import errorHandlingMiddleware from './middlewares/errorUploadHandlingMiddleware';
import swaggerUi from 'swagger-ui-express';
import apidocs from '../apidocs.json';

Model.knex(knexInstance);

const PORT = 9000;
const app: Express = express();

// Menggunakan spesifikasi Swagger dari file apidocs.json
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apidocs));

const cv1 = '/api/v1/cms';
const v1 = '/api/v1';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${cv1}`, carRoutes, errorHandlingMiddleware);
app.use(`${v1}`, userRoutes);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
