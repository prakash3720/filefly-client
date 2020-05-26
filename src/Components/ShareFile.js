import React from 'react';
import './ShareFile.css'
import add from '../static/add.svg'
import file from '../static/file.svg'
import axios from 'axios'
import JSZip from 'jszip';

class ShareFile extends React.Component{

    constructor(props){
        super(props)
        this.state={
            dispArr:[],
            files:[],
            fileSize:0,
            id:''
        }
        this.handleFiles=this.handleFiles.bind(this)
        this.upload=this.upload.bind(this)
    }

    componentDidMount(){
        document.getElementById('progress').classList.add('d-none')
    }

    handleFiles=(event)=>{
        const arr=[]
        let size=0
        for(let i=0;i<event.target.files.length;i++){
            arr.push(
                <div className="singleFile" key={i}>
                    <img src={file} alt="file"></img>
                    <p>{event.target.files[i].name}</p>
                </div>
            )
            size=size+(event.target.files[i].size)/1000000
        }
        size=size.toFixed(1)
        this.setState({
            files:event.target.files,
            dispArr:arr,
            fileSize:size
        })
    }

    upload(){
        if(this.state.files.length){
            document.getElementById('upload').classList.add('d-none')
            document.getElementById('progress').classList.remove('d-none')
            let zip = new JSZip();
            for(let i=0;i<this.state.files.length;i++){
                zip.file(this.state.files[i].name,this.state.files[i])
            }
            zip.generateAsync({type: "blob",compression: "DEFLATE",compressionOptions:{level: 9}}).then((content)=>{
                let formData = new FormData();
                formData.append('file', content);
                let config={
                    onUploadProgress:(progressEvent)=>{
                        document.getElementById('bar').style.width=`${Math.round( (progressEvent.loaded * 100) / progressEvent.total )}%`
                        document.getElementById('bar').innerHTML=`${Math.round( (progressEvent.loaded * 100) / progressEvent.total )}%`
                    }
                }
                axios.post('http://localhost:5000/upload/new',formData,config).then(res=>{
                    this.setState({
                        files:[],
                        dispArr:[],
                        fileSize:0
                    })
                    document.querySelector('#progress').classList.add('d-none')
                    document.getElementById('upload').classList.remove('d-none')
                    document.getElementById('bar').style.width="0%"
                    document.getElementById('bar').innerHTML="0%"
                    this.setState({id:res.data.id})
                    this.props.uploadCallback({success:1,id:res.data.id})
                })
                .catch(err=>{
                    console.log(err)
                    document.querySelector('#progress').classList.add('d-none')
                    document.getElementById('upload').classList.remove('d-none')
                    document.getElementById('bar').style.width="0%"
                    document.getElementById('bar').innerHTML="0%"
                    this.props.uploadCallback({success:0})
                })
            })
        }else{
            this.props.uploadCallback({success:2})
        }
    }

    render(){
        return (
            <div className="content">
                <div className="listView">
                    <input type="file" multiple id="file" name="file" onChange={this.handleFiles}></input>
                    {this.state.files.length?<div className="filesList">
                    {this.state.dispArr}
                    </div>:<div className="addFiles">
                        <img src={add} alt="add files"></img>
                        <p>Drag and Drop files <span>or click to send files</span></p>
                    </div>}
                </div>
                <div className="fileDetails">
                    <p>No. of Files: {this.state.files.length?this.state.files.length:0}</p>
                    <p>Total Size: {this.state.fileSize}MB</p>
                </div>
                {/* <button className="btn btn-primary btn-sm mb-1" onClick={copyUrl}>Copy URL <i class="far fa-copy"></i></button> */}
                <button id="upload" className="btn btn-primary" onClick={this.upload}>Upload</button>
                <div className="progress" id="progress">
                    <div id="bar" className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: '0%'}}></div>
                </div>
            </div>
        )
    }

}

export default ShareFile