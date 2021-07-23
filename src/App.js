import { useState } from 'react';

import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';

function App() {
  const [cartOpened, setCartOpened] = useState(false);

  return (
    <div className="wrapper clear">
      <Header onClickCart={() => setCartOpened(true)} />

      <HomePage cartOpened={cartOpened} setCartOpened={setCartOpened} />
    </div>
  );
}

export default App;
