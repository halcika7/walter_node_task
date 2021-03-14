import mongoose from 'mongoose';

export const connect = async (MONGO_URL: string) => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Database connected', 'create-db-connection');
  } catch (err) {
    console.log(err, 'create-db-connection');
  }
};
