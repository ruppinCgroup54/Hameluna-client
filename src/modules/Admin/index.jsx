import { Outlet } from "react-router-dom";
import NavBarAdmin from "../../components/NavBarAdmin";

export default function Home() {
  return (
    <>
      <NavBarAdmin></NavBarAdmin>
      <Outlet/>
    </>
  );
}
