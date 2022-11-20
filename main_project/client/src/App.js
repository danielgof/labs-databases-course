import './App.css';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Phones from './pages/Phones';
// import Users from './pages/Users';
// import Positions from './pages/Positions';
// import StartPage from './pages/startPage';
import Header from './components/Header';

function App() {
  return (
    <Header />
    // <BrowserRouter>
    //   <div className="App">
    //     <header className="App-header">
    //       <Routes>
    //         <Route exact path="/" element={<StartPage />} />
    //         <Route exact path="/phones" element={<Phones />} />
    //         <Route exact path="/users" element={<Users />} />
    //         <Route exact path="/positions" element={<Positions />} />
    //       </Routes>
    //     </header>
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
