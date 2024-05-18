import lazyLoad from "../utilis/LazyLoad";

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

export const pathes = [
  {
    path: "/admin/shelter/",
    element: <ControlPage/>,
    id:"דף הבית"
  },
  {
    path: "/admin/shelter/whosHome/",
    element: <WhosHome/>,
    id: "מי בבית"
  },
  {
    path: "/admin/shelter/whosHome/",
    element: <WhosHome />,
    id: "משימות"
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
    element: <LogInPage/>,
  },
  {
    //register
  },
  {
    path: "/admin/shelter",
    element: <SystemPage/>,
    id: "כלבייה",
    loader: async () => {
      return fetch(`${import.meta.env.VITE_APP_SERVERURL}Cells/shelter/1`);
    },
    children:pathes,
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
    element: <AdoptersHomePage/>,
  },
  {
    path: "/dogbot",
    element: <ChatBot/>,
  },
  {
    path: "/dogtinder",
    element: <DogsTinder/>,
    loader: async () => {
      return fetch(import.meta.env.VITE_APP_SERVERURL + "Dogs");
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
    path: "/sendrequest/dogId/:dogId/dogName/:dogName",
    element: <SendRequest />,
    loader: async () => {
      let adopter = localStorage.getItem("adopter");
      return fetch(import.meta.env.VITE_APP_SERVERURL + "adopters/" + adopter);
    },
  },
];


//Employees Routes

const DogsCardPage = lazyLoad("../modules/Employees/DogsCardPage");
const EmpLogin = lazyLoad("../modules/Employees/EmpLogin")


export const employeesRoutes=[
  {
    path: "/employees",
    element: <EmpLogin/>,
  },
  {
      path: "/employees/dogslist",
      element: <DogsCardPage/>,
    },
    
  ]
