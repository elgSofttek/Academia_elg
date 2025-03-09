import './App.css';
import Login from './Components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';

import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { TodoWrapper } from './Components/TodoWrapper';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <div style={{paddingTop:'60px'}}>
              <Routes>
                <Route
                  path='/login'
                  element={<Login></Login>}
                />
                
                <Route
                  path='/tasks'
                  element={
                    <ProtectedRoute>
                      <Navbar/>
                      <TodoWrapper/>
                    </ProtectedRoute>
                  }
                />
        
              </Routes>


          </div>
        
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
