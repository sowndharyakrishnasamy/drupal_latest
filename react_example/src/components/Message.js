import React, { Component} from 'react';

class Message extends Component{
    constructor(){
        super();
        this.state ={
            data:{
                type: "node--page",
                attributes: {
                    title:"",
                    body: {
                        value: ""
                    }
                },
            imageurl:""
            }
        }
    }
    textHandler(event){
        // console.log(event.target.value);
             this.setState({data:{
                 ...this.state.data,
                 attributes:{
                     ...this.state.data.attributes,
                     body:{
                         ...this.state.data.attributes.body,
                         value : event.target.value}}}})
     }
    InputHandler(event){
            this.setState({data:{
                ...this.state.data,
                attributes:{
                    ...this.state.data.attributes,
                    title:event.target.value,
                    body:{
                        ...this.state.data.attributes.body}}}})

    }
    // imageHandler(event){
    //     // this.setState({imageurl:event.target.files[0]})
    //     console.log(event.target.files[0]);
    // }
    submitHandler = (event)=>{
        event.preventDefault();
        fetch("http://local.drupal/jsonapi/node/page",{
            mode: 'cors',
            method: 'POST',
            headers: {
                "Content-type": "application/vnd.api+json",
                "Accept":"application/vnd.api+json",
                "Authorization":"Basic cm9vdDphZG1pbiQxMjM="
                // "Origin":"http://localhost:3000/"
			},
            body:JSON.stringify({
            data:this.state.data
            })
        }).then(response =>  response.json())
        .then(json => {console.log(json);})
        // this.setState({data:{
        //     type: "node--article",
        //     attributes: {
        //         title:"",
        //         body: {
        //             value: ""
        //         }
        //     },
        // imageurl:""
        // }})
                
    }
    render(){
       
        return(
           <form>
               <h1> Create Content of Basic page content type</h1>
               <label>Title</label><br/>
               <input type="text" onChange={this.InputHandler.bind(this)} name="title"/><br/>
               <label>Body</label><br/>
               <input type="textarea" onChange={this.textHandler.bind(this)} name="body" className="textarea"/><br/>
               {/* <label>Upload Image</label>
               <input type="file" accept="image/*" name="image" onChange={this.imageHandler.bind(this)} class="imagechoose"/><br/> */}
               <input type="submit" onClick={this.submitHandler} value="SUBMIT"/>
           </form>
        )
    }
}
export default Message;