import app from "./app.js";

const PORT = 5000;

(async () => {
  app.listen(PORT, () => {
    console.log(`Application is listening on PORT: ${PORT}.`);
  });
})();
