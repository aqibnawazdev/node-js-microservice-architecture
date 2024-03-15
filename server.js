import express, { urlencoded } from "express";
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


app.get("/", (req, res) => {
    res.send("Message: ", req.body)
})


app.listen(PORT, () => {
    console.log("server is running...")
})