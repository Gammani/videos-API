import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import {videosRouter} from "./routes/videos-routes";
import {authMiddleware} from "./middlewares/auth-middleware";
import {guardMiddleware} from "./middlewares/guard-middleware";

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

app.use(authMiddleware)
app.use(guardMiddleware)
app.use('/videos', videosRouter)


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`server run on port ${port}`)
})
