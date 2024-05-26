"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const carsRoutes_1 = require("./routes/carsRoutes");
const usersRoutes_1 = require("./routes/usersRoutes");
const postgresConfig_1 = require("../config/postgresConfig");
const objection_1 = require("objection");
const errorUploadHandlingMiddleware_1 = __importDefault(require("./middlewares/errorUploadHandlingMiddleware"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const apidocs_json_1 = __importDefault(require("../apidocs.json"));
objection_1.Model.knex(postgresConfig_1.knexInstance);
const PORT = 9000;
const app = (0, express_1.default)();
// Menggunakan spesifikasi Swagger dari file apidocs.json
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(apidocs_json_1.default));
const cv1 = '/api/v1/cms';
const v1 = '/api/v1';
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(`${cv1}`, carsRoutes_1.carRoutes, errorUploadHandlingMiddleware_1.default);
app.use(`${v1}`, usersRoutes_1.userRoutes);
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
