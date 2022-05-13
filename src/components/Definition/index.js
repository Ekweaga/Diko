import React from 'react'
import {useState,useEffect,Fragment} from 'react'
import {Box,Typography,FilledInput,IconButton} from '@material-ui/core'
import {ArrowBack,} from '@material-ui/icons'
import Bookmark from '@mui/icons-material/Bookmark'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import {useHistory, useParams, Link} from 'react-router-dom'
import {CircularProgress, Divider} from '@material-ui/core'
import './def.css';
import axios from 'axios';


function Definition({add,bookmarks,remove}) {
  const history = useHistory()
  const [isbook,setisbook] = useState()
  const {id} = useParams()
  const [loading,setloading]= useState(true)
  const [exist,setexist] = useState(true)
  const [definitions, setdefinitions] = useState([]);
  const [audio,setaudio] = useState(null);
  
  const isbookmarked = Object.keys(bookmarks).includes(id);
  const bok = ()=>{
    window.location.assign("/bookmarks")
  }

  const update = data =>{
 
  
    setdefinitions(data)
    const phonetics = data[0].phonetics
    if(!phonetics.length) return;
    const url = phonetics[0].audio.replace('//ssl', 'https://ssl')
    setaudio(new Audio(url))
  }

  useEffect(()=>{
    const fetchdata = async ()=>{
      try{
        const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${id}`)
       update(res.data)
      
      }
      catch(err){
          setexist(false)
      }
    

    }
    if(!isbookmarked) fetchdata();
    else{
      update(bookmarks[id])
    }
    
  },[])
            if(!exist) return (<div style={{display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'center',height:'100vh'}}>
               <p style={{fontSize:'15px',fontWeight:'bold'}}> Word not Found</p><br/><br/>
                <button onClick={history.goBack} style={{backgroundColor:'blue',color:'white' ,borderRadius:'16px', boxShadow:'8px 18px 25px rgba(0,0,0,0.15)',padding:'10px',width:'200px',border:'none'}}>Go Back</button>
            </div>)
          if(!definitions.length) return (<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}>
            <CircularProgress/>
            </div>)

  return (
    
    
     <>
     <div className='back'> <ArrowBack onClick = {history.goBack} style={{cursor:'pointer'}}/>
      <Bookmark onClick={()=>isbookmarked ? remove(id):add(id,definitions)}/></div>
    {isbookmarked && 
      (<div style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'25px',color:'red',width:'80%',margin:'auto'}}>
      <p onClick={bok}>Word Saved</p>
      </div>)
    }
    
      <div className="word">
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <h1 style={{margin:'0px'}}>{id}</h1>
       <span> {definitions[0]?.phonetic}</span>
        </div>
        
        <IconButton style={{backgroundColor:'blue',color:'white' ,borderRadius:'16px', boxShadow:'8px 18px 25px rgba(0,0,0,0.15)'}}>
          {audio && <PlayArrowIcon onClick={()=>audio.play()}/>}
           </IconButton>
      </div>

      <div className='ok'>
        {definitions.map((def,i)=>{
          return <><Fragment key={i}>
            <Divider/>
                {def.meanings.map((meaning,i)=>{
                  return <div key={i} className="item" style={{backgroundColor:'white',boxShadow:'8px 18px 25px rgba(0,0,0,0.15)',marginTop:'30px',padding:'20px',borderRadius:'15px'}}>
                     <b> {meaning?.partOfSpeech.toUpperCase()}</b>
                      {meaning?.definitions.map((definition,idx)=>{
                        return (<><p key={idx}>{definitions.length > 1 && (`${idx + 1}`)}&nbsp;{definition?.definition}</p>
                       <span> {definition.synonyms[3]}</span></>
                        )
                      })}
                  </div>
                })}
          </Fragment></>
          
        })}
      </div>
 
      </> 
    
  )
}

export default Definition