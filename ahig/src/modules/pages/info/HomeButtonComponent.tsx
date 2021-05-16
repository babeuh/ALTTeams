import { useRouter } from "next/router";
export let HomeButtonComponent: React.FC = () => {
  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push("/", undefined);
  };
  return (
    <button
      className="flex outline-none px-6 rounded-lg text-button bg-primary-700 hover:bg-primary-600 disabled:text-primary-300 font-bold flex items-center justify-center justify-center text-base py-3 mt-2"
      onClick={handleClick}
    >
      <span className="flex items-center">Return Home</span>
    </button>
  );
};
