import express, { Request, Response } from 'express'
import ElasticSearch from './elastic/ElasticSearch';
import Application from './app/Application';
import Quotes, { QuoteInsert, QuoteSearch } from './elastic/Quotes';

const app = express()
const port = 3000;


Application.initialisation().then(async () => {
    const isElasticReady = await ElasticSearch.checkConnection();
    console.log('Application initiatize, lets go!');
    if (isElasticReady) {
        const elasticIndex = await Application.getESClient().indices.exists({ index: Quotes.quotesMapping.index });

        if (!elasticIndex) {
            await ElasticSearch.createIndex(Quotes.quotesMapping.index);
            await ElasticSearch.setMapping(Quotes.quotesMapping);
        }
    }

    app.get('/search', async (request: Request<any, any, any , QuoteSearch>, response: Response) => {
        let body = await Quotes.getQuotes(request.query);
        response.send(`result of the search: ${JSON.stringify(body)}`);
    })

    app.all('/quote/add', async (request: Request<any, any, any , QuoteInsert>, response: Response) => {
        let body = await Quotes.insertNewQuote(request.query);
        response.send(`result of the insert: ${JSON.stringify(body)}`);
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });

});