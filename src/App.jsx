import './App.css';
import Login from './Components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';

import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './Components/ProtectedRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path='/login'
              element={<Login mail={'emiliano.lara@softtek.com'}></Login>}
            />
            <Route
              path='/navbar'
              element={
                <ProtectedRoute>
                  <Navbar></Navbar>
                </ProtectedRoute>
              }
            />
     
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
