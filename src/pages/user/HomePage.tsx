import React, { useEffect, useRef, useState } from 'react';
import { Button, Select } from 'react-daisyui';
import InputForm from '../../components/UserPage/InputForm';
import { IoLocationOutline, IoSearch } from 'react-icons/io5';
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import {
  Hue,
  Vinh,
  HaNoi,
  DaNang,
  ThanhHoa,
  NinhBinh,
  sectionOne,
  sectionTwo,
  sectionThree,
  Banner,
  BannerFlight
} from '../../assets/image-represent';
import { useTranslation } from 'react-i18next';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link, useLocation } from 'react-router-dom';
import { ILocation } from '../../types/location/location';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
interface Card {
  id?: number;
  title?: string;
  description?: string;
  image?: string;
}

const Home: React.FC<Card> = () => {
  //Translation
  const { t } = useTranslation();
  //anchorForm
  const anchorForm = useLocation();
  useEffect(() => {
    if (location.hash === '#contact') {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [anchorForm.hash]);
  // Naviga Active
  const [activeItem, setActiveItem] = useState('Hà Nội');
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.split('/').pop();
    const foundItem = FecthLocation.find(item => item.name === pathname);
    if (foundItem) {
      setActiveItem(foundItem.name);
    }
  }, [location.pathname]);
  //Contact Form
  const [result, setResult] = React.useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setResult('Sending....');

    const formData = new FormData(event.currentTarget);

    formData.append('access_key', 'ef25da04-c229-4ec0-9b44-9d92550e4351');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data: { success: boolean; message: string } = await response.json();

      if (data.success) {
        setResult('Form Submitted Successfully');

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
  const FecthLocation: ILocation[] = [
    {
      name: 'Hà Nội',
      _id: ''
    },
    {
      name: 'Ninh Bình',
      _id: ''
    },
    {
      name: 'Thanh Hoá',
      _id: ''
    },
    {
      name: 'Vinh',
      _id: ''
    },
    {
      name: 'Đà Nẵng',
      _id: ''
    },
    {
      name: 'Huế',
      _id: ''
    }
  ];
  const [value, setValue] = useState('default');

  // Sử dụng useRef với kiểu HTMLDivElement
  const scrollRef = useRef<HTMLDivElement>(null);

  // Danh sách các thẻ card
  const cards: Card[] = [
    {
      id: 1,
      title: 'Card 1',
      description: 'Description for Card 1',
      image: `${HaNoi}`
    },
    {
      id: 2,
      title: 'Card 2',
      description: 'Description for Card 2',
      image: `${HaNoi}`
    },
    {
      id: 3,
      title: 'Card 3',
      description: 'Description for Card 3',
      image: `${HaNoi}`
    },
    {
      id: 4,
      title: 'Card 4',
      description: 'Description for Card 4',
      image: `${HaNoi}`
    },
    {
      id: 5,
      title: 'Card 5',
      description: 'Description for Card 5',
      image: `${HaNoi}`
    }
  ];

  // Hàm cuộn theo hướng
  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };
  return (
    <div className="pb-[20px] xl:pt-[80px]">
      {/* Mobile */}
      <div>
        <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
      </div>
      {/* Banner */}
      <div className="relative">
        <div className="absolute bottom-0 left-2 top-[50%] md:bottom-4 md:top-[30%] xl:left-[20%] xl:top-[40%]">
          <p className="bg-gradient-to-r from-white to-white bg-clip-text text-[25px] font-bold text-transparent dark:from-primary dark:to-gray-100 md:text-[40px]">
            {t('UserPage.BannerTitle')}
          </p>
          <p className="bg-gradient-to-r from-white to-white bg-clip-text text-[15px] font-light text-transparent dark:from-primary dark:to-primary">
            {t('UserPage.BannerSubtitle')}
          </p>
        </div>
        {/* Banner IMG */}
        <div>
          <img
            src={BannerFlight}
            className="hidden w-full xl:block dark:xl:hidden"
            alt="Banner"
          />
          <img
            src={Banner}
            className="hidden w-full dark:xl:block"
            alt="Banner"
          />
          <img
            className="block h-[150px] w-full object-cover xl:hidden"
            src={Banner}
            alt="Banner"
          />
        </div>
      </div>
      {/* Form */}
      <form>
        <div className="relative top-1 flex flex-grow items-center justify-center px-2 pb-10 pt-5 md:-top-3 md:pt-0 xl:-top-10 xl:px-0">
          <div className="flex flex-col rounded-lg border border-secondary border-opacity-50 bg-white p-3 shadow-headerMenu dark:bg-gray-700 md:p-10 xl:flex-row xl:px-10 xl:py-8">
            {/* Form Mobile 1 */}
            <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
              <InputForm
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-r-none"
                type={'text'}
                placeholder={`${t('UserPage.DeparturePlaceholder')}`}
                classNameLabel=" bg-white  dark:bg-gray-700"
              />
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
              <InputForm
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                type={'text'}
                placeholder={`${t('UserPage.DestinationPlaceholder')}`}
                classNameLabel=" bg-white  dark:bg-gray-700"
              />
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
            </div>
            {/* Form Mobile 2 */}
            <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
              {' '}
              <InputForm
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                type={'date'}
                placeholder={`${t('UserPage.DepartureDatePlaceholder')}`}
                classNameLabel=" bg-white  dark:bg-gray-700"
              />
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
              <InputForm
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                type={'date'}
                placeholder={`${t('UserPage.ReturnDatePlaceholder')}`}
                classNameLabel=" bg-white  dark:bg-gray-700"
              />{' '}
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
            </div>
            {/* Form Mobile 3 */}
            <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
              <div>
                <Select
                  className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-l-none"
                  value={value}
                  onChange={event => setValue(event.target.value)}
                >
                  <option value={'default'} disabled>
                    {t('UserPage.AgeSelectDefault')}
                  </option>
                  <option value={'Người Nhỏ'}>Người Nhỏ</option>
                  <option value={'Người Vừa'}>Người Vừa</option>
                  <option value={'Người Lớn'}>Người Lớn</option>
                </Select>
              </div>
              <div>
                <Button className="w-[150px] bg-primary text-sm text-white hover:border-primary hover:bg-white hover:text-primary dark:hover:bg-gray-700 md:w-[300px] lg:w-[400px] xl:ml-3 xl:w-full">
                  <IoSearch />
                  {t('UserPage.SearchButton')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Section */}
      <div className="flex flex-col items-center justify-center px-2 md:flex-row md:gap-20 xl:px-[100px]">
        <div className="flex w-full flex-col items-center justify-center xs:px-2 sm:px-0">
          <img width={300} src={sectionOne} alt="" />
          <p className="text-xl font-bold text-primary dark:text-white">
            {t('UserPage.SectionOneTitle')}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t('UserPage.SectionOneDescription')}
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center xs:px-2 sm:px-0">
          <img width={300} src={sectionTwo} alt="" />
          <p className="text-xl font-bold text-primary dark:text-white">
            {t('UserPage.SectionTwoTitle')}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t('UserPage.SectionTwoDescription')}
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center xs:px-2 sm:px-0">
          <img width={300} src={sectionThree} alt="" />
          <p className="text-xl font-bold text-primary dark:text-white">
            {t('UserPage.SectionThreeTitle')}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t('UserPage.SectionThreeDescription')}
          </p>
        </div>
      </div>
      {/*Contact Form */}
      <div
        id="contact"
        className="flex w-full flex-col items-center justify-center rounded-xl pt-[100px]"
      >
        <p className="text-[40px] font-bold uppercase text-primary dark:text-white">
          Liên hệ với chúng tôi
        </p>
        <p className="font-semibold text-primary dark:text-white">
          Với bất kì câu hỏi nào? Hãy để lại tin nhắn để được giải đáp thắc mắc.
        </p>
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="my-5 flex items-center justify-center rounded-xl border border-primary bg-white p-5 dark:bg-gray-500"
        >
          <div className="flex w-1/2 items-center justify-center">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-5 xl:flex-row">
                <InputForm
                  name="email"
                  type="email"
                  placeholder={t('UserPage.Email')}
                  className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[500px]"
                  classNameLabel="bg-white dark:bg-gray-700"
                />
                <InputForm
                  name="name"
                  type="text"
                  className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[300px]"
                  placeholder={t('UserPage.YourNameBtn')}
                  classNameLabel="bg-white dark:bg-gray-700"
                />
              </div>
              <div className="w-full">
                <Button
                  className="w-full bg-primary text-sm text-white hover:border-primary hover:bg-secondary hover:text-white dark:hover:bg-gray-700"
                  type="submit"
                >
                  {t('UserPage.SentBtn')}
                </Button>
                <span>{result}</span>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Grid IMG */}
      <div className="mt-10 grid grid-cols-1 gap-3 px-2 md:grid-cols-3 xl:grid-cols-4 xl:px-[100px]">
        {/*  */}
        <div className="relative overflow-hidden rounded-lg">
          <Link to="">
            <img
              className="h-[200px] w-full cursor-pointer object-cover transition-transform duration-1000 ease-in-out hover:scale-125"
              src={HaNoi}
              alt="HaNoi"
            />
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-semibold text-primary">
              <IoLocationOutline className="text-xl text-[#f7aaab]" />
              {t('UserPage.Location.HaNoi')}
            </span>
          </Link>
        </div>
        {/*  */}
        <div className="relative overflow-hidden rounded-lg">
          <Link to="">
            <img
              className="h-[200px] w-full cursor-pointer object-cover transition-transform duration-1000 ease-in-out hover:scale-125"
              src={NinhBinh}
              alt="NinhBinh"
            />
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-semibold text-primary">
              <IoLocationOutline className="text-xl text-[#f7aaab]" />
              {t('UserPage.Location.NinhBinh')}
            </span>
          </Link>
        </div>
        {/*  */}
        <div className="relative overflow-hidden rounded-lg xl:col-span-2 xl:w-full">
          <Link to="">
            <img
              className="h-[200px] w-full cursor-pointer object-cover transition-transform duration-1000 ease-in-out hover:scale-125"
              src={ThanhHoa}
              alt="ThanhHoa"
            />
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-semibold text-primary">
              <IoLocationOutline className="text-xl text-[#f7aaab]" />
              {t('UserPage.Location.ThanhHoa')}
            </span>
          </Link>
        </div>
        {/*  */}
        <div className="relative overflow-hidden rounded-lg xl:col-span-2 xl:w-full">
          <Link to="">
            <img
              className="h-[200px] w-full cursor-pointer object-cover transition-transform duration-1000 ease-in-out hover:scale-125"
              src={Vinh}
              alt="Vinh"
            />
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-semibold text-primary">
              <IoLocationOutline className="text-xl text-[#f7aaab]" />
              {t('UserPage.Location.Vinh')}
            </span>
          </Link>
        </div>
        {/*  */}
        <div className="relative overflow-hidden rounded-lg">
          <Link to="">
            <img
              className="h-[200px] w-full cursor-pointer object-cover transition-transform duration-1000 ease-in-out hover:scale-125"
              src={DaNang}
              alt="DaNang"
            />
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-semibold text-primary">
              <IoLocationOutline className="text-xl text-[#f7aaab]" />
              {t('UserPage.Location.DaNang')}
            </span>
          </Link>
        </div>
        {/*  */}
        <div className="relative overflow-hidden rounded-lg">
          <Link to="">
            <img
              className="h-[200px] w-full cursor-pointer object-cover transition-transform duration-1000 ease-in-out hover:scale-125"
              src={Hue}
              alt="Hue"
            />
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-semibold text-primary">
              <IoLocationOutline className="text-xl text-[#f7aaab]" />
              {t('UserPage.Location.Hue')}
            </span>
          </Link>
        </div>
      </div>
      {/* Location */}
      <div className="px-2 xl:px-[100px]">
        <div className="my-5 font-bold text-primary dark:text-white">
          {t('UserPage.TicketPrice')}
        </div>
        <div className="grid grid-cols-2 gap-2 xl:grid-flow-col xl:grid-cols-none xl:grid-rows-1">
          {FecthLocation.map(item => (
            <Button
              key={item._id}
              className={`flex w-full items-center justify-center transition-all duration-500 ease-in-out hover:rounded-badge hover:bg-secondary hover:text-white ${
                item.name === activeItem
                  ? 'bg-primary text-white hover:bg-primary hover:text-white'
                  : 'bg-white text-primary'
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              <span>{item.name}</span>
            </Button>
          ))}
        </div>

        {/* Card */}
        <div className="my-5">
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cards.map(card => (
              <div
                key={card.id}
                className="w-full flex-none transform overflow-hidden rounded-lg bg-white text-black shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-secondary hover:text-white sm:w-80"
              >
                <img
                  className="h-48 w-full object-cover"
                  src={card.image}
                  alt={card.title}
                />
                <div className="p-4">
                  <p className="mb-2 truncate text-lg font-semibold">
                    {card.title}
                  </p>
                  <p className="mb-4 line-clamp-2 text-sm">
                    {card.description}
                  </p>
                  <Button
                    className="w-full bg-primary font-light text-white hover:border-primary hover:bg-white hover:font-bold hover:text-primary"
                    aria-label={`View details for ${card.title}`}
                  >
                    {t('UserPage.Details')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {/* Navigation Button  */}
          <div className="flex w-full items-center justify-between space-x-2">
            <Button
              onClick={() => scroll(-200)}
              className="text-primary dark:text-white"
              aria-label="Scroll left"
            >
              <FaChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => scroll(200)}
              className="text-primary dark:text-white"
              aria-label="Scroll right"
            >
              <FaChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default Home;

