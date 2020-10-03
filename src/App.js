import React from 'react';
import logo from './logo.svg';
import './App.css';
// import create_post from "./component/create_post";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      posts:[],
      upvotes: 0,
      downvotes: 0,
    };
    this.handelChange = this.handelChange.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
  }
  handelChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }
  handelSubmit = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:8000/api/roastboast/",
    {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => this.setState ({posts:data}))
    window.location.reload()
  }

  componentDisMount() {
    this.SeeAll()
  }

  BoastView = () => {
    fetch("http://127.0.0.1:8000/api/roastboast/")
    .then(res => res.json())
    .then(data => this.setState ({posts:data}))
  }

  RoastView = () => {
    fetch("http://127.0.0.1:8000/api/roastboast/")
    .then(res => res.json())
    .then(data => this.setState ({posts:data}))
  }

  MostPopularView = () => {
    fetch("http://127.0.0.1:8000/api/roastboast/")
    .then(res => res.json())
    .then(data => this.setState ({posts:data}))
  }

  SeeAll = () => {
    fetch("http://127.0.0.1:8000/api/roastboast/")
    .then(res => res.json())
    .then(data => this.setState ({posts:data}))
  }

  UpvoteView = (id) => {
    fetch("http://127.0.0.1:8000/api/roastboast/" + id + "/upvote/")
    .then(res => res.json())
    .then(data => this.forceUpdate(this.componentDidMount))
    console.log(id)
  }

  DownvoteView = (id) => {
    fetch("http://127.0.0.1:8000/api/roastboast/" + id + "/downvote/")
    .then(res => res.json())
    .then(data => this.forceUpdate(this.componentDidMount))
    console.log(id)
  }


  render() {
    return (
      <div>
        <button onClick={this.SeeAll}>See All</button>
        <button onClick={this.BoastView}>View Boasts</button>
        <button onClick={this.RoastView}>View Roasts</button>
        <button onClick={this.MostPopularView}>Most Popular View</button>
        <form onSubmit={this.handelSubmit}>
          <label>
            <select onChange={this.handelChange}>
              <option name='choices' value={this.state.choices}>Boast</option>
              <option name='choices' value={this.state.choices}>Roast</option>
            </select>
            post:
            <textarea name='body' value={this.state.body} onChange={this.handelChange} />
          </label>
          <input type="submit" value="submit" />
        </form>
        <ul>
          {this.state.posts.map(p => (
            <div>
              <ul>
                <li>
                  <h3>This is a:</h3>{p.choices ? "Boast": "Roast"},
                  <h3>Message:</h3>{p.body},
                  <h3>Upvotes:</h3>{p.upvote}, <button onClick={e => this.UpvoteView(e.id)}>Up Vote!</button>
                  <h3>Downvotes:</h3>{p.downvote}, <button onClick={e => this.DownvoteView(e.id)}>Down Vote!</button>
                  <h3>Total Votes:</h3>{p.total_vote}
                </li>
              </ul>
            </div>
          ))}
        </ul>
      </div>
    )

  };
}

export default App;
