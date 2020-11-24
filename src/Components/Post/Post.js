import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            img: '',
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
        const {title, img, content, username} = this.state
        console.log(this.props)
          return(
            <div>
            <div>
              <h2>{title}</h2>
              
              <div>
                <p>by {username}</p>
              </div>
            </div>
            <div>
              <img src={img}/>
              <p>{content}</p>
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
export default connect(mapStateToProps)(Post)