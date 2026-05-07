import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TodoApp from './pages/TodoAppPages';
import CardUser from './pages/CardUser';

function App () {
  return (
    <>
      <TodoApp />
      {/* <CardUser /> */}
    </>
  );
}

export default App;
