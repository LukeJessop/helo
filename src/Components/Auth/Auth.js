import axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUser} from './../../ducks/reducer'
class Auth extends Component{
    constructor(){
        super()
        this.state={
            username:'',
            password:''
        }
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    login() {
        axios.post('/auth/login', this.state)
          .then(res => {
            this.props.updateUser(res.data);
            this.props.history.push('/dashboard');
          })
      }
      register() {
        axios.post('/auth/register', this.state)
          .then(res => {
            this.props.updateUser(res.data);
            this.props.history.push('/dashboard');
          })
      }

    render(){
        return(
            <div>
                <input placeholder="username" onChange={e => this.setState({username: e.target.value})}></input>
                <input placeholder="password" type="password"onChange={e => this.setState({password: e.target.value})}></input>
                <button onClick={this.login}>Login</button>
                <button onClick={this.register}>Register</button>
            </div>
        )
    }
}

export default connect(null, {updateUser})(Auth)