import app from "./app.js";

import dotenv from 'dotenv';
dotenv.config();

const PORT = 5000;

(async () => {
  app.listen(PORT, () => {
    console.log(`Application is listening on PORT: ${PORT}.`);
  });
})();
