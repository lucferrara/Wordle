import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import Landing from './Wordle/Landing';
import Game from "./Wordle/Game";
function App() {

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh'}}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/play" element={<Game />} />
        </Routes>
      </HashRouter>
    </div>
  )
}
export default App
