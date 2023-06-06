import Application from "../app/Application";
import ElasticSearch, { Mapping } from "./ElasticSearch";

export interface QuoteSearch {
    text?: string,
    page?: number,
    limit?: number
}

export interface QuoteInsert {
    quote: string,
    author: string
}
class Quotes {

    private static searchQuote = (request: QuoteSearch) => {
        return {
            query: {
                match: {
                    quote: request.text
                }
            }
        }
    }

    public static quotesMapping: Mapping = {
        index: "quotes",
        schema: {
            quote: {
                type: "text"
            },
            author: {
                type: "text"
            }
        }
    };

    public static async insertNewQuote(quoteInsert: QuoteInsert) {
        return await Application.getESClient().index({
            index: this.quotesMapping.index,
            body: {
                ...quoteInsert
            }
        });
    }

    public static async getQuotes(request: QuoteSearch) {
        return await Application.getESClient().search({
            index: this.quotesMapping.index,
            from: request.page || 0,
            size: request.limit || 100,
            query: this.searchQuote(request).query
        });
    }
}
export default Quotes;