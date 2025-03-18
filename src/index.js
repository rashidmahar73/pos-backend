import app from "./app";
// import initRootOrg from './@core/utils/init-root-org';

// const PORT = process.env.PORT;
const PORT = 3000;

(async () => {
  //   const rootOrg = await initRootOrg({
  //     name: 'Society of Surgeons of Pakistan, Lahore',
  //     slug: 'sspl'
  //   });

  //   app.set('org', rootOrg);

  app.listen(PORT, () => {
    console.log(`Application is listening on PORT: ${PORT}.`);
  });
})();
