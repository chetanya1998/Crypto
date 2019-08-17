import React from 'react';
import WelcomeMessage from'./WelcomeMessage'

import './App.css';
import styled,{css} from'styled-components';
import AppLayout from './AppLayout';
import AppBar from './AppBar';

// const MyButton = styled.div`
// color:green;
// ${props => props.primary && css`
//
//     color: palevioletred;
//   `}
// `
// const TomatoButton = styled(MyButton)`
//   color: tomato;
//   border-color: tomato;
// `;



function App() {
  return (
    <div className="App">
    <AppLayout>
    <AppBar/>
    <WelcomeMessage />



    </AppLayout>
    </div>
  );
}

export default App;
