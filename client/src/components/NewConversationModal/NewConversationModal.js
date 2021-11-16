import React, { useCallback, useEffect, useRef } from 'react';
import {Modal, Form, Button} from 'react-bootstrap'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import messageActions from '../../actions/messageActions';
import totalActions from '../../actions/totalActions';
import { useSocket } from '../../contexts/SocketProvider';
import { createTotalChangedMessage } from '../../utils/utils';

const NewConversationModal = (props) => {
    const socket = useSocket()
    const numberRef = useRef();

    //TODO - wrap in useCallback function
    const addNumberToTotal = useCallback((params) => {
        const {actions} = props
        
        actions.setTotal(params)
        actions.addMessage(createTotalChangedMessage(params))
    }, [])

    useEffect(() => {
        if (socket == null) return 
        
        socket.on('add-number-response', addNumberToTotal)

    }, [socket, addNumberToTotal])

    const totalOrParsedTotal = (total) => {
        return (typeof total == Number) ? total : parseInt(total)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {game, actions} = props
        console.log("actions", actions)

        //set Redux State with total
        actions.setTotal(parseInt(game.total) + parseInt(numberRef.current.value))
        //update other clients via socket
        socket.emit('add-number', {text: totalOrParsedTotal(game.total + parseInt(numberRef.current.value))})
    }


    return (
        <>
            <Modal.Header closeButton>Stay Under {}</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className=" justify-content-center">
                        <span >
                            Total: {props && props.game.total}
                        </span>
                    </div>
                    <Form.Group className="mt-2">
                        <Form.Label>Your Number</Form.Label>
                        <Form.Control type="text" ref={numberRef} required />
                    </Form.Group>
                    <Button className="mt-2" type="submit"> Submit</Button>
                </Form>
            </Modal.Body>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewConversationModal) 