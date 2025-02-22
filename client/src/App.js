
import './App.css';
import Home from './components/Home';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <>
      <NotificationProvider>
        <Home />
      </NotificationProvider>
    </>
  );
}

export default App;
