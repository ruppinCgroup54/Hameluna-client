import { Outlet, useLoaderData } from "react-router-dom";
import NavBarAdmin from "../../components/NavBarAdmin";



export default function Home() {
  const data = useLoaderData()
  console.log('data', data)
  return (
    <>
      <NavBarAdmin></NavBarAdmin>
      <Outlet/>
    </>
  );
}
