import { HeadComponent } from "../../../components/shared/HeadComponent";
import { GridComponent } from "../../../components/shared/GridComponent";
import { FooterComponent } from "../../../components/shared/FooterComponent";
import { HomeButtonComponent } from "./HomeButtonComponent";

export let ErrorPage: React.FC = () => {
  return (
    <>
      <HeadComponent title="Error 404" />
      <GridComponent className="grid-3">
        <div className="hidden sm:flex" />
        <div className="flex m-auto flex-col p-6 gap-5 bg-primary-800 sm:rounded-8 z-10 sm:w-400 w-full text-center">
          <span className="text-3xl text-primary-100 font-bold ">
            Error 404: Not Found
          </span>
          <div className="flex flex-col gap-4">
            <HomeButtonComponent />
          </div>
        </div>
        <FooterComponent />
      </GridComponent>
    </>
  );
};