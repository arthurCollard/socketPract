import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import GamePanel from '../GamePanel';
import Login from '../Login'
import {SocketProvider, useSocket} from '../../contexts/SocketProvider'

const Home = (props) => {
    const socket = useSocket()
    const {id} = props.login

    const setNumberGoal = useCallback( (params) => {
        console.log("params", params)
    }, [])

    useEffect(() => {
        if (socket == null) return 
        
        socket.on('player-joined', setNumberGoal)

        return () => socket.off('message')
    }, [socket, setNumberGoal])
    
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