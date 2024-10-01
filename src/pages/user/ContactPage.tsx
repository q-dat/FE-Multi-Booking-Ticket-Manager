import React, { useRef } from 'react';
import InputForm from '../../components/UserPage/InputForm';
import { Button, Textarea } from 'react-daisyui';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { useTranslation } from 'react-i18next';

const ContactPage: React.FC = () => {
  //Translation
  const { t } = useTranslation();

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

  return (
    <div className="xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile="Liên Hệ" />
      <div className="my-4 text-center">
        <p className="w-full text-[40px] font-bold uppercase text-primary dark:text-white">
          {t('UserPage.ContactUs')}
        </p>
        <p className="font-semibold text-primary dark:text-white">
          {t('UserPage.Questions')}
        </p>
      </div>
      {/* Banner */}
      <div className="relative w-full">
        <img
          className="hidden h-[500px] w-full object-cover dark:block"
          src="https://static.vecteezy.com/system/resources/previews/004/941/847/original/cosmetic-background-for-product-branding-and-packaging-presentation-geometry-form-circle-molding-on-podium-stage-with-shadow-of-leaf-background-design-eps10-vector.jpg"
          alt=""
        />{' '}
        <img
          className="block h-[500px] w-full object-cover dark:hidden"
          src="https://static.vecteezy.com/system/resources/previews/009/731/085/non_2x/cosmetic-light-blue-background-minimal-and-premium-podium-display-for-product-presentation-branding-and-packaging-presentation-studio-stage-with-shadow-of-leaf-background-3d-illustration-design-vector.jpg"
          alt=""
        />
        {/*Contact Form */}
        <div className="absolute top-2 flex w-full flex-col items-center justify-center rounded-xl">
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="my-5 flex items-center justify-center rounded-xl border border-primary bg-white py-20 px-5 dark:bg-gray-500"
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
                <Textarea
                  name="feedback"
                  className="border border-gray-300 bg-white pb-20 text-black focus:border-primary focus:outline-none dark:bg-gray-700 dark:text-white xs:w-full sm:w-[350px] md:w-[650px] lg:w-full"
                  placeholder={t('UserPage.FeedbackBtn')}
                />
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
      </div>
    </div>
  );
};

export default ContactPage;
