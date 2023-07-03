import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponents from '../src/Components/NavbarComponents';
import User from '../src/Components/User'

function App() {
  return (
    <div className="App">
       <NavbarComponents />
       <User />
    </div>
  );
}

export default App;
