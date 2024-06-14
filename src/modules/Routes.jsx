import { get } from "react-hook-form";
import useLocalStorage from "../utilis/useLocalStorge";

// Admin Rouets

// const LogInPage = lazyLoad("../modules/Admin/LogInPage");
// const WhosHome = lazyLoad("../modules/Admin/WhosHome");
// const SystemPage = lazyLoad("../modules/Admin/SystemPage");
// const ControlPage = lazyLoad("../modules/Admin/ControlPage");
// const ModalPage = lazyLoad("../modules/Admin/components/ModalAddDog");

import ControlPage from "./Admin/ControlPage";
import LogInPage from "./Admin/LogInPage";
import SystemPage from "./Admin/SystemPage";
import WhosHome from "./Admin/WhosHome";
import AdoptersHomePage from "./Adopters/AdoptersHomePage";
import ChatBot from "./Adopters/ChatBot";
import DogPage from "./Adopters/DogPage";
import DogsTinder from "./Adopters/DogsTinder";
import Favorites from "./Adopters/Favorites";
import SendRequest from "./Adopters/SendRequest";
import Register from "./Admin/Register";
import { lazy } from "react";
import { ShelterContext } from "../context/ShelterContextProvider";
import EmpLogin from "./Employees/EmpLogin";
import EmpLoginCode from "./Employees/EmpLoginCode";
import EmpSignUp from "./Employees/EmpSignUp";
import DogsList from "./Employees/DogsList";
import DogsId from "./Employees/DogsID";
import { json, redirect } from "react-router-dom";
import { element } from "prop-types";
import DogsInShelter from "./Admin/DogsInShelter";
import AdoptionPage from "./Admin/AdoptionPage";
import RequestsPage from "./Admin/RequestsPage";
import AdminDogPage from "./Admin/AdminDogPage";


export const pathes = [
  {
    path: "/admin/shelter/",
    element: <ControlPage />,
    id: "דף הבית"
  },
  {
    path: "/admin/shelter/whosHome/",
    element: <DogsInShelter />,
    children: [
      {
        path: "/admin/shelter/whosHome/",
        element: <WhosHome />,
      },
      {
        path: "/admin/shelter/whosHome/adoption",
        element: <AdoptionPage />,
      }, {
        path: "/admin/shelter/whosHome/dogProfile/:id",
        element: <AdminDogPage />,
        loader: async ({ params }) => {
          return fetch(`${import.meta.env.VITE_APP_SERVERURL}Dogs/${params.id}`);
        },
      }
    ],
    id: "מי בבית"
  },
  {
    path: "/admin/shelter/whosHome/",
    element: <WhosHome />,
    id: "משימות"
  },
  {
    path: "/admin/shelter/requestsPage/",
    element: <RequestsPage />,
    id: "בקשות"
  },
  {
    path: "/admin/shelter/whosHome/",
    element: <WhosHome />,
    id: "סיכומים"
  },
];

export const adminRouts = [
  {
    path: "/admin/",
    element: <LogInPage />,
  },
  {
    path: "/admin/register",
    element: <Register />
    // async lazy() {
    //   let Register = await import("./Admin/Register");
    //   return { Component: Register.default };
    // },
  },
  {
    path: "/admin/shelter",
    element: <SystemPage />,
    // lazy: () => import("./Admin/SystemPage"),
    id: "כלבייה",
    // loader: async () => {
    //   return fetch(`${import.meta.env.VITE_APP_SERVERURL}Cells/shelter/1`);
    // },
    children: pathes,
  },
];


// Adopters Routes

// const AdopterHomePage = lazyLoad("../modules/Adopters/AdoptersHomePage/index");
// const ChatBot = lazyLoad("../modules/Adopters/ChatBot/index");
// const DogTinder = lazyLoad("../modules/Adopters/DogsTinder/index");
// const DogPage = lazyLoad("../modules/Adopters/DogPage/index");
// const Favorites = lazyLoad("../modules/Adopters/Favorites/index");
// const SendRequest = lazyLoad("../modules/Adopters/SendRequest/index");

export const adopterRoutes = [
  {
    path: "/",
    element: <AdoptersHomePage />,

  },
  {
    path: "/dogbot",
    element: <ChatBot />,
    loader: async () => {
      let getId = JSON.parse(localStorage.getItem('_id'));
      console.log('getId', getId)
      if (getId === null) {
        return redirect("/");
      } else {
        //seconde option - existing id , get his chat history from database
        return fetch(import.meta.env.VITE_APP_SERVERURL + "Chats/" + getId.id)

      }
    },
  },
  {
    path: "/dogtinder/:id",
    element: <DogsTinder />,
    loader: async ({ params }) => {
      return fetch(import.meta.env.VITE_APP_SERVERURL + "Dogs/DogsForUser/" + params.id);
      // return fetch(import.meta.env.VITE_APP_SERVERURL + "Dogs");
    },
  },
  {
    path: "/dog/:dogId",
    element: <DogPage />,
    loader: async ({ params }) => {
      return fetch(import.meta.env.VITE_APP_SERVERURL + "Dogs/" + params.dogId);
    },
  },
  {
    path: "/favorites",
    element: <Favorites />,

  },
  {
    path: "/sendrequest",
    element: <SendRequest />,
    loader: async () => {
      let adopter = localStorage.getItem("adopter");
      return fetch(import.meta.env.VITE_APP_SERVERURL + "adopters/" + adopter);
    },
  },
];


//Employees Routes

// const DogsList = lazyLoad("../modules/Employees/DogsList");
// const EmpLogin = lazyLoad("../modules/Employees/EmpLogin");
// const EmpSignUp= lazyLoad("../modules/Employees/EmpSignUp");
// const DogsID = lazyLoad("../modules/Employees/DogsID");



export const employeesRoutes = [
  {
    path: "/employees",
    element: <EmpLogin />,
  },
  {
    path: "/employees/code",
    element: <EmpLoginCode />,
  },
  {
    path: "/employees/empsignup",
    element: <EmpSignUp />,
  },
  {
    path: "/employees/dogslist/:shelterId",
    element: <DogsList />,
    loader: async ({ params }) => {
      return fetch(import.meta.env.VITE_APP_SERVERURL + "cells/shelter/" + params.shelterId);
    },
  },
  {
    path: "/employees/dogsid/:dogId",
    element: <DogsId />,
    loader: async ({ params }) => {
      return fetch(import.meta.env.VITE_APP_SERVERURL + "Dogs/" + params.dogId);

    }
  },

]
