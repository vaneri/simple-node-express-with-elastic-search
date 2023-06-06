import express, { Request, Response } from 'express'
import ElasticSearch from './elastic/ElasticSearch';
import Application from './app/Application';
import Quotes from './elastic/Quotes';

const app = express()
const port = 3000;

(async function main() {
    console.log('lets see if this is working... heuuuu');
    const isElasticReady = await ElasticSearch.checkConnection();
    if (isElasticReady) {
        const elasticIndex = await Application.getESClient().indices.exists({ index: Quotes.quotesMapping.index });

        if (!elasticIndex) {
            await ElasticSearch.createIndex(Quotes.quotesMapping.index);
            await ElasticSearch.setMapping(Quotes.quotesMapping);
            // await data.populateDatabase()
        }
    }

    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World!');
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });

})();