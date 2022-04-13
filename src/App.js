import './App.css';
import { Component } from 'react';
import Navbar from './Components/Navbar.js';
import News from './Components/News';
import { BrowserRouter as Router,  Route, Routes, } from "react-router-dom";

class App extends Component{
  render(){
    return (
      <>
      <Router>
      <Navbar title="Zee News"/>
      {/* <News pageSize={5} /> */}
      <Routes>
        <Route key="general" exact path="/" element={<News key="general" pageSize={5} category="general" />}/>
        <Route key="business" exact path="/business" element={<News key="business" pageSize={5} category="business" />}/>
        <Route key="entertainment" exact path="/entertainment" element={<News key="entertainment" pageSize={5} category="entertainment" />}/>
        <Route key="health" exact path="/health" element={<News key="health" pageSize={5} category="health" />}/>
        <Route key="science" exact path="/science" element={<News key="science" pageSize={5} category="science" />}/>
        <Route key="sports" exact path="/sports" element={<News key="sports" pageSize={5} category="sports" />}/>
        <Route key="technology" exact path="/technology" element={<News key="technology" pageSize={5} category="technology" />}/>
      </Routes>
      </Router>
      </>
    )
  }
}


export default App;
