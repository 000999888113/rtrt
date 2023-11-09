import Home from './hometest';
import CNav from './Navbar'

import Sample from './Sample';
import Falseposition from './false';
import Onepointed from './onepointed';
import Gaussjordan from './gaussjordan';

import Taylor from './taylor';
import Newtonraphson from './newtonraphson';
import Secant from './secant';
import Matrixinversion from './matrixinversion';
import Cramer from './cramer';
import Seidal from './seidal';
import Jacobi from './jacobi';
import Conjugate from './conjugate';
import Lu from './LU';
import Cholesky from './cholesky';
import Newtondivide from './newtondivide';
import Lagrange from './lagrange';

import Simpson from './integrationsimpson';
import Trapezoidal from './trapezoidal';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <CNav/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/bisection"  element={<Sample/>} />
        <Route path="/falseposition"  element={<Falseposition/>} />
        <Route path="/onepointed"  element={<Onepointed/>} />
        <Route path="/taylor"  element={<Taylor/>} />
        <Route path="/newtonraphson"  element={<Newtonraphson/>} />
        <Route path="/secant"  element={<Secant/>} />
        <Route path="/gaussjordan"  element={<Gaussjordan/>} />
        <Route path="/matrixinversion"  element={<Matrixinversion/>} />
        <Route path="/cramer" element = {<Cramer/>}/>
        <Route path="/lu" element = {<Lu/>}/>
        <Route path="/cholesky" element = {<Cholesky/>}/>
        <Route path="/jacobi" element = {<Jacobi/>}/>
        <Route path="/gaussseidal" element = {<Seidal/>}/>
        <Route path="/conjugate" element = {<Conjugate/>}/>

        <Route path="/newtondivide"  element={<Newtondivide/>} />
        <Route path="/lagrange"  element={<Lagrange/>} />

        <Route path="/simpson"  element={<Simpson/>} />
        <Route path="/trapezoidal"  element={<Trapezoidal/>} />

      </Routes>
    </Router>
  );
}


export default App;
