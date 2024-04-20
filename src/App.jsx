
import './App.css'
import LogInPage from './pages/LogInPage'
import ThemeContext from './context/ThemeContext';



function App() {


  return (
    <ThemeContext>
      <LogInPage />

    </ThemeContext>
  );


}

export default App
