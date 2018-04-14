import 'reflect-metadata';
import app from './server/App';
import chalk from 'chalk';

const port: number = Number(process.env.PORT) || 3000;

app.listen(port, (err: Error) => {
  if (err) {
    console.log(chalk.red(err.message));
    process.exit(1);
  }

  console.log(chalk.blue(`server is listening on ${port}`));
});
