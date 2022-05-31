let assert = require('assert');
let fetch = require('axios');

before(() => require("./index.js"));

describe('News Api Test', () => {
 it('should return valid api response', async () => {     
        var result = await fetch("http://localhost:8080/news?query=apple");
        
        assert.equal(result.status, 200);
        assert.equal(result.data.status, "ok");

        if(typeof(result.data.articles) != 'object')
            assert.fail(`expected article object but got ${typeof(result.data.articles)}`);
    });

 it('should return bad status due to missing query parameter', async () => {
        var result = await fetch("http://localhost:8080/news");
        
        assert.equal(result.status, 200);
        assert.equal(result.data.status, "missing query");
    });
});