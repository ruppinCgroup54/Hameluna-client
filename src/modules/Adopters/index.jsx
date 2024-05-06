import React, { Suspense } from "react";

import { Outlet } from "react-router-dom";

import lazyLoad from "../../utilis/LazyLoad";
import AdoptersContextProvider from "../../context/AdoptersContext";
import FallbackElement from "../../components/FallbackElement";

const AdopterHomePage = lazyLoad("../modules/Adopters/AdoptersHomePage/index");
const ChatBot = lazyLoad("../modules/Adopters/ChatBot/index");
const DogTinder = lazyLoad("../modules/Adopters/DogsTinder/index");
const DogPage = lazyLoad("../modules/Adopters/DogPage/index");
const Favorites = lazyLoad("../modules/Adopters/Favorites/index");
const SendRequest = lazyLoad("../modules/Adopters/SendRequest/index");

export const adopterRoutes = [
  {
    path: "/",
    element: <AdopterHomePage />,
  },
  {
    path: "/dogbot",
    element: <ChatBot />,
  },
  {
    path: "/dogtinder",
    element: <DogTinder />,
    loader: async ()=> {return fetch(import.meta.env.VITE_APP_SERVERURL + 'dogs')}
  },  
  {
    path: "/dog/:dogId",
    element: <DogPage />,
    loader: async ({params})=> {return fetch(import.meta.env.VITE_APP_SERVERURL + 'dogs/'+params.dogId)}
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/sendrequest/dogId/:dogId/dogName/:dogName",
    element: <SendRequest />,
    loader: async () => {
      let adopter = localStorage.getItem("adopter");
       return fetch(import.meta.env.VITE_APP_SERVERURL + 'adopters/'+adopter);
    },
  },
];

export default function index() {
  return (
    <AdoptersContextProvider>
      <Suspense fallback={<FallbackElement />}>
        <Outlet />
      </Suspense>
    </AdoptersContextProvider>
  );
}
