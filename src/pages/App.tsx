import { useEffect } from 'react';
import Router from './router';

function App() {
  useEffect(() => {
    console.log('App');
  }, []);
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
