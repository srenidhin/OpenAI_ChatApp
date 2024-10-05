import { useEffect, useState } from 'react';
import Sidebar from './components/sidebar/sidebar';
import './App.css';
import Main from './components/main/Main';

function App() {

     return (
        <>
             <Sidebar />
             <Main />
        </>
    );
}

export default App;