import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Logo,
  LogoFacebook,
  LogoMessenger,
  LogoZalo
} from '../../assets/images';
import { FaUsers } from 'react-icons/fa';

import { IoIosCloseCircle } from 'react-icons/io';
import { IoChatbubbleEllipsesOutline, IoPaperPlane } from 'react-icons/io5';
import { MdPhoneInTalk } from 'react-icons/md';
import { Textarea, Button } from 'react-daisyui';
import { useTranslation } from 'react-i18next';
import InputForm from './InputForm';

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  //Contact Form
  const [result, setResult] = React.useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);


  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setResult(t('UserPage.Sending'));

    const formData = new FormData(event.currentTarget);

    formData.append('access_key', 'ef25da04-c229-4ec0-9b44-9d92550e4351');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data: { success: boolean; message: string } = await response.json();

      if (data.success) {
        setResult(t('UserPage.Successfully'));

        // Reset form using formRef
        formRef.current?.reset();
      } else {
        console.error('Error', data);
        setResult(data.message);
      }
    } catch (error) {
      console.error('Request failed', error);
      setResult('There was an error submitting the form.');
    }
  };
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const dropdownContentRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (dropdownContentRef.current) {
      dropdownContentRef.current.style.maxHeight = isExpanded
        ? `${dropdownContentRef.current.scrollHeight}px`
        : '0';
    }
  }, [isExpanded]);

  return (
    <div className="fixed bottom-5 right-0 z-[99999] xl:right-2">
      <div className="flex w-full justify-end">
        <button
          onClick={toggleDropdown}
          className={`flex items-center rounded-full border border-white bg-primary py-[2px] pl-3 text-xs text-white ${isExpanded ? '' : 'hidden'}`}
        >
         {t('UserPage.CloseBtn')}
          <IoIosCloseCircle className="text-2xl" />
        </button>
        <button
          onClick={toggleDropdown}
          className={`relative flex items-center rounded-full border border-white bg-primary p-2 text-sm text-white ${isExpanded ? 'hidden' : ''}`}
        >
          <span className="animation-zoomBorder-Btn" />
          Chat <IoChatbubbleEllipsesOutline className="text-2xl" />
        </button>
      </div>
      <div
        ref={dropdownContentRef}
        className="dropdown-content overflow-hidden transition-[max-height] duration-300 ease-out"
        style={{
          maxHeight: isExpanded
            ? `${dropdownContentRef.current?.scrollHeight}px`
            : '0'
        }}
      >
        {/*  */}
        <div className="m-2 space-y-4 rounded-lg bg-white p-2 border border-primary">
          <div className="flex flex-row items-start justify-between">
            {/*  */}
            <div className="flex flex-row items-center gap-1 text-xl text-primary">
              <FaUsers />
              <p>{t('UserPage.TitleContactForm')}</p>
            </div>
            {/*  */}
            <div>
              <img
                src={Logo}
                className="h-12 w-12 rounded-full border object-cover"
                alt="7Teck"
              />
            </div>
          </div>
          <div>
            {/* Form */}
            <form
              ref={formRef}
              onSubmit={onSubmit}
              className="my-5 flex items-center justify-center rounded-xl bg-transparent"
            >
              <div className="flex flex-col gap-5 items-center justify-center ">
                <div className='space-y-2'>
                  <InputForm
                    name="email"
                    type="email"
                    placeholder={t('UserPage.Email')}
                    className="border border-black bg-white text-black  dark:shadow-none dark:shadow-white xs:w-[250px] sm:w-[300px] md:w-[650px] xl:w-[230px]"
                    classNameLabel="bg-white dark:peer-placeholder-shown:text-black dark:peer-focus:text-black"
                  />
                  <InputForm
                    name="name"
                    type="text"
                    className="border border-black bg-white text-black  dark:shadow-none dark:shadow-white xs:w-[250px] sm:w-[300px] md:w-[650px] xl:w-[230px]"
                    placeholder={t('UserPage.YourNameBtn')}
                    classNameLabel="bg-white dark:peer-placeholder-shown:text-black dark:peer-focus:text-black"
                  />
                </div>
                <Textarea
                  name="feedback"
                  className="border border-black bg-white pb-10 text-black  focus:outline-none dark:shadow-none dark:shadow-white xs:w-full sm:w-[300px] md:w-[650px] lg:w-full"
                  placeholder={t('UserPage.FeedbackBtn')}
                />
                <div className="w-full">
                  <Button
                  size='sm'
                    className="w-20 bg-primary text-sm text-white hover:bg-secondary outline outline-offset-1"
                    type="submit"
                  >
                    <IoPaperPlane /> {t('UserPage.SentBtn')}
                  </Button>
                  <span>{result}</span>
                </div>
              </div>
            </form>
          </div>
          <hr />
          {/*  */}
          <div className="flex justify-between">
            {/*  */}
            <div>
              <Link
                title="Hotline"
                target="_blank"
                to="tel:0333133050"
                rel="noopener noreferrer"
              >
                <div className="flex flex-row items-center gap-1">
                  <div className="rounded-full bg-primary p-2">
                    <MdPhoneInTalk className="text-2xl text-white" />
                  </div>
                  <div className="">
                    <p className="text-xs text-primary">Hotline:</p>
                    <p className="text-sm text-primary">0333133050</p>
                  </div>
                </div>
              </Link>
            </div>
            {/*  */}
            <div className="flex flex-row items-center gap-2">
              <Link
                title="Fanpage"
                target="_blank"
                to="https://www.messenger.com/t/quocdatstore.vn"
                rel="noopener noreferrer"
              >
                <img
                  src={LogoFacebook}
                  alt="fanpage"
                  width="40"
                  height="40"
                  className="rounded-full"
                />
              </Link>
              <Link
                title="Messenger"
                target="_blank"
                to="https://www.messenger.com/t/quocdatstore.vn"
                rel="noopener noreferrer"
              >
                <img
                  src={LogoMessenger}
                  alt="messenger"
                  width="40"
                  height="40"
                  className="rounded-full"
                />
              </Link>
              <Link
                title="Zalo"
                className="relative inline-block"
                target="_blank"
                to="https://zalo.me/0333133050"
                rel="noopener noreferrer"
              >
                <span className="animation-zoomBorder" />
                <img
                  src={LogoZalo}
                  alt="zalo"
                  width="40"
                  height="40"
                  className="rounded-full"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
