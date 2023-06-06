import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";



class Application {
    private static esclient;

    static async initialisation() {
        dotenv.config();
        const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
        this.esclient = new Client({ node: elasticUrl });
    }

    public static getESClient():Client {
        return this.esclient;
    }

}

export default Application;