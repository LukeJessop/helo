import React, {Component} from 'react'
import axios from 'axios'

class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            image: '',
            content: '',
            author: '',
            authorPicture: ''
        }
    }
    componentDidMount() {
        axios.get(`/api/post/${this.props.match.params.id}`)
          .then(res => {
            this.setState(res.data)
        })
    }
    render(){
        const {title, image, content, username, profile_pic} = this.state
        console.log(this.props.match.params.id)
        return(
            <div>
            <div>
              <h2>{title}</h2>
              <div>
                <p>by {username}</p>
                <img src={profile_pic}/>
              </div>
            </div>
            <div>
              <div style={{ backgroundImage: `url('${image}') ` }} alt='post' ></div>
              <p>{content}</p>
            </div>
          </div>
        )
    }
}

export default Post