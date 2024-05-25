import Modal from 'react-bootstrap/Modal';
import SendMessageForm from './SendMessageForm';
import "./HireMe.css"
function HireMe(props) {
  return (
    <div>
         <Modal
         {...props}
      size="md-down"
      className='modal-custom'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className='change-color'>
        <span className='close-btn' onClick={props.onClose} ><i class="fa-solid fa-circle-xmark"></i></span>
       <SendMessageForm title={"Hire"} color_title={"Me"} onClose={props.onClose}/>
      </Modal.Body>
    
    </Modal>
    </div>
  )
}

export default HireMe
