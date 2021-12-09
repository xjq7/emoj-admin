import { useEffect } from 'react';
import Router from './router';

const App = function () {
  useEffect(() => {
    console.log('App');
  }, []);
  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
