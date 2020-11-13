import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'

function Nav() {
    return(
        <div>
            <Link to='/'>Logout</Link>
            <br/>
            <Link to='/new'>New</Link>
            <br/>
            <Link to='/dashboard'>Dashboard</Link>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Nav)