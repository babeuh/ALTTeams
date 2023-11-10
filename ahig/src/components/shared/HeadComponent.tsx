import Head from "next/head";

interface HeadComponentProps {
  title: string | string[];
}

export const HeadComponent: React.FC<HeadComponentProps> = ({ title }) => {
  return (
    <Head>
      <title>{title} | ALTTeams</title>
    </Head>
  );
};
