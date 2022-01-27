import './App.css';
import Links from './components/Links';
import Soma from './components/Soma';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'





function App() {
  return (
    <div className='flex justify-center items-center flex-col'>
      
      <Links />
      <Soma/>
      <ToastContainer/>
      

    </div>
  );
}

export default App;
