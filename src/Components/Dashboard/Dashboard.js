import React, {Component} from 'react'
import { Link } from 'react-router-dom';
class Dashboard extends Component{
    constructor(){
        super()
        this.state = {
            searchTerm: '',
            checkBox: true,
            posts: []
        }
    }

    changeHandler(e){
        this.setState({
            searchTerm: e,
        })
    }

    render(){ 
        let mappedList = this.state.posts.map((element) => {
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

export default Dashboard