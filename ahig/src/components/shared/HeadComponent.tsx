import Head from "next/head";

interface HeadComponentProps {
  title: string | string[];
}

export let HeadComponent: React.FC<HeadComponentProps> = ({ title }) => {
  return (
    <Head>
      <title>{title} | BetterTeams</title>
    </Head>
  );
};
