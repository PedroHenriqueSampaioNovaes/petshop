import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@petshop.53mfura.mongodb.net/${process.env.DB}`
    );
    console.log('Conectou-se ao MongoDB');
  } catch (error) {
    console.error(
      'Um erro ocorreu ao tentar se conectar ao banco de dados:',
      error
    );
  }
}
main();

export default mongoose;
