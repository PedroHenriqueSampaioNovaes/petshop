import mongoose from 'mongoose';

async function connectDB(retries = 5) {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@petshop.53mfura.mongodb.net/${process.env.DB}`,
    );
    console.log('Conectou-se ao MongoDB');
  } catch (error) {
    console.log(error)
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
