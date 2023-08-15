import '@/index.css';
import { setupStore } from '@/store/store.ts';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';

const stroe = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={stroe}>
    <App />
  </Provider>
);
