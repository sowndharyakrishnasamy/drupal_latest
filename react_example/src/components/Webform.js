import React, {Component} from 'react';
// import WebformConfirmation from './WebformConfirmation';
class Webform extends Component{
    constructor(){
        super();
        this.state={
            data : {
                    webform_id:"contact",
                    name:"",
                    email:"",
                    subject:"",
                    message:""
            },
            confirmation : ""
        }
    }
    InputHandler(event){
        if(event.target.name==="name"){
            this.setState({data:{
                ...this.state.data,
                name : event.target.value
            }})
        }
        else if (event.target.name==="email"){
            this.setState({data:{
                ...this.state.data,
                email : event.target.value
            }})
        }
        else if(event.target.name==="subject"){
            this.setState({data:{
                ...this.state.data,
                subject : event.target.value
            }})
        }
        else if(event.target.name==="message"){
            this.setState({data:{
                ...this.state.data,
                message : event.target.value
            }})
        }
    }
    submitHandler=(event)=>{
        event.preventDefault();
        console.log(this.state.data);
        fetch("http://local.drupal/webform_rest/submit",{
            mode: 'cors',
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "Accept":"application/json",
                "Authorization":"Basic cm9vdDphZG1pbiQxMjM=",
                "X-CSRF-Token":"1m9dOqZn9-B10Zxkm2aU3Xcnj_y-iSyaiPbtij-JqqM"
			},
            body:JSON.stringify({
                "webform_id":"contact",
                "name":this.state.data.name,
                "email":this.state.data.email,
                "subject":this.state.data.subject,
                "message":this.state.data.message
            })
        }).then(response =>  response.json())
        .then(json => {console.log(json);this.setState({ confirmation: json.sid })})
        this.setState({data:{
            ...this.state.data,
            name:"",
            email:"",
            subject:"",
            message:""
        }})
        // console.log(this.state.confirmation);
    }
    render(){
        return(
            <div>
            <form>
                <label>NAME</label><br/>
                <input type="text" name="name" value={this.state.data.name} onChange={this.InputHandler.bind(this)}/><br/>
                <label>EMAIL</label><br/>
                <input type="email" name="email" value={this.state.data.email} onChange={this.InputHandler.bind(this)}/><br/>
                <label>SUBJECT</label><br/>
                <input type="text" name="subject" value={this.state.data.subject} onChange={this.InputHandler.bind(this)}/><br/>
                <label>MESSAGE</label><br/>
                <textarea  rows="5" name="message" value={this.state.data.message} onChange={this.InputHandler.bind(this)}/><br/>
                <input type="submit" value="SUBMIT" name="submit" onClick={this.submitHandler}/>
            </form>
            {/* <p>Submission id is:{this.state.confirmation}</p> */}
            {/* <WebformConfirmation sid={this.state.confirmation}/> */}
            </div>
            
        )
    }

}
export default Webform;