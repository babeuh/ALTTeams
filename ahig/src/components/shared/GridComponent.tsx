interface GridComponentProps {
  className?: string;
  children: any;
}

export let GridComponent: React.FC<GridComponentProps> = ({
  className,
  children,
}) => {
  let getClassNames = () => {
    let classes = "grid w-full h-full ";
    if (className) {
      classes += className;
    }
    return classes;
  };

  return <div className={getClassNames()}>{children}</div>;
};
