import Application from "../app/Application";


export interface Mapping {
    index: string,
    schema: any;
};

class ElasticSearch {

    public static async createIndex(index) {
        try {
            await Application.getESClient().indices.create({ index });
            console.log(`Created index ${index}`);
        } catch (err) {
            console.error(`An error occurred while creating the index ${index}:`);
            console.error(err);
        }
    }

    public static async setMapping(mapping: Mapping) {
        try {

            await Application.getESClient().indices.putMapping({
                index: mapping.index,
                body: {
                    properties: mapping.schema
                }
            });

            console.log("Mapping created successfully");
        } catch (err) {
            console.error("An error occurred while setting the quotes mapping:");
            console.error(err);
        }
    }

    public static checkConnection() {
        return new Promise(async (resolve) => {
            console.log("Checking connection to ElasticSearch...");
            let isConnected = false;
            while (!isConnected) {
                try {
                    await Application.getESClient().cluster.health({});
                    console.log("Successfully connected to ElasticSearch");
                    isConnected = true;
                } catch (err) {
                    console.log("Cluster state is not healthy" + err);
                }
            }
            resolve(true);
        });
    }
}
export default ElasticSearch;