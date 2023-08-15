import Create from '@assets/png/create.png';
import Delete from '@assets/png/delete.png';
import Update from '@assets/png/update.png';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  buttonType?: 'create' | 'update' | 'delete' | 'cancel';
}

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {}

const Button = ({ children, onClick, buttonType }: ButtonProps) => {
  switch (buttonType) {
    case 'create':
      return (
        <button
          onClick={onClick}
          className="pt-[5px] pb-[5px] pl-[30px] pr-[30px] rounded bg-green-300 flex items-center"
        >
          {children}

          <img
            className=" pl-[10px] w-[20px] h-[10px] object-cover"
            src={Create}
            alt=""
          />
        </button>
      );
    case 'update':
      return (
        <button
          onClick={onClick}
          className=" m-2 pt-[5px] pb-[5px] pl-[30px] pr-[30px] rounded bg-yellow-300 flex items-center"
        >
          {children}

          <img
            className=" pl-[10px] w-[20px] h-[10px] object-cover"
            src={Update}
            alt=""
          />
        </button>
      );
    case 'delete':
      return (
        <button
          onClick={onClick}
          className=" m-2 pt-[5px] pb-[5px] pl-[30px] pr-[30px] rounded bg-red-300 flex items-center"
        >
          {children}

          <img
            className=" pl-[10px] w-[20px] h-[10px] object-cover"
            src={Delete}
            alt=""
          />
        </button>
      );
    case 'cancel':
      return (
        <button
          onClick={onClick}
          className=" m-2 pt-[5px] pb-[5px] pl-[30px] pr-[30px] rounded bg-gray-300 flex items-center"
        >
          {children}
        </button>
      );

    default:
      return (
        <button
          onClick={onClick}
          className="w-full pt-[5px] pb-[5px] pl-[30px] pr-[30px] rounded bg-green-300"
        >
          {children}
        </button>
      );
  }
};

export default Button;
