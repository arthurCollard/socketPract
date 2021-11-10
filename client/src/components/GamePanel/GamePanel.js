import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import contactActions from '../../actions/contactActions';
import Sidebar from '../Sidebar';

const GamePanel = (props) => {
    const {contacts} = props
    console.log("contacts", contacts)
    return (
        <div className="d-flex" style={{height: '100vh'}}>
            <Sidebar id={props.id}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators(contactActions)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(GamePanel) 