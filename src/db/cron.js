import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
    https
        .get(process.env.API_URL, (res) => {
            if( res.statusCode === 200 ){
                console.log(`Cron Job: API is reachable. Status Code: ${res.statusCode}`);
            } else {
                console.error(`Cron Job: API returned an error. Status Code: ${res.statusCode}`);
            }
        })
        .on("error", (e) => {
            console.error(`Cron Job: Error reaching API - ${e.message}`);
        });
});

export default job;