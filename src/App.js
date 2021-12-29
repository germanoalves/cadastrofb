import './App.css';
import Links from './components/Links';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <div className='flex justify-center items-center'>
      
      <Links />
      <ToastContainer/>
    </div>
  );
}

export default App;
