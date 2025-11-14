import express from 'express';
import { ENV } from './config/env.js';
import { migrateSchema } from './config/migrate.js';
import cors from 'cors';
import job from './db/cron.js';;

const app = express();
const PORT = ENV.PORT || 5001;

if(ENV.NODE_ENV === "production" ) job.start();

app.use(express.json());
app.use(cors());

migrateSchema()
    .then(() => console.log("DataBase schemas checked and migrated"))
    .catch((err) => {
        console.error("Error during schema migration:", err);
    });



app.get('/api/health', (req, res) =>{
    res.status(200).json({status: "OK" });
});



app.listen(PORT, () =>{
    console.log("Server is running on PORT", PORT);
});