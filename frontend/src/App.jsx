import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Default from './Pages/Default';
import LogIn from './Pages/Login';
import SignIn from './Pages/Signin';
import Main from './Pages/Main';
import Write from './Pages/Write';
import MyPage from './Pages/MyPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Default />} />
          <Route path='/LogIn' element={<LogIn />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/Main' element={<Main />} />
          <Route path='/Write' element={<Write />} />
          <Route path='/Statistics' element={<MyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
