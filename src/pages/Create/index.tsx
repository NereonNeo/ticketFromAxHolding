import Button from '@/components/Button';
import { useAppDispatch } from '@/hooks/redux';
import { addContact } from '@/store/reducers/ActionCreator';
import { contactSlice } from '@/store/reducers/ContactSlice';
import { TagType } from '@/types/global.types';
import axios from '@utils/http';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface IFormInput {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  tag: TagType;
}

const Create = () => {
  const [tags, setTags] = useState<TagType[]>();
  const [open, setOpen] = useState<boolean>(false);
  const [customTag, setCustomTag] = useState<TagType>({
    _id: {
      text: '',
      color: '',
    },
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<IFormInput>();

  //! Updating object and dispatch to create contact
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const parseTag = JSON.parse(Object(data.tag));
    const modObj = {
      ...data,
      tag: parseTag._id,
    };
    console.log(modObj);
    await dispatch(addContact(modObj));
    return navigate('/');
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

  //! Add custom tag to the list
  const addCustomTag = () => {
    setTags((prev) => prev && [...prev, customTag]);
    setOpen(false);
  };

  //! Add text to the custom tag
  const addCustomText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTag(
      (prev) =>
        prev && {
          ...prev,
          _id: { text: e.target.value, color: '' },
        }
    );
  };

  //! Add color to the custom tag
  const AddCustomColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTag(
      (prev) =>
        prev && {
          ...prev,
          _id: { color: e.target.value, text: prev._id.text },
        }
    );
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contact Page
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Add your contact here
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                {...register('firstname', { required: true })}
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                {...register('lastname', {
                  pattern: /^[A-Za-z]+$/i,
                  required: true,
                })}
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                {...register('email', {
                  required: true,
                })}
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone number
            </label>
            <div className="relative mt-2.5">
              <input
                {...register('phone', {
                  required: true,
                  pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                })}
                type="number"
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <h2
              onClick={() => setOpen(!open)}
              className="block text-sm font-semibold leading-6 text-gray-900 cursor-pointer underline"
            >
              Need to add tag ?
            </h2>
            {open && (
              <>
                <div className="flex my-2">
                  <input
                    onChange={(e) => addCustomText(e)}
                    type="text"
                    className="block w-[80%]  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <input
                    onChange={(e) => AddCustomColor(e)}
                    type="color"
                    className="block w-[20%] h-[40px] ml-1  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <Button onClick={addCustomTag}>Add tag</Button>
              </>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="tag"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Choose or tag
            </label>

            <div className="relative mt-2.5">
              <select
                {...register('tag')}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 dark:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              >
                {tags?.map((tag: TagType, index: number) => {
                  return (
                    <option key={index} value={JSON.stringify(tag)}>
                      {tag._id.text}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Button onClick={handleSubmit(onSubmit)}>Create contact</Button>
        </div>
      </div>
    </div>
  );
};

export default Create;
