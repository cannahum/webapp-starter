import app from './server/App';
import {parse, config, DotenvResult} from 'dotenv';
import {resolve} from 'path';

const port: number = Number(process.env.PORT) || 3000;

app.listen(port, (err: Error) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`server is listening on ${port}`);
});

console.log('NODE_ENV:', process.env.NODE_ENV);
let envVariables: DotenvResult = {};
if (process.env.NODE_ENV === 'test') {
  envVariables = config({
    path: resolve(__dirname, '../.env.test'),
  });
} else if (process.env.NODE_ENV === 'dev') {
  envVariables = config({
    path: resolve(__dirname, '../.env.dev'),
  });
} else {
  console.log('no env variables.');
}

const {parsed} = envVariables;
if (parsed) {
  for (const k in parsed) {
    if (parsed.hasOwnProperty(k)) {
      process.env[k] = parsed[k];
    }
  }
} else if (envVariables.error) {
  console.log('DOTENV returned an error');
  console.log(envVariables.error);
}
