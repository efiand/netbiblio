// Для работы с process.env на сервере

import dotenv from "dotenv";

dotenv.config();

export const DEV = process.env.NODE_ENV === "development";
