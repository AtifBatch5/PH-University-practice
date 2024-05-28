import config from './app/config';
import app from './app';
const { port, database_url } = config;
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(database_url as string);
    app.listen(port, () => {
      console.log(`My Assignmet app listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
