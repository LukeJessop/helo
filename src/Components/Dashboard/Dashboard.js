import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import {connect} from 'react-redux'

class Dashboard extends Component{
    constructor(){
        super()
        this.state = {
            search: '',
            checkBox: true,
            myPosts: []
        }
        this.grabPosts = this.grabPosts.bind(this);
        this.reset = this.reset.bind(this);
        this.delete = this.delete.bind(this)
    }

    changeHandler(e){
        this.setState({
            search: e,
        })
    }

    componentDidMount() {
      this.grabPosts();
    }
    grabPosts() {
      let { search, checkBox } = this.state;
      axios.get(`/api/posts?myPosts=${checkBox}&search=${search}`).then(res => this.setState({myPosts: res.data}))
    }
    reset() {
      let { myPosts } = this.state;
      let url = `/api/posts/${this.props.userId}`;
      if (myPosts) {
        url += '?mine=true';
      }
      axios.get(url)
        .then(res => {
          this.setState({ posts: res.data, loading: false, search: '' })
        })
    }

    delete(id){
      axios.delete(`/api/post/${id}`).then((res) => this.setState({myPosts: res.data}))
    }

    render(){
        let mappedList = this.state.myPosts.map((element) => {
            return (
              <div>
                <Link to={`/post/${element.post_id}`} key={element.post_id}>
                  <div className="post">
                    <h3>{element.title}</h3>
                    <div>
                      <p>by {element.username}</p>
                      <img src={element.img}/>
                    </div>
                  </div>
                </Link>
                <button onClick={() => this.delete(element.post_id)}>Delete Post</button>
              </div>
            )
        })
        console.log(this.state.myPosts)
        return(
            <div>
                <input onChange={e => this.changeHandler(e.target.value)}></input>
                <button>Search</button>
                <button>Reset</button>
                <div>
                    <span>My Posts</span>
                    <input type="checkbox" onChange={() => {
                        if(this.state.checkBox === true){
                            this.setState({checkBox: false})
                        }else{
                            this.setState({checkBox: true})
                        }
                    }}></input>
                    <div>
                        {mappedList}
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        userId: state.userId
    }
}

export default connect(mapStateToProps)(Dashboard)