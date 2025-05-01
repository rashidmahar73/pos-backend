import app from "./app.js";

const PORT = 3000;

(async () => {
  app.listen(PORT, () => {
    console.log(`Application is listening on PORT: ${PORT}.`);
  });
})();
