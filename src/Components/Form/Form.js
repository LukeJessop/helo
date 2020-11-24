import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
class Form extends Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            imgUrl: '',
            content: ''
        }
        this.submit = this.submit.bind(this);
    }
    submit() {
        if (this.props.userId) {
            axios.post(`/api/post`, this.state).then(this.props.history.push('/dashboard'))
        } else {
            alert('You must log in to create posts')
        }
    }
    render(){
        return(
            <div>
                <div>
                    <input placeholder="title" onChange={(e) => this.setState({title: e.target.value})}></input>
                    <input placeholder="image URL" onChange={(e) => this.setState({imgUrl: e.target.value})}></input>
                    <input placeholder="content" onChange={(e) => this.setState({content: e.target.value})}></input>
                </div>
                <button onClick={this.submit}>Post</button>
                <img src={`${this.state.imgUrl}`}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}


export default connect(mapStateToProps)(Form)
