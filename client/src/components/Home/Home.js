import React from 'react';
import { connect } from 'react-redux';

import GamePanel from '../GamePanel';
import Login from '../Login'
import {SocketProvider} from '../../contexts/SocketProvider'

const Home = (props) => {
    const {id} = props.login
    
    return (
        <SocketProvider id={id}>
            {id ? <GamePanel id={id}/> : <Login/> }
        </SocketProvider>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)