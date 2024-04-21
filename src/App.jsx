
import './App.css'
import ThemeContext from './context/ThemeContext';
import AdoptersHomePage from './pages/AdoptersHomePage/index';
import LogInPage from './pages/LoginSystem/index';



function App() {


  return (
    <ThemeContext>
      <AdoptersHomePage/>


    </ThemeContext>
  );


}

export default App
