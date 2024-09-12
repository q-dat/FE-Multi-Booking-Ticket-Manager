import React from 'react';
import { Button, Input, Select } from 'react-daisyui';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import LabelForm from '../../components/auth/LabelForm';
import { Logo } from '../../assets/images';
import ServiceForm from '../../components/auth/ServiceForm';

const SignUpPage: React.FC = () => {
  // Translation
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <img width={80} src={Logo} alt="" />
        <h1 className="block text-center text-2xl font-[600] text-primary">
          {t('Auth.Register')}
        </h1>
      </div>
      <div className="mt-10">
        <form>
          <div className="flex w-full flex-col gap-5 md:flex-row">
            <div className="flex flex-col space-y-4">
              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.LabelForm.username')} />
                <Input
                  className="w-[350px] focus:outline-none xl:w-[300px]"
                  type="text"
                  placeholder={t('Auth.Placeholder.username')}
                  name="username"
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.LabelForm.fullname')} />
                <Input
                  className="w-[350px] focus:outline-none xl:w-[300px]"
                  type="text"
                  placeholder={t('Auth.Placeholder.fullname')}
                  name="full_name"
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.LabelForm.email')} />
                <Input
                  className="w-[350px] focus:outline-none xl:w-[300px]"
                  type="email"
                  placeholder={t('Auth.Placeholder.email')}
                  name="email"
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.LabelForm.phone')} />
                <Input
                  className="w-[350px] focus:outline-none xl:w-[300px]"
                  type="text"
                  placeholder={t('Auth.Placeholder.phone')}
                  name="phone"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.LabelForm.password')} />
                <Input
                  className="w-[350px] focus:outline-none xl:w-[300px]"
                  type="password"
                  placeholder={t('Auth.Placeholder.password')}
                  name="password"
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.LabelForm.sex')} />
                <Select className="w-[350px] focus:outline-none xl:w-[300px]">
                  <option hidden defaultValue={1} value="">
                    {t('Auth.Placeholder.sex')}
                  </option>

                  <option>...</option>
                </Select>
              </div>

              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.LabelForm.avatar')} />
                <Input
                  className="w-[350px] p-[7px] focus:outline-none xl:w-[300px]"
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
                  {t('Auth.Register')}
                </Button>
              </div>
            </div>
          </div>
        </form>
        <ServiceForm />
        <p className="my-5 text-center font-sub text-base font-[400]">
          {t('Auth.CreateAccount')} &nbsp;{' '}
          <NavLink className="text-primary" to="/auth/login">
            {t('Auth.Login')}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
