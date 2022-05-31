import date from 'date-and-time';

function newsTable(articles) {
    if(articles.length === 0)
      return (
        <span>No results found</span>
      )
  
    return (
      <table>
        <thead>
          <tr>
            <th>Image</th>     
            <th>Title</th>
            <th>Source</th>
            <th>Description</th>     
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {newsTableBody(articles)}
        </tbody>
      </table>
    )
  }
  
  function newsTableBody(articles) {
    let ret = [];
  
    for(let item of articles) {
      ret.push(
        <tr onClick={() => window.location = item.url} key={item.title}>
          <td><img alt="news" className="news-image" src={item.urlToImage} /></td>
          <td>{item.title}</td>
          <td>{item.source.name}</td>
          <td>{item.description}</td>
          <td>{date.format(new Date(item.publishedAt), "HH:MM YYYY-MM-DD")}</td>
        </tr>
      );
    }
  
    return ret;
  }
  
  export default newsTable;