"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const app = (0, express_2.default)();
const route = (0, express_1.Router)();
app.use(express_2.default.json());
route.get('/get', (req, res) => {
    res.json({ message: 'GET request received' });
});
app.use(route);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
