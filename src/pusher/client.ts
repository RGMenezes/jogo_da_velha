import pusherJs from "pusher-js"

let pusher: pusherJs | null = null

if(process.env.NEXT_PUBLIC_real_time_key && process.env.NEXT_PUBLIC_real_time_cluster){
  pusher = new pusherJs(process.env.NEXT_PUBLIC_real_time_key, {
    cluster: process.env.NEXT_PUBLIC_real_time_cluster
  }) 
}else{
  console.error('Key ou Cluster não encontrado!')
}

export default pusher