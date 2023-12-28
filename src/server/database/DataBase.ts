import mongoose, { Collection } from "mongoose"

export default async function Database(collectionName: string = 'defaultCollection'): Promise<Collection | null>{    
  try {
    if(!process.env.DATABASE) throw new Error('DATABASE[ERROR]: Variavel de ambiente incorreta!')
    mongoose.Promise = global.Promise;
    await mongoose.connect(process.env.DATABASE)
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Erro ao se conectar ao mongo...");
    }
    return mongoose.connection.collection(collectionName)

  } catch (error) {
    console.error(error)
    return null
  }
}