import logo from './logo.svg';
import './App.css';

import Main from "./components/Main"
import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter 
} from 'react-router-dom';

function App() {


  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
        </ChakraProvider>
    </div>
  )
}

export default App
