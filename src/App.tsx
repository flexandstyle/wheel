import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import {
  HomePage,
  ResultPage,
  CatalogPage,
  FavoritesPage,
  ProfilePage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="result" element={<ResultPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
