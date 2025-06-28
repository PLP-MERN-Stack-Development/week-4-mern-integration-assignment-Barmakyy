import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import PostList from './components/PostList';
import PostView from './components/PostView';
import PostForm from './components/PostForm';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-background flex flex-col">
            <NavBar />
            <main className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-2xl card-container">
                <Routes>
                  <Route path="/" element={<PostList />} />
                  <Route path="/posts/:id" element={<PostView />} />
                  <Route path="/create" element={<PostForm />} />
                  <Route path="/edit/:id" element={<PostForm editMode />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </div>
            </main>
            <footer className="text-center text-gray-500 py-4">
              &copy; {new Date().getFullYear()} My Blog. All rights reserved.
            </footer>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;