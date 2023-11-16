import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserList from './pages/user';

function App() {
 return (
   <Router>
     <Routes>
       <Route path="/login" element={<Login />}></Route>
       <Route path="/register" element={<Register />}></Route>
       <Route path="/user" element={<UserList />}></Route>
     </Routes>
   </Router>
 );
}

export default App;
