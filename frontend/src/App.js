import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import AuthPage  from './Auth.js';
import BlogModule from './BlogModule.jsx';
import './AuthPage.css';

export default function App()
{
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element ={<BlogModule />} />
      <Route path="/auth" element = {<AuthPage />} /> 
    </Routes>
    </BrowserRouter>
  )
}