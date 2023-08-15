import React from 'react';

type TagProps = {
  color: string | undefined;
  onClick?: () => void;
  children: React.ReactNode;
};

const Tag = ({ children, color = '#fff', onClick }: TagProps) => {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={`rounded-full m-1 pt-[5px] pb-[5px] pl-[20px] pr-[20px] text-[14px] flex items-center justify-center max-w-[100px] cursor-pointer`}
    >
      {children}
    </div>
  );
};

export default Tag;
