import Application from "../app/Application";
import ElasticSearch, { Mapping } from "./ElasticSearch";

class Quotes {

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

    public static async getQuotes(req) {
        const query: any = {
            query: {
                quote: {
                    match: {
                        query: req.text,
                        operator: "and",
                        fuzziness: "auto"
                    }
                }
            }
        }

        const body = await Application.getESClient().search({
            index: this.quotesMapping.index,
            from: req.page || 0,
            size: req.limit || 100,
            query: query.query
        });

        return {
            body
        }
    }
}
export default Quotes;