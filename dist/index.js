"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_connection_1 = require("./connection/db_connection");
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
// routes 
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const time_1 = __importDefault(require("./routes/time"));
const email_1 = __importDefault(require("./routes/email"));
const card_1 = __importDefault(require("./routes/card"));
const crop_1 = __importDefault(require("./routes/crop"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4001;
(0, db_connection_1.connect)();
// middlewares 
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/users", user_1.default);
app.use("/api/v1/times", time_1.default);
app.use("/api/v1/emails", email_1.default);
app.use("/api/v1/cards", card_1.default);
app.use("/api/v1/crops", crop_1.default);
const endpoints = (0, express_list_endpoints_1.default)(app);
console.log(endpoints);
app.listen(port, () => {
    console.log(`server is running at ${port}`);
});
