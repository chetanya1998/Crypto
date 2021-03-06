import React from 'react';


import './App.css';
import styled,{css} from'styled-components';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import {AppProvider} from './AppProvider';
import Settings from '../Settings';
import Dashboard from '../Dashboard';
import Content  from '../Shared/Content';



function App() {
  return (
    <div className="App">
    <AppLayout>
    <AppProvider>
         <AppBar/>
          <Content>
          <Settings />
          <Dashboard />

          </Content>
    </AppProvider>


    </AppLayout>
    </div>
  );
}

export default App;
