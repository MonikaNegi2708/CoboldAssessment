import Dashboard from './containers/dashboard';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <h1>LIVE WEBSITE TRACKING</h1>
        </div>
        <Dashboard />
      </BrowserRouter>
    </div>
  );
}

export default App;
