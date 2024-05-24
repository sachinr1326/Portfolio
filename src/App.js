import Container1 from './Component/Container1/Container1';
import Container2 from './Component/Container2/Container2';
import Container3 from './Component/Container3/Container3';
import Container4 from './Component/Container4/Container4';
import Container5 from './Component/Container5/Container5';
import Container6 from './Component/Container6/Container6';
import Header from './GlobalComponent/Header';
import SplashScreen from './GlobalComponent/SplashScreen';
import { ToastProvider } from './GlobalComponent/ToastContext';
import Chatbot from './GlobalComponent/Chatbot';
import Container7 from './Component/Container7/Container7';
// import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  document.querySelector("body").setAttribute("data-theme","theme1");
  document.querySelector("body").setAttribute("data-font","font0");

  return (
    <div className="App">
      <ToastProvider>
       <Header/>
     <SplashScreen/>
     <Container1/>
    <Container7/>
    <Container2/> 
    <Container3/>
    <Container4/>
    <Container5/>
    <Container6/>
    <Chatbot/>
    </ToastProvider>
  
    </div>
  );
}

export default App;
