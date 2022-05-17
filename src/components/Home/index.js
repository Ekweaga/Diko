import React from 'react'
import diko from './dictionary (1).png';
import './home.css'
import {Box,Typography,FilledInput,IconButton} from '@material-ui/core'
import Search from '@mui/icons-material/Search'
import Bookmark from '@mui/icons-material/Bookmark'
import {useState} from 'react';
import {BrowserRouter,Switch,Link,Route} from 'react-router-dom'
import {useHistory} from 'react-router-dom'


function Home() {
    const [word, setword] = useState("")
    const history = useHistory();
    const handlesubmit = (event)=>{
     
    const trimword = word.trim();
    if(event.key === "Enter"){
      if(word === null){
        return ;
      }
      else{
        console.log(word)
        window.location.assign(`/def/${word}`)
      }
     
    }
  
    
    
     
    
   
   
     
       
      
      
    
       
  
      
    }
    return (
     
        <div className='box'>
          <img src={diko}/>
         
            
           <h6> DIKO</h6> 
            <p>Find meanings and save for quick reference</p>
          
            <div className='bttn'>
          <input type="text" placeholder='Search word' onKeyPress={handlesubmit} onChange={event => setword(event.target.value)} value={word} name="word"/>
          <div className="btn">
            <Search style={{fontSize:'15px',marginLeft:'05px',color:'disabled'}}/>
          </div>
            </div> 
           
          
          
          <a href="/bookmarks">   <IconButton style={{backgroundColor:'blue',color:'white', marginTop:'25px',borderRadius:'16px', boxShadow:'8px 18px 25px rgba(0,0,0,0.15)'}}>
             <Bookmark />
             </IconButton></a>
             </div>
            
         
     
    )
  }
  
  export default Home