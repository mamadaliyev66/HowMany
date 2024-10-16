
import Pages from './Components/Pages';
import { Link } from 'react-router-dom';
import React, { useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
function App() {

  return (
    <BrowserRouter>

    <div >
      <Pages/>
    </div>
    </BrowserRouter>

  );
}

export default App;
