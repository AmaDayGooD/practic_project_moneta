import type { FC } from "react";
import AboutCompany from "./about-company/AboutCompany.tsx";
import OurPrinciples from "./our-principles/OurPrinciples.tsx";
import OurTools from "./our-tools/OurTools.tsx";
import OurAdvantages from "./our-advantages/OurAdvantages.tsx";
import AdmissionToTeam from "./admission-to-team/AdmissionToTeam.tsx";
import Banner from "./banner/Banner.tsx";

const TabAboutCompany: FC = () => {
  return (
    <>
      <AboutCompany />
      <OurPrinciples />
      <OurTools />
      <OurAdvantages />
      <AdmissionToTeam />
      <Banner/>
    </>
  );
};

export default TabAboutCompany;