
import './App.css'
import ThemeContext from './context/ThemeContext';
import AdoptersHomePage from './pages/AdoptersHomePage/index';
import ChatBot from './pages/ChatBot/index';
import DogsTinder from './pages/DogsTinder';
import Home from './pages/LoginSystem/Home';
import LogInPage from './pages/LoginSystem/index';



function App() {


  return (
    <ThemeContext>
      {/* <LogInPage></LogInPage> */}
      <Home></Home>
    </ThemeContext>
  );


}

export default App
