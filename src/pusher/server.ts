import Pusher from "pusher";

let pusher: Pusher | null = null

if(process.env.real_time_app_id && process.env.real_time_key && process.env.real_time_secret && process.env.real_time_cluster){
  pusher = new Pusher({
    appId: process.env.real_time_app_id,
    key: process.env.real_time_key,
    secret: process.env.real_time_secret,
    cluster: process.env.real_time_cluster
  }) 
}

export default pusher