
import './App.css';
import Nav from './component/nav/nav';
import LandingPage from './page/landing_page';
import HabbitCard from './page/habbit';
import {
  createBrowserRouter,
  // createRoutesFromElements,
  // Route,
  RouterProvider,
} from "react-router-dom";
function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element:  <LandingPage/> ,
    },
   { path: ':id', element:<HabbitCard /> },
      
    
  ]);
  return (
    <div className="App">
       <Nav/>
       <RouterProvider router={router} />
       

    </div>
  );
}

export default App;
