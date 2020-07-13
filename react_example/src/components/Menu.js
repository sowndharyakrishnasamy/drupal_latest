import React, {Component} from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import Webform from './Webform';
import Article from './Article';
import Taxonomy from './Taxonomy';
import Block from './Block';
import Message from './Message';
class Menu extends Component{
    constructor(){
        super();
        this.state = {
            data:[],
            loading : true,
        }
    }
    componentDidMount(){
        fetch('http://local.drupal/api/menu_items/main')
        .then(response => response.json())
        .then(json => {
            this.setState ({
            data : json,
            loading:false
        });
        console.log(json);
        })
       }
       render(){
           let menu = ""
           if(this.state.data != null && this.state.loading === false){
           menu = this.state.data.map((key,value)=>{
               return(<li key={value}><Link to={key.relative}>{key.title}</Link></li>)
           });
        }
           return(
               <div>
                <Router>
                    <div>
                    <ul className="Menu">
                        {menu}
                    </ul>
                    <Switch>
                       <Route path="/" exact>
                       <Message/>
                       </Route>
                        <Route path="/content">
                            <Article />
                        </Route>
                        <Route path="/taxonomy">
                            <Taxonomy />
                        </Route>
                        <Route path="/webform">
                            <Webform />
                        </Route>
                        <Route path="/block">
                            <Block/>
                        </Route>
                    </Switch>
                </div>
                </Router>
               
                </div>
           )
       }
}
export default Menu;