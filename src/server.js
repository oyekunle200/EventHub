import dotenv from "dotenv"

// Load environment variables before importing other modules
dotenv.config({ path: "./.env" })

import app from "./app.js"
import connectDB from "./config/database.js"

const PORT = process.env.PORT || 5000

const startServer = async () => {
    
    app.listen(PORT, () => {
        console.log(`server running at http://localhost:${PORT}`)
    })

    try {
        await connectDB()
        console.log('database connected')
    } catch (error) {
        console.error('database connection failed:', error.message)
    }
}

startServer()