interface AvatarComponentProps {
  src: string;
}

export let AvatarComponent: React.FC<AvatarComponentProps> = ({ src }) => {
  return (
    <img
      className="rounded-full w-full h-full object-cover "
      src={src}
      alt="avatar"
    />
  );
};
