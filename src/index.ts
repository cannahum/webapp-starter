import app from './server/App';

const port: number = Number(process.env.PORT) || 3000;

app.listen(port, (err: Error) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`server is listening on ${port}`);
});
