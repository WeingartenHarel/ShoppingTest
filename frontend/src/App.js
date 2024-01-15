import logo from './logo.svg';
import React, { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import './styles/styles.scss'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainHome from './cmps/MainHome/MainHome';
import Checkout from './cmps/Checkout/Checkout';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <MainHome />
      </div>
    ),
  },
  {
    path: "/checkout",
    element: (
      <div>
        <Checkout />
      </div>
    ),
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
