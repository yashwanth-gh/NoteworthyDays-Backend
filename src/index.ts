import 'dotenv/config'
import {app} from './app.js';


const port = process.env.PORT || 3400;
app.listen(port,()=>{
    console.log("Server listening on port -->",port);
})