import React, { useState } from 'react';
import { Nav, Tab, Button, Modal } from 'react-bootstrap';
import Conversations from '../Conversations';
import NewConversationModal from '../NewConversationModal';
import { CONVERSATIONS_KEY } from './constants';
import { useSocket } from '../../contexts/SocketProvider';

const Sidebar = ({id}) => {
    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
    const [modalOpen, setModalOpen] = useState(false)
    const socket = useSocket()
    // const conversationsOpen = activeKey === CONVERSATIONS_KEY

    const closeModal = () => {
        setModalOpen(false)
    }

    const openModalAndConnect = () => {
        socket.emit("ready-user")
        setModalOpen(true)
    }
    
    return (
    <div style={{width: '250px'}} className='d-flex flex-column'>
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
            <Nav variant='tabs' className="justify-content-center">
                <Nav.Item>
                    <Nav.Link eventKey={CONVERSATIONS_KEY}>Convo</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                    <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                </Nav.Item> */}
            </Nav>
            <Tab.Content className='border-end overflow-auto flex-grow-1'>
                <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                    <Conversations/>
                </Tab.Pane>
            </Tab.Content>
            <div className='p-2 border-top border-end small'>
                Your Id: <span className='text-muted'>{id}</span>
            </div>
            <Button onClick={() => {openModalAndConnect()}}>
                Start Game
            </Button>
        </Tab.Container>

        <Modal show={modalOpen} onHide={closeModal}>
            <NewConversationModal closeModal={closeModal}/> 
        </Modal>
    </div>
        
    )
}

export default Sidebar