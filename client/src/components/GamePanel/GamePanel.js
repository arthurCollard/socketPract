import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import messageActions from '../../actions/messageActions';
import totalActions from '../../actions/totalActions';
import { useSocket } from '../../contexts/SocketProvider';
import { playerJoinMessage, playerLeaveMessage } from '../../utils/utils';
import Sidebar from '../Sidebar';

const GamePanel = (props) => {
    const socket = useSocket()

    const setSharedState = useCallback((params) => {
        const { actions } = props
        console.log('here')
        actions.addMessage(playerJoinMessage(params))
    },[props])

    const setPlayerLeave = useCallback((id) => {
        const { actions } = props
        actions.addMessage(playerLeaveMessage(id))
    },[props])

    useEffect(() => {
        if (socket == null) return 
        
        socket.on('player-joined', setSharedState)
        socket.on('player-leave', setPlayerLeave)

    }, [socket, setSharedState, setPlayerLeave])

    return (
        <div className="d-flex" style={{height: '100vh'}}>
            <Sidebar id={props.id}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        game: state.game
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators({...totalActions, ...messageActions}, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(GamePanel) 