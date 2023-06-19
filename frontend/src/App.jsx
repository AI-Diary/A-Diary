import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Default from './Pages/Default';
import LogIn from './Pages/Login';
import SignIn from './Pages/Signin';
import Main from './Pages/Main';
import Write from './Pages/Write';
import WriteModal from './Pages/WriteModal';
import MyPage from './Pages/MyPage';
import ShowDiary from './Pages/ShowDiary';
import Statistics from './Pages/Statistics';

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
          <Route path='/WriteModal' element={<WriteModal />} />
          <Route path='/MyPage' element={<MyPage />} />
          <Route path='/ShowDiary' element={<ShowDiary />} />
          <Route path='/Statistics' element={<Statistics />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
