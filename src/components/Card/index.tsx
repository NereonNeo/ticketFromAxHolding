import { UtilTag } from '@/types/global.types';
import { Link } from 'react-router-dom';
import Tag from '../Tag';

type CardProps = {
  onClick: () => void;
  id: string;
  firstname: string;
  lastname: string;
  number: string;
  tag: UtilTag;
};
const Card = ({ firstname, lastname, number, tag, id }: CardProps) => {
  return (
    <Link className="m-2" to={`/contact/${id}`}>
      <div className="w-full flex justify-between items-center rounded p-2 shadow-2xl 	">
        <div className="flex flex-col pr-[190px] max-w-[50px] sm:(pr-[260px]) ">
          <h2 className="text-[18px] font-[500]">
            {firstname} <span>{lastname}</span>
          </h2>
          <p className="text-[12px]">{number}</p>
        </div>
        <Tag color={tag.color}>
          <p>{tag.text}</p>
        </Tag>
      </div>
    </Link>
  );
};

export default Card;
