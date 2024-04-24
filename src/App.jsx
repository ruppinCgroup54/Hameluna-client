
import './App.css'
import ThemeContext from './context/ThemeContext';
import AdoptersHomePage from './pages/AdoptersHomePage/index';
import ChatBot from './pages/ChatBot/index';
import DogsTinder from './pages/DogsTinder';
import LogInPage from './pages/LoginSystem/index';



function App() {


  return (
    <ThemeContext>

      <DogsTinder></DogsTinder>
    </ThemeContext>
  );


}

export default App
