
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Student from './components/Student/Student';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <Student/> }></Route>
      </Routes>
    </>
  );
}

export default App;
