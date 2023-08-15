import Button from '@/components/Button';
import Tag from '@/components/Tag';
import { useAppDispatch } from '@/hooks/redux';
import { deleteContact, updateContact } from '@/store/reducers/ActionCreator';
import { contactSlice } from '@/store/reducers/ContactSlice';
import { IContactStore } from '@/types/global.interfaces';
import { TagType } from '@/types/global.types';
import axios from '@utils/http';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Contact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState<IContactStore>();
  const [tempContact, setTempContact] = useState<IContactStore>();
  const [changed, setChanged] = useState<Boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [tags, setTags] = useState<TagType[]>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getSingleContact = async () => {
      dispatch(contactSlice.actions.handleLoading());
      const response = await axios.get<IContactStore>(`/contacts/get/${id}`);
      setContact(response.data);
      setTempContact(response.data);
      dispatch(contactSlice.actions.handleLoadingEnd());
    };
    getSingleContact();
  }, []);

  const saveChanges = async () => {
    if (tempContact) dispatch(updateContact(tempContact));
    setContact(tempContact);
    setChanged(false);
    setOpen(false);
  };

  const delContact = async () => {
    if (id) dispatch(deleteContact(id));
    return navigate('/');
  };

  const cancelChanges = () => {
    setTempContact(contact && { ...contact });
    setChanged(false);
    setOpen(false);
  };

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

  return (
    <div className="m-5">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Contact Information Of {contact?.firstname}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          You can change contact by just clicking to the information
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Name:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="price"
                id="price"
                value={tempContact?.firstname}
                onChange={(e) => {
                  setChanged(true);
                  setTempContact(
                    (prev) => prev && { ...prev, firstname: e.target.value }
                  );
                }}
                className="block	py-1.5 pl-2 pr-20 text-gray-900  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Surename:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                value={tempContact?.lastname}
                onChange={(e) => {
                  setChanged(true);
                  setTempContact(
                    (prev) => prev && { ...prev, lastname: e.target.value }
                  );
                }}
                className="block	py-1.5 pl-2 pr-20 text-gray-900  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                value={tempContact?.email}
                onChange={(e) => {
                  setChanged(true);
                  setTempContact(
                    (prev) => prev && { ...prev, email: e.target.value }
                  );
                }}
                className="block	py-1.5 pl-2 pr-20 text-gray-900  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Phone:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                type="number"
                value={tempContact?.phone}
                pattern="[0-9]*"
                onChange={(e) => {
                  setChanged(true);
                  setTempContact(
                    (prev) => prev && { ...prev, phone: e.target.value }
                  );
                }}
                className="block	py-1.5 pl-2 pr-20 text-gray-900  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:(text-sm leading-6 pr-0)"
              />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Tag:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <Tag
                onClick={() => setOpen(!open)}
                color={tempContact?.tag.color}
              >
                {tempContact?.tag.text}
              </Tag>
              {open && (
                <select
                  onChange={(e) => {
                    setChanged(true),
                      setTempContact(
                        (prev) =>
                          prev && {
                            ...prev,
                            tag: JSON.parse(e.target.value)._id,
                          }
                      );
                  }}
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 dark:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                >
                  {tags?.map((tag: TagType, index: number) => {
                    return (
                      <option
                        selected={tag._id.text === tempContact?.tag.text}
                        key={index}
                        value={JSON.stringify(tag)}
                      >
                        {tag._id.text}
                      </option>
                    );
                  })}
                </select>
              )}
            </dd>
          </div>
        </dl>
      </div>
      <div className="w-full flex justify-between flex-wrap">
        <Button onClick={delContact} buttonType="delete">
          Delete
        </Button>
        {changed && (
          <>
            <Button buttonType="update" onClick={saveChanges}>
              Update
            </Button>
            <Button onClick={cancelChanges} buttonType="cancel">
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Contact;
