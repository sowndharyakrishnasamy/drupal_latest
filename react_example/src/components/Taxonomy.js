import React, {Component} from 'react';
class Taxonomy extends Component{
    constructor(){
        super();
        this.state={
            taxonomyValue : [],
            loading:true
        }
    }
    componentDidMount(){
       
        fetch('http://local.drupal/jsonapi/taxonomy_term/sample')
        .then(response => response.json())
        .then(json => {this.setState ({
            taxonomyValue : json.data,
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
        if(this.state.taxonomyValue != null && this.state.loading === false){
        Values = this.state.taxonomyValue.map((item,index) =>{
            // console.log(item.attributes)
            if(item.attributes.field_description.value != null && item.attributes.field_heading.value != null){
            return( <div key={index}>
            <h3>{item.attributes.field_heading.value}</h3>
            <p dangerouslySetInnerHTML={{__html: item.attributes.field_description.value}}/>
            </div> )
            }
            else{
               console.log("Some value is null"); 
            }
        })
        }
    
    return(
        <div>
            <h1>Content from Taxonomy</h1>
            <div>{Values}</div>
        </div>
    )
    }
}
export default Taxonomy;