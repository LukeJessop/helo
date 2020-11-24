import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'

function Nav(props) {
    return(
        <div>
            <img style={{backgroundImage: `url('${props.pfp})`}}></img>
            <p>Hello {props.username}</p>
            <Link to='/dashboard'>Dashboard</Link>
            <br/>
            <Link to='/new'>New</Link>
            <br/>
            <Link to='/'>Logout</Link>
        </div>
    )
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Nav)