import React, { Component } from "react";
import "./App.css";
import axios from 'axios'


class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const promise= axios.get('https://jsonplaceholder.typicode.com/posts')
    const {data:posts}=await promise;
    this.setState({posts})
  }

   handleAdd= async ()=>{
     const obj={title:'a', body:'b'}
     const {data:posts}= await axios.post('https://jsonplaceholder.typicode.com/posts',obj)
     const posts=[posts,...this.state.posts]
     this.setState({posts})
   }
  handleUpdate = async post => {
     post.title='UPDATED'
     const {data}= await axios.put('https://jsonplaceholder.typicode.com/posts/'+ post.id,post)
  };

  handleDelete = post => {
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
