import express from "express"
import cors from "cors"
import morgan from "morgan";
import connectDatabase from "./database/database.js";
import router from "./router/routes.js";




const app = express();

/* middlewares */

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powered-by'); //less hackers know about our stack

const port = 8080;

/* Http get response*/

app.get('/', (req,res)=>{
    res.status(201).json("Home get response")
})


/*Api routes*/
app.use('/api', router)

/*Start server only when we have valid database connection*/
connectDatabase().then(()=>{
    try {
        app.listen(port, ()=>{
            console.log('====================================');
            console.log(`Server started at http://localhost:${port}`);
            console.log('====================================');
        })
    } catch (error) {
        console.log('====================================');
        console.log("Cannot connect to server");
        console.log('====================================');
    }
}).catch(error=>{
    console.log('====================================');
    console.log("Invalid Database Connection...!");
    console.log('====================================');
})
