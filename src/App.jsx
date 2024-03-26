import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './layout/header/navbar';
import Footer from './layout/footer/footer';



function App() {
  return (
      <>
        <Navbar/>
        <Outlet/>
        <Footer/>
      </>
     
  );
}

export default App;
