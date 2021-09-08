import Dashboard from './containers/dashboard';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="app-header">
          <h6 className="header">LIVE WEBSITE TRACKING</h6>
          <p>Currently tracking {localStorage.getItem("urlList") ? JSON.parse(localStorage.getItem("urlList")).length : '0'} websites</p>
        </div>
        <Dashboard />
      </BrowserRouter>
    </div>
  );
}

export default App;
