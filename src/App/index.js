import React from 'react';
import WelcomeMessage from'./WelcomeMessage'

import './App.css';
import styled,{css} from'styled-components';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import {AppProvider} from './AppProvider';





function App() {
  return (
    <div className="App">
    <AppLayout>
    <AppProvider>
         <AppBar/>
          <WelcomeMessage />
    </AppProvider>


    </AppLayout>
    </div>
  );
}

export default App;
