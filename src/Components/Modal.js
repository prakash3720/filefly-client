import React from 'react'
import $ from 'jquery'
import './Modal.css'
import axios from 'axios'

function Modal(props){

    if(props.openModal){
        window.$('#exampleModal').modal('show')
    }

    let sendMail=()=>{
        axios.post('https://filefly-download.herokuapp.com/mail/send',{id:props.id,email:document.getElementById('email').value}).then(res=>{
            props.modalCallback()
        })
        .catch(err=>console.log(err))
    }

    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Mail the Download URL?</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email ID"></input>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary widthAuto" data-dismiss="modal" onClick={props.modalCallback}>Close</button>
        <button type="button" className="btn btn-primary widthAuto" data-dismiss="modal" onClick={sendMail}>Send</button>
      </div>
    </div>
  </div>
</div>
    )
}

export default Modal