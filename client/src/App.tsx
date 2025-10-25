import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/expenses' element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
