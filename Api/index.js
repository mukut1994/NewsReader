let express = require("express");
let NewsAPI = require("NewsAPI");

const app = express();

const newsapi = new NewsAPI(process.env.NewsApiKey);

app.get('/news', async function (req, res) {
    if(!req.query.query)
    {
        res.send({ status: "missing query" });
        return;
    }

    let response = await newsapi.v2.everything({
        q: req.query.query,
        from: req.query.from,
        to:  req.query.to
    });
    
    res.send({ status: "ok", articles: response.articles });
});

const port = 8080;

app.listen(port, () => console.log(`Listening on ${port}`));