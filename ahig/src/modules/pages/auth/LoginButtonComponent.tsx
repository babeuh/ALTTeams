interface LoginButtonComponentProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export let LoginButtonComponent: React.FC<LoginButtonComponentProps> = ({
  onClick,
  type,
}) => {
  return (
    <button
      className="flex outline-none px-6 rounded-lg text-button bg-primary-700 hover:bg-primary-600 disabled:text-primary-300 font-bold flex items-center justify-center justify-center text-base py-3 mt-2"
      onClick={onClick}
      type={type}
    >
      <span className="flex items-center">Login</span>
    </button>
  );
};
