interface FooterComponentProps {
  children?: any;
}

export const FooterComponent: React.FC<FooterComponentProps> = ({ children }) => {
  return (
    <div className="flex flex-row absolute bottom-0 w-full justify-between px-5 py-5 mt-auto items-center sm:px-7">
      {children}
    </div>
  );
};
