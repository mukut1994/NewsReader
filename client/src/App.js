import './App.css';
import React from 'react';
import date from 'date-and-time';
import newsTable from './newsTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: false,
      articles: [],
    };
  }

  render() {
    let body;

    if(this.state.error) 
      body = <span className='error'>{this.state.error}</span>;
    else if(this.state.loading)    
      body = <span>Loading...</span>;
    else 
      body = newsTable(this.state.articles);

    let now = new Date();

    return (
      <div>
        <div className="search">
          <form onSubmit={(e) => this.search(e)}>
            <label>Search</label><input name="query" type="text" placeholder='query' defaultValue="apple" className='searchBox' />
            <label>From</label><input name="from" type="date" defaultValue={date.format(now, "YYYY-MM-DD")} />
            <label>To</label><input name="to" type="date" defaultValue={date.format(date.addDays(now, 1), "YYYY-MM-DD")} />
            <button type="submit">Go!</button>
          </form>
        </div>
  
        <div className="news-table">
          {body}
        </div>
      </div>
    );
  }

  search(e) {
    e.preventDefault();

    let query = {
      query: e.target.elements.query.value,
      from: e.target.elements.from.value,
      to: e.target.elements.to.value,
    };

    if(!query.query)
    {
      this.setState({ error: "Please set a query" });
      return;
    }

    this.setState({ loading: true }, () => this.setStateFromQuery(query))
  }

  async setStateFromQuery(query) {
    let result = await fetch("news?" + new URLSearchParams(query));
    let body = await result.json();

    if(body.status !== "ok")
    {
      this.setState({ error: body.status });
      return;
    }
    
    this.setState({
      loading: false,
      articles: body.articles
    });
  }
}

export default App;
