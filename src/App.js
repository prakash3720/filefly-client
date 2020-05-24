import React from 'react';
import './App.css';
import Navbar from './Components/Navbar'
import share from './static/share.svg'
import ShareFile from './Components/ShareFile'
import Modal from './Components/Modal'

class App extends React.Component{

  constructor(){
    super()
    this.state={
      alertMsg:'',
      modal:0,
      id:''
    }
    this.callBack=this.callBack.bind(this)
    this.updateAlert=this.updateAlert.bind(this)
    this.modalCall=this.modalCall.bind(this)
  }

  callBack(obj){
    if(obj.success===0){
      this.setState({alertMsg:'Try again in 5 seconds'})
    }
    else if(obj.success===1){
      this.setState({alertMsg:'Successfully uploaded',modal:1,id:obj.id})
    }
    else if(obj.success===2){
      this.setState({alertMsg:'Please select a file to upload'})
    }
  }

  updateAlert(){
    this.setState({alertMsg:''})
  }

  modalCall(){
    this.setState({modal:0})
  }

  render(){
    return (
      <div className="App">
        <Navbar></Navbar>
        <Modal id={this.state.id} openModal={this.state.modal} modalCallback={this.modalCall}></Modal>
        {this.state.alertMsg?<div className="alert alert-primary alert-dismissible fade show" role="alert">
          {this.state.alertMsg}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.updateAlert}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div> : null}
        <div className="grid container">
          <div className="grid-item item-left">
            <ShareFile uploadCallback={this.callBack}></ShareFile>
          </div>
          <div className="grid-item item-right">
            <h2>Simple, private file sharing</h2>
            <p>
              FileFly Send lets you share files with end-to-end encryption and a link that automatically expires. So you can keep what you share private and make sure your stuff doesn't stay online forever.
            </p>
            <img src={share} alt="Share files"></img>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
