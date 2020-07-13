import React, {Component} from 'react';
import Message from './Message'
class Article extends Component{
   constructor(){
       super();
       this.state ={
           data :[],
           included :[],
           loading : true
       }
   } 
    componentDidMount(){
       
    fetch('http://local.drupal/jsonapi/node/article?include=field_article_list,field_image')
    .then(response => response.json())
    .then(json => {
        this.setState ({
        data : json.data,
        included : json.included,
        loading:false
    });
    console.log(json);
    })
    // console.log(this.state.data);
   }

   render(){
    let URL ="http://local.drupal"
    let Messages = ""
    if(this.state.loading === true)
    {
        Messages =<h3>Loading....</h3>
    }
    if(this.state.data != null && this.state.loading === false){
    Messages = this.state.data.map((item,index) =>{
    let para = ""
    let Paragraph = ""
    if(item.relationships.field_article_list.data != null){
        para = item.relationships.field_article_list.data
    }
    let file = ""
    let ImageFile = ""
        if(item.relationships.field_image.data != null){
            file = item.relationships.field_image.data.id
        }
        if(item.attributes.title != null && item.attributes.body.value != null){
            ImageFile =this.state.included.map((k,v)=>{
                if(k.id === file){
                    return(<img key={v} src={URL.concat(k.attributes.uri.url)} className="width-100" alt={item.relationships.field_image.data.meta.alt}/>);
                }
            });
            let paravalue =""
            Paragraph = this.state.included.map((k,v)=>{
                paravalue = para.map((key,value) => {
                    if(key.id === k.id){
                         return(<div key={v}><h4>Related Article:{k.attributes.field_related_article.value}</h4>
                        <h4>Author:{k.attributes.field_related_article_author.value}</h4></div>)
                    }
                });
                
                return(paravalue)
            })
        return( <div key={index} className="flex">
        <div className="width-50">
        <h3>{item.attributes.title}</h3>
        <p dangerouslySetInnerHTML={{__html: item.attributes.body.value}}/>
        {Paragraph}
        </div>
        <div className="width-50">
        {ImageFile}
        </div>
        </div> )
        }
        else{
           console.log("Some value is null"); 
        }
       
    })
    }
    return(
        <div>
        <h1>Contents from Content type</h1>
       <div> {Messages}</div>
       </div>
    //   <Message/>
    )
      
   }
}
export default Article;