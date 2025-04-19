import Start from './Wordle/Landing'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import Instructions from './Wordle/Instructions';
import Landing from './Wordle/Landing';

function App() {

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh'}}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/play" element={<Instructions />} />
        </Routes>
      </HashRouter>
    </div>
  )
}
export default App
