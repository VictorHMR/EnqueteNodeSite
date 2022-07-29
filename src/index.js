import express from "express";
import bodyParser from "body-parser";
import Router from "./router/enquete_router.js"

var port = 3000
const app = express();
app.set('view engine', 'ejs')
app.use(express.static('./src/public'))
app.set('views','./src/view');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(Router.router)



app.listen(port, ()=>{
    console.log(`App rodando na porta: http://localhost:${port}`)
})