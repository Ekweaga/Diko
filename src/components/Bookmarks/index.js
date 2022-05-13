import React from 'react'
import {ArrowBack,} from '@material-ui/icons'
import './book.css'
import {useHistory, useParams, Link} from 'react-router-dom'

function Bookmark({bookmark}) {
  const history = useHistory()
  
  return (
 <> <div className="bookmark">
    <div style={{display:'flex',alignItems:'center',marginBottom:'30px'}}><ArrowBack style={{marginRight:'20px'}} onClick={history.goBack} /> <span style={{margin:'0px',fontWeight:'bold'}}>Bookmarks</span></div>
    <div>{Object.keys(bookmark).map((b)=>{
      return (<p onClick={()=> window.location.assign(`/def/${b}`)} style={{backgroundColor:'white', boxShadow:'8px 18px 25px rgba(0,0,0,0.15)',color:'black',padding:'10px'}}>
       {b}
      </p>)
    })}</div>
  </div>
  </>
  )
}

export default Bookmark