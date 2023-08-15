import Button from '@/components/Button';
import Card from '@/components/Card';
import Tag from '@/components/Tag';
import { useDebounce } from '@/hooks/debounce';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { filterContacts } from '@/store/reducers/ActionCreator';
import { contactSlice } from '@/store/reducers/ContactSlice';
import { TagType } from '@/types/global.types';
import axios from '@utils/http';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [tags, setTags] = useState<TagType[]>();
  const [search, setSearch] = useState<string>('');
  const dispatch = useAppDispatch();
  const debounced = useDebounce(search);

  useEffect(() => {
    dispatch(filterContacts(debounced));
  }, [debounced]);

  //! Getting tags from bakcend
  useEffect(() => {
    const getTags = async () => {
      dispatch(contactSlice.actions.handleLoading());
      const response = await axios.get<TagType[]>(`/contacts/tag`);
      setTags(response.data);
      dispatch(contactSlice.actions.handleLoadingEnd());
    };
    getTags();
  }, []);

  const { contacts } = useAppSelector((state) => state.contactReducer);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex justify-end p-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="search"
          className="block rounded-md border-0 pr-0 pl-1 mr-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:(ring-2 ring-inset ring-indigo-600) sm:(text-sm leading-6 mr-2 py-1.5 pl-4 pr-20)"
          placeholder="Search"
        />
        <Button buttonType="create">
          <Link to="/create">Create</Link>
        </Button>
      </div>
      <div className="w-full flex flex-wrap">
        {contacts.map((contact) => (
          <Card
            onClick={() => setSearch(contact.tag.text)}
            key={contact._id}
            firstname={contact.firstname}
            lastname={contact.lastname}
            id={contact._id}
            number={contact.phone}
            tag={contact.tag}
          />
        ))}
      </div>
      <div className="flex">
        {tags?.map((tag) => (
          <Tag
            key={tag._id.color}
            onClick={() => setSearch(tag._id.text)}
            color={tag._id.color}
          >
            {tag._id.text}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default Home;
