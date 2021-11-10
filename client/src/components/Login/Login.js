import React, { useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {v4 as uuidV4} from 'uuid'
import loginActions from '../../actions/loginActions';

const Login = (props) => {
    const idRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault()
        const {actions} = props
        actions.createId(idRef.current.value)
    }

    const createNewId = ( ) => {
        const {actions} = props
        actions.createId(uuidV4())
    }

    return (
        <Container className="align-items-center d-flex" style={{height: '100vh'}}>
            <Form className='w-100' onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>
                    Enter Id
                    </Form.Label>
                    <Form.Control type="text" ref={idRef} required />

                </Form.Group>
                <Button type="submit" className="mr-2">Login</Button>
                <Button variant="secondary" onClick={createNewId}>Create New Id</Button>
            </Form>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(loginActions, dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)