import mongoose, { Collection, mongo } from "mongoose"

export default async function Database(){    
  if(process.env.DATABASE){
    mongoose.Promise = global.Promise
    mongoose.connect(process.env.DATABASE).then().catch((err) => {
      console.error('Não foi possivel conectar ao mongo...')
      console.error(err)
    })
  }
}