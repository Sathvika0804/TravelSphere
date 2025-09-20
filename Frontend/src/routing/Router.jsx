import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home"; 
import HillStations from "../components/HillStations";
import PackageDetails from "../components/PackageDetails";
import SignIn from "../components/SignIn";
import AdventurePackage from "../components/AdventurePackage";
import PilgrimagePackage from "../components/PilgrimagePackages";
import DestinationPlaces from "../components/DestinationPlaces";
import InternationalPackage from "../components/InternationalPackage";
import Profile from "../components/Profile";
import BookingsPage from "../components/BookingsPage";
import PlaceDetails from "../components/PlaceDetails";
import IslandsPackage from "../components/IslandsPackage";
import IslandPlaces from "../components/IslandPlaces";
import SignUp from "../components/SignUp";

let routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,  // ✅ default route
        element: <Home />,
      },
      {
        path: "/category/hill-station",
        element: <HillStations />,
      },
      {
        path: "/packages/:id",
        element: <PackageDetails />,
      },
      {
        path: "/bookings",
        element: <BookingsPage></BookingsPage>,
      },
      {
        path: "/category/adventure",
        element: <AdventurePackage />,
      },
      {
        path: "/category/pilgrimage",
        element: <PilgrimagePackage />,
      },
      {
        path : "/category/islands",
        element : <IslandsPackage></IslandsPackage>
      },
      {
        path: "/category/islands/:island",
        element: <IslandPlaces />
      },
      {
        path: "/category/international",
        element: <InternationalPackage />,
      },
      {
        path: "/category/international/:destination",
        element: <DestinationPlaces />,
      },
      {
        path: "/destination/:destination/:placeName",
        element: <PlaceDetails />,
      },
      {
        path: "/signin",
        element : <SignIn />,
      },
      {
        path: "/signup",
        element : <SignUp></SignUp>
      },
      {
        path : "/profile",
        element : <Profile></Profile>
      },
      {
        path: "*",
        element: <h2>404 - Page Not Found</h2>,
      },
    ],
  },
]);

export default routes;
