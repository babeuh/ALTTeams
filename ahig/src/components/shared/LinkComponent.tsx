import { useRouter } from "next/router";

interface LinkComponentProps {
  href: string;
  children?: any;
  className?: string;
}

export const LinkComponent: React.FC<LinkComponentProps> = ({
  href,
  children,
  className,
}) => {
  const router = useRouter();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    router.push(href, undefined);
  };
  const getClassName = () => {
    const def = "text-accent hover:underline";
    if (className !== undefined) {
      return className;
    }
    return def;
  };

  return (
    <a
      href={href}
      onClick={(e) => handleClick(e, href)}
      className={getClassName()}
    >
      {children}
    </a>
  );
};
