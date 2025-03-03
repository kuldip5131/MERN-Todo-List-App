import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from "./componentes/Home";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Default Page */}
      </Routes>
    </Router>
  )
}

export default App
