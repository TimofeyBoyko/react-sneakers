import { useState } from 'react';

import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  return (
    <div className="wrapper clear">
      <Header
        onClickCart={() => setCartOpened(!cartOpened)}
        onClickHeart={setShowFavorite}
        totalCost={totalCost}
      />

      <HomePage
        cartOpened={cartOpened}
        setCartOpened={setCartOpened}
        showFavorite={showFavorite}
        setTotalCost={setTotalCost}
        totalCost={totalCost}
      />
    </div>
  );
}

export default App;
