import { useRouter } from "next/router";
import { HeadComponent } from "../../../components/shared";

export let Team = () => {
  const router = useRouter();
  const { tid } = router.query;

  return (
    <>
      <HeadComponent title={tid} />
      <p className="text-primary-100">TID: {tid}</p>
    </>
  );
};
