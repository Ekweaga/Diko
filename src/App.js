import logo from './logo.svg';
import './App.css';

import theme from './theme'
import {ThemeProvider,CssBaseline} from '@material-ui/core';
import {BrowserRouter,Switch,Link,Route} from 'react-router-dom'
import Home from './components/Home';
import Definition from './components/Definition';
import Bookmark from './components/Bookmarks';



function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
 
   <BrowserRouter>
   <Switch>
   <Route path="/" exact>
     <Home/>
     </Route>
    
   <Route path="/def/:id" exact>
     <Definition/>
     </Route>
  
     <Route path="/bookmarks" exact>
     <Bookmark/>
     </Route>
    
   
   </Switch>

   </BrowserRouter>
   
   
    </ThemeProvider>
   
  );
}

export default App;
