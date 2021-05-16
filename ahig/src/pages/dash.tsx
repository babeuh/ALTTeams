import { GetServerSideProps } from "next";

import { DashPage } from "../modules/pages/dashboard/DashPage";

export default DashPage;

export let getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};
