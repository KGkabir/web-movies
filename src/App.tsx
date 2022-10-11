
import { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./components/context"

const List = lazy(() => import('./components/ListMovies'));
const MyList = lazy(() => import('./components/MyListMovies'));

function App() {
  return (
    
      <div className='container' >
        <MovieProvider>
          <Suspense fallback={<div style={{
                                marginTop: 200,
                                marginLeft: 500,
                                overflow: 'auto' }}>Loading...</div>}>
            <Routes>          
                <Route path="/search" element={<List/>} />
                <Route path="/mylist" element={<MyList/>} />          
            </Routes>
          </Suspense>
        </MovieProvider>
      </div>
    
  );
}

export default App;
