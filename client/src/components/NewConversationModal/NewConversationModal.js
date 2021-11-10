import React, { useEffect, useRef } from 'react';
import {Modal, Form, Button} from 'react-bootstrap'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import totalActions from '../../actions/totalActions';

import { useSocket } from '../../contexts/SocketProvider';

const NewConversationModal = (props) => {
    const socket = useSocket()
    const numberRef = useRef();

    //TODO - wrap in useCallback function
    const addNumberToTotal =  (params) => {
        const {actions} = props
        actions.setTotal(params)
    }

    useEffect(() => {
        if (socket == null) return 
        
        socket.on('add-number-response', addNumberToTotal)

        return () => socket.off('message')
    }, [socket, addNumberToTotal])

    const totalOrParsedTotal = (total) => {
        return (typeof total == Number) ? total : parseInt(total)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {total, actions} = props
        await actions.setTotal(parseInt(total) + parseInt(numberRef.current.value))
        socket.emit('add-number', {text: totalOrParsedTotal(total + parseInt(numberRef.current.value))})
    }


    return (
        <>
            <Modal.Header closeButton>Stay Under {}</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className=" justify-content-center">
                        <span >
                            Total: {props && props.total}
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
        total: state.total.total
    }
}

const mapDispatchToProps = (disptach) => {
    return {
        disptach,
        actions: bindActionCreators(totalActions, disptach)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewConversationModal) 