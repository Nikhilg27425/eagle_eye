import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import './index.css';
import Layout from './Layout.jsx';
import Hero from './Components/Hero/hero.jsx';
import Model_one from './Components/Model_one/one.jsx';
import Model_two from './Components/Model_two/two.jsx';
import Model_three from './Components/Model_three/three.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Hero />} />
      <Route path="Model_one" element={<Model_one />} />
      <Route path="Model_two" element={<Model_two />} />
      <Route path="Model_three" element={<Model_three />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
