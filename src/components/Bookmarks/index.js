import React from 'react'
import {ArrowBack,} from '@material-ui/icons'
import './book.css'

function Bookmark({bookmark}) {
  
  return (
 <> <div className="bookmark">
    <div><ArrowBack style={{marginRight:'20px'}}/> <span style={{margin:'0px'}}>Bookmarks</span></div>
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