import express from "express"
import cors from "cors"
import dummyData from "./routes/dummyData.js"

const app = express()
const PORT = 8080

app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())

app.use("/", dummyData);

app.get("/", (req,res)=>{
    res.send("AI_STUDY_HELPER WORKING!")
})

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`)
})