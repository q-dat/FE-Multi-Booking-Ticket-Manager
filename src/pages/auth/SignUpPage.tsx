import React from 'react';
import { Button, Input, Select } from 'react-daisyui';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import LabelForm from '../../components/auth/LabelForm';
import { Logo } from '../../assets/images';
import ServiceForm from '../../components/auth/ServiceForm';
import { RiArrowGoBackFill } from 'react-icons/ri';
const SignUpPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      {/* BackHome */}
      <div className="mt-0 inline-block w-full text-start text-primary md:mt-10">
        <Link to="/">
          <div className="flex items-center justify-start">
            <p className="mx-2 inline-block text-xl font-bold">
              <RiArrowGoBackFill />
            </p>
            <p className="inline-block text-xl font-bold">Về Trang Chủ</p>
          </div>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <img width={80} src={Logo} alt="" />
        <h1 className="block text-center text-2xl font-[600] text-primary">
          {t('Auth.signupTitle')}
        </h1>
      </div>
      <div className="mt-10">
        <form>
          <div className="flex w-full flex-col gap-5 xl:flex-row">
            <div className="flex flex-col space-y-10">
              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.usernameLabel')} />
                <Input
                  className="w-[350px] focus:outline-none xl:w-[300px]"
                  type="text"
                  placeholder={t('Auth.usernamePlaceholder')}
                  name="username"
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.fullNameLabel')} />
                <Input
                  className="w-[350px] focus:outline-none xl:w-[300px]"
                  type="text"
                  placeholder={t('Auth.fullNamePlaceholder')}
                  name="full_name"
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.emailLabel')} />
                <Input
                  className="w-[350px] focus:outline-none xl:w-[300px]"
                  type="email"
                  placeholder={t('Auth.emailPlaceholder')}
                  name="email"
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.phoneLabel')} />
                <Input
                  className="w-[350px] focus:outline-none xl:w-[300px]"
                  type="text"
                  placeholder={t('Auth.phonePlaceholder')}
                  name="phone"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-10">
              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.passwordLabel')} />
                <Input
                  className="w-[350px] focus:outline-none xl:w-[300px]"
                  type="password"
                  placeholder={t('Auth.passwordPlaceholder')}
                  name="password"
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.sexLabel')} />
                <Select className="focus:outline-none">
                  <option hidden defaultValue={1} value="">
                    {t('Auth.sexPlaceholder')}
                  </option>

                  <option>...</option>
                </Select>
              </div>

              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.imageLabel')} />
                <Input
                  className="p-[7px] focus:outline-none"
                  type="file"
                  name="image"
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <Button
                  type="submit"
                  color="primary"
                  className="mt-[27px] text-white"
                >
                  {t('Auth.submitButton')}
                </Button>
              </div>
            </div>
          </div>
        </form>
        <ServiceForm />
        <p className="my-5 text-center font-sub text-base font-[400] dark:text-white">
          {t('Auth.notAccount')}
          <NavLink className="text-primary" to="/auth/login">
            {t('Auth.loginLink')}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
