import mongoose from 'mongoose';

async function connectDB(retries = 5) {
  try {
    await mongoose.connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-oaoeeww-shard-00-00.53mfura.mongodb.net:27017,ac-oaoeeww-shard-00-01.53mfura.mongodb.net:27017,ac-oaoeeww-shard-00-02.53mfura.mongodb.net:27017/${process.env.DB}?ssl=true&replicaSet=atlas-4s5s8v-shard-0&authSource=admin&retryWrites=true&w=majority&appName=petshop`,
    );
    console.log('Conectou-se ao MongoDB');
  } catch (error) {
    console.log(error);
    if (retries === 0)
      console.error(
        'Um erro ocorreu ao tentar se conectar ao banco de dados:',
        error,
      );
    await new Promise((r) => setTimeout(r, 1000));
    connectDB(retries - 1);
  }
}
connectDB();

export default mongoose;
