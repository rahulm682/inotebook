import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/noteState';
import { useState } from 'react';
import Alert from './components/Alert';


function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type,
    })

    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }


  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert} />
        <div className="container my-3">

          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>

      </BrowserRouter>
    </NoteState>
  );
}

export default App;
