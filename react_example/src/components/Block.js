import React, {Component} from 'react';
class Block extends Component{
    constructor(){
        super();
        this.state={
            BlockValue : [],
            loading:true
        }
    }
    componentDidMount(){
       
        fetch('http://local.drupal/jsonapi/block_content/basic')
        .then(response => response.json())
        .then(json => {this.setState ({
            BlockValue : json.data,
            loading : false
        });
        console.log(json);
        })
        // console.log(this.state.data);
    }
    render(){
        let Values = ""
        if(this.state.loading === true){
            Values = <h3>Loading...</h3>
        }
       // console.log("values"+this.state.taxonomyValue)
        if(this.state.BlockValue != null && this.state.loading === false){
        Values = this.state.BlockValue.map((item,index) =>{
            // console.log(item.attributes)
            if(item.attributes.info != null && item.attributes.body.value != null){
            return( <div key={index}>
            <h3>{item.attributes.info}</h3>
            <p dangerouslySetInnerHTML={{__html: item.attributes.body.value}}/>
            </div> )
            }
            else{
               console.log("Some value is null"); 
            }
        })
        }
    
    return(
        <div>
            <h1>Content from custom block</h1>
            <div>{Values}</div>
        </div>
    )
    }
}
export default Block;