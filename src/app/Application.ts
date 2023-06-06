import { Client, HttpConnection } from "@elastic/elasticsearch";
import dotenv from "dotenv";
import fs from "fs";


class Application {
    private static esclient;

    static async initialisation() {
        dotenv.config();
        const elasticUrl = process.env.ELASTIC_URL || "https://localhost:9200";
        this.esclient = new Client({
            node: elasticUrl,
            Connection: HttpConnection,
            auth: {
                username: 'elastic',
                password: '7ATAIIAd+YorF*gmehvP'
            }, tls: {
                ca: fs.readFileSync('./http_ca.crt'),
                rejectUnauthorized: false
              }
        });
    }

    public static getESClient(): Client {
        return this.esclient;
    }

}

export default Application;