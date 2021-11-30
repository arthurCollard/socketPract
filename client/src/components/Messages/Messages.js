import React from 'react';
import { connect } from 'react-redux';
const Messages = (props) => {
    const {messages} = props
    return (
        <ul className="list-group list-group-flush">
            {   
                messages.map( (message, index) => (
                    <ul className="list-group-item" key={index}>
                        {message}
                    </ul>
                ))
            }
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages.messages
    }
}
export default connect(mapStateToProps, {})(Messages)