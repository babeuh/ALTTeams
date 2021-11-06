interface AvatarComponentProps {
  src: string;
}

export const AvatarComponent: React.FC<AvatarComponentProps> = ({ src }) => {
  return (
    // eslint-disable-next-line
    <img
      className="rounded-full w-full h-full object-cover "
      src={src}
      alt="avatar"
      width={80}
      height={80}
    />
  );
};
