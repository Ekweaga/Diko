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


function Definition() {
  const history = useHistory()
  const {id} = useParams()
  const [loading,setloading]= useState(true)
  const [exist,setexist] = useState(true)
  const [definitions, setdefinitions] = useState([])
  

  useEffect(()=>{
    const fetchdata = async ()=>{
      try{
        const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${id}`)
        setloading(false)
        console.log(res.data)
        setdefinitions(res.data)
      }
      catch(err){
          setexist(false)
      }
    

    }
    fetchdata();
  },[])
            if(!exist) return (<div style={{display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'center',height:'100vh'}}>
               <p style={{fontSize:'15px',fontWeight:'bold'}}> Word not Found</p><br/><br/>
                <button onClick={history.goBack} style={{backgroundColor:'blue',color:'white' ,borderRadius:'16px', boxShadow:'8px 18px 25px rgba(0,0,0,0.15)',padding:'10px',width:'200px',border:'none'}}>Go Back</button>
            </div>)
          if(loading) return (<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}>
            <CircularProgress/>
            </div>)

  return (
    
    
     <>
     <div className='back'> <ArrowBack onClick = {history.goBack} style={{cursor:'pointer'}}/>
      <Bookmark/></div>
    
      <div className="word">
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <h1 style={{margin:'0px'}}>{id}</h1>
       <span> {definitions[0]?.phonetic}</span>
        </div>
        
        <IconButton style={{backgroundColor:'blue',color:'white' ,borderRadius:'16px', boxShadow:'8px 18px 25px rgba(0,0,0,0.15)'}}>
           <PlayArrowIcon />
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