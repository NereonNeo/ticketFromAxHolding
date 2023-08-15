import MainLayout from '@/layouts';
import { RouterProvider } from 'react-router-dom';
import pagesData from './pages/pagesData';

function App() {
  return (
    <MainLayout>
      <RouterProvider router={pagesData} />
    </MainLayout>
  );
}

export default App;
