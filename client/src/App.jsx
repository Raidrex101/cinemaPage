import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from './pages/Home'
import Nav from './components/Nav';
import Login from './pages/Login'
import MoviePage from "./pages/MoviePage";
import Register from './pages/Register'
import BuyTickets from "./pages/BuyTickets";
import Management from "./pages/Management";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider } from './context/authContext'
import { MovieProvider } from './context/movieContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'


const MainLayout = () => {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
};
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/movie/:id', element: <MoviePage /> },
        { path: '/management', element: <Management /> },
        { path: '/buy-tickets/:movieId', element: <BuyTickets /> },
      ],
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    
  ]);



  return (
    <>
      <MovieProvider>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
      </MovieProvider>
    </>
  )
}

export default App
