import React from "react";
import { useRouter } from "next/router";

interface TeamsButtonComponentProps {
  name: string;
  members: number;
  description: string;
  id: string;
}

export let TeamsButtonComponent: React.FC<TeamsButtonComponentProps> = ({
  name,
  members,
  description,
  id,
}) => {
  let router = useRouter();
  return (
    <button
      className="flex flex-col w-full p-4 rounded-lg transition duration-200 ease-in-out bg-primary-800 hover:bg-primary-700"
      onClick={(e: any) => {
        e.preventDefault();
        router.push(`/t/${id}`);
      }}
    >
      <div className="flex justify-between w-full space-x-4">
        <div className="flex text-primary-100 font-bold leading-5 truncate w-full">
          <span className="inline truncate">{name}</span>
        </div>
        <div className="flex flex-shrink-0">
          <div className="text-primary-200 font-bold items-center">
            <div className="inline-block mr-2 w-2 h-2 rounded-full bg-accent"></div>
            {members}
          </div>
        </div>
      </div>
      <div className="w-full mt-2 flex">
        <div className="text-left break-all truncate whitespace-pre-wrap line-clamp-2 text-primary-300">
          {description}
        </div>
      </div>
      <div className="flex mt-4 space-x-2"></div>
    </button>
  );
};
