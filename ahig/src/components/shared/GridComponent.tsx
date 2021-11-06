interface GridComponentProps {
  className?: string;
  children: any;
}

export const GridComponent: React.FC<GridComponentProps> = ({
  className,
  children,
}) => {
  const getClassNames = () => {
    let classes = "grid w-full h-full ";
    if (className) {
      classes += className;
    }
    return classes;
  };

  return <div className={getClassNames()}>{children}</div>;
};
