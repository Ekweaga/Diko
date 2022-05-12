import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react';
import theme from './theme'
import {ThemeProvider,CssBaseline} from '@material-ui/core';
import {BrowserRouter,Switch,Link,Route} from 'react-router-dom'
import Home from './components/Home';
import Definition from './components/Definition';
import Bookmark from './components/Bookmarks';



function App() {
  const item =  localStorage.getItem('bookmarks')
  const [bookmarks,setbookmarks] = useState(
   JSON.parse(item) || {} )
  
console.log(bookmarks);
  const add = (word,definitions)=>{
    setbookmarks(oldbookmarks =>({...oldbookmarks,[word]:definitions}))

  }
  const remove = (word)=>{
setbookmarks(oldbookmarks=>{
  const temp = {...oldbookmarks}
  delete temp[word];
  return temp
})
  }
  useEffect(()=>{
            localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
  },[bookmarks])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
 
   <BrowserRouter>
   <Switch>
   <Route path="/" exact>
     <Home/>
     </Route>
    
   <Route path="/def/:id" exact>
     <Definition bookmarks = {bookmarks} add={add} remove={remove}/>
     </Route>
  
     <Route path="/bookmarks" exact>
     <Bookmark bookmark = {bookmarks}/>
     </Route>
    
   
   </Switch>

   </BrowserRouter>
   
   
    </ThemeProvider>
   
  );
}

export default App;
