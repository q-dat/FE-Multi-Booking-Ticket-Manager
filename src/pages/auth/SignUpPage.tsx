import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select } from 'react-daisyui';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import LabelForm from '../../components/auth/LabelForm';
import { Logo } from '../../assets/images';
import ServiceForm from '../../components/auth/ServiceForm';
import HeaderAuth from '../../components/auth/HeaderAuth';
import { BannerLogin } from '../../assets/image-represent';
import { useAuth } from '../../context/AuthContext';

const SignUpPage: React.FC = () => {
  const { t } = useTranslation();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await registerUser(data);
      alert('Đăng ký thành công!');
      navigate("/login")
    } catch (error) {
      console.error('Đăng ký thất bại', error);
      alert('Đăng ký thất bại!');
    }
  };

  return (
    <div className="xl:flex xl:flex-row xl:items-center xl:justify-center">
      <HeaderAuth Title_NavbarMobile={t('Auth.Register')} />
      <div className="flex w-full flex-col items-center justify-center xl:w-1/2">
        <div>
          <h1 className="hidden text-center text-[40px] font-[600] text-primary xl:block">
            {t('Auth.Register')}
          </h1>
          <img className="w-[180px] xl:hidden xl:w-[120px]" src={Logo} alt="" />
        </div>
        <div className="mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full flex-col gap-5 md:flex-row">
              <div className="flex flex-col space-y-4">
                <div className="flex w-full flex-col gap-1">
                  <LabelForm title={t('Auth.LabelForm.username')} />
                  <Input
                    className="w-[350px] focus:outline-none xl:w-[300px]"
                    type="text"
                    placeholder={t('Auth.Placeholder.username')}
                    {...register('username', { required: true })}
                  />
                  {errors.username && <span className="text-red-500">{t('Auth.Errors.usernameRequired')}</span>}
                </div>

                <div className="flex w-full flex-col gap-1">
                  <LabelForm title={t('Auth.LabelForm.fullname')} />
                  <Input
                    className="w-[350px] focus:outline-none xl:w-[300px]"
                    type="text"
                    placeholder={t('Auth.Placeholder.fullname')}
                    {...register('fullName', { required: true })}
                  />
                  {errors.fullName && <span className="text-red-500">{t('Auth.Errors.fullnameRequired')}</span>}
                </div>

                <div className="flex w-full flex-col gap-1">
                  <LabelForm title={t('Auth.LabelForm.email')} />
                  <Input
                    className="w-[350px] focus:outline-none xl:w-[300px]"
                    type="email"
                    placeholder={t('Auth.Placeholder.email')}
                    {...register('email', { required: true })}
                  />
                  {errors.email && <span className="text-red-500">{t('Auth.Errors.emailRequired')}</span>}
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="flex w-full flex-col gap-1">
                  <LabelForm title={t('Auth.LabelForm.phone')} />
                  <Input
                    className="w-[350px] focus:outline-none xl:w-[300px]"
                    type="text"
                    placeholder={t('Auth.Placeholder.phone')}
                    {...register('phone', { required: true })}
                  />
                  {errors.phone && <span className="text-red-500">{t('Auth.Errors.phoneRequired')}</span>}
                </div>
                <div className="flex w-full flex-col gap-1">
                  <LabelForm title={t('Auth.LabelForm.password')} />
                  <Input
                    className="w-[350px] focus:outline-none xl:w-[300px]"
                    type="password"
                    placeholder={t('Auth.Placeholder.password')}
                    {...register('password', { required: true })}
                  />
                  {errors.username && <span className="text-red-500">{t('Auth.Errors.passwordRequired')}</span>}
                </div>
                <div className="flex w-full flex-col gap-1">
                  <LabelForm title={t('Auth.LabelForm.sex')} />
                  <Select
                    className="w-[350px] focus:outline-none xl:w-[300px]"
                    {...register('gender', { required: true })}
                  >
                    <option hidden value="">
                      {t('Auth.Placeholder.sex')}
                    </option>
                    <option value="male">{t('Auth.Placeholder.genderMale')}</option>
                    <option value="female">{t('Auth.Placeholder.genderFemale')}</option>
                  </Select>
                  {errors.username && <span className="text-red-500">{t('Auth.Errors.genderRequired')}</span>}
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-1">
              <Button type="submit" color="primary" className=" mt-[27px] text-white">
                {t('Auth.Register')}
              </Button>
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
      <div className="hidden w-1/2 p-10 xl:flex xl:flex-col xl:items-center xl:justify-center">
        <img className="w-[130px]" src={Logo} alt="" />
        <img className="w-full rounded-lg" src={BannerLogin} alt="" />
      </div>
    </div>
  );
};

export default SignUpPage;
