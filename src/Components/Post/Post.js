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
        this.goToDash = this.goToDash.bind(this)
    }
    componentDidMount() {
        axios.get(`/api/post/${this.props.match.params.id}`)
          .then(res => {
            this.setState(res.data)
        })
    }

    editTitle(title, picture, content){
      axios.put(`/api/post/${this.props.match.params.id}`, this.state)
      .then(this.setState({title: title, img: picture, content: content}))
    }
    editPicture(picture){
      axios.put(`/api/post/${this.props.match.params.id}`, this.state)
      .then(this.setState({img: picture}))
    }
    editContent(content){
      axios.put(`/api/post/${this.props.match.params.id}`, this.state)
      .then(this.setState({content: content}))
    }


    goToDash(){
      this.props.history.push('/dashboard')
    }

    render(){
        const {title, img, content, username} = this.state
          return(
          <div>
            <div>
              <h2>{title}</h2>
              <div>
                <p>by {username}</p>
                <span>Edit Post</span>
                    <div>
                      <input placeholder='Change Title' onChange={(e) => this.editTitle(e.target.value)}></input>
                      <input placeholder='Change Picture' onChange={(e) => this.editPicture(e.target.value)}></input>
                      <input placeholder='Change Content' onChange={(e) => this.editContent(e.target.value)}></input>
                      <button onClick={this.goToDash}>Submit</button>
                    </div>
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