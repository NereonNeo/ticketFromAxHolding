import { createBrowserRouter } from 'react-router-dom';
import Contact from './Contact';
import Create from './Create';
import Home from './Home';

const pagesData = createBrowserRouter([
  {
    path: '',
    element: <Home />,
  },
  {
    path: '/contact/:id',
    element: <Contact />,
  },
  {
    path: '/create',
    element: <Create />,
  },
]);

export default pagesData;
