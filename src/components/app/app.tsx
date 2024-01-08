import { BrowserRouter } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

import { ScrollToTop } from '../scroll-to-top';
import { Routers } from './routers';
import { useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { MainSelector } from '../../store/main/selector';

export default function App() {
  const error = useAppSelector(MainSelector.error);

  useEffect(() => {
    toast(error);
  }, [error]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routers />
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}
