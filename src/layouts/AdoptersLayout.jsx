import BackgroundLayout from "../layouts/BackgroundLayout";
import TopBarMobile from "../components/TopBarMobile";


import WebsiteBackgroud from '../assets/images/Layouts//background.png'


export default function AdoptersLayout({children}) {
  return (
    <BackgroundLayout image={WebsiteBackgroud} dir={"col"}>
      <TopBarMobile />
      {children}
    </BackgroundLayout>
  );
}
