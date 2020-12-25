import React, { Component } from "react";
import "./App.css";
import http from './services/httpservice'


class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const promise= http.get('https://jsonplaceholder.typicode.com/posts')
    const {data:posts}=await promise;
    this.setState({posts})
  }

   handleAdd= async ()=>{
     const obj={title:'a', body:'b'}
     const {data:posts}= await http.post('https://jsonplaceholder.typicode.com/posts',obj)
     const post=[posts,...this.state.posts]
     this.setState({post})
   }
  handleUpdate = async post => {
     post.title='UPDATED'
     const {data}= await http.put('https://jsonplaceholder.typicode.com/posts'+'/'+ post.id,post)
  };

  handleDelete = async post => {
  
    const originalPost=this.state.posts;
    const posts=this.state.posts.filter(p=>p.id !== post.id)
    this.setState({posts})
    try{
      await http.delete('https://jsonplaceholder.typicode.com/posts'+'/'+ post.id)
    }
    catch(ex){
         alert('Something failed while deleting a post')


      this.setState({posts:originalPost})
    }
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
