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

    render(){ 
      console.log(this.state.myPosts)
        let mappedList = this.state.myPosts.map((element) => {
            return <Link to={`/post/${element.post_id}`} key={element.post_id}>
              <div className='content_box dash_post_box'>
                <h3>{element.title}</h3>
                <div>
                  <p>by {element.author_username}</p>
                  <img src={element.profile_pic} alt='author' />
                </div>
              </div>
            </Link>
        })
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