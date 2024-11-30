import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select } from 'react-daisyui';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import LabelForm from '../../components/auth/LabelForm';
import { Logo, LogoTitle } from '../../assets/images';
import ServiceForm from '../../components/auth/ServiceForm';
import HeaderAuth from '../../components/auth/HeaderAuth';
import { BannerLogin } from '../../assets/image-represent';
import { useAuth } from '../../context/auth/AuthContext';
import { Toastify } from '../../helper/Toastify';
import { isIErrorResponse } from '../../types/error/error';

const SignUpPage: React.FC = () => {
  const { t } = useTranslation();
  const { register: registerUser, verifyOtp, isOtpVerified } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>('');
  const [isOtpInputVisible, setIsOtpInputVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const email = watch('email');

  const onSubmit = async (data: any) => {
    try {
      await registerUser(data);
      Toastify('Đăng ký thành công', 201);
      setIsOtpInputVisible(true);
    } catch (error) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Đăng ký thất bại';
      Toastify(`${errorMessage}`, 500);
    }
  };

  const onVerifyOtp = async () => {
    try {
      if (email && otp) {
        await verifyOtp(email, otp);
        if (isOtpVerified) {
          Toastify('Xác thực OTP thành công!', 201);
          navigate('/auth/login');
        } else {
          Toastify('Xác thực OTP thất bại!', 500);
        }
      } else {
        Toastify('Vui lòng nhập đầy đủ OTP và email!', 500);
      }
    } catch (error) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi xác thực OTP';
      Toastify(`${errorMessage}`, 500);
    }
  };


  return (
    <div className="xl:flex xl:flex-row xl:items-center xl:justify-center">
      <HeaderAuth Title_NavbarMobile={t('Auth.Register')} />
      <div className="flex w-full flex-col items-center justify-center xl:w-1/2">
        <div>
          <h1 className="hidden text-center text-[40px] font-[600] text-primary dark:text-white xl:block">
            {t('Auth.Register')}
          </h1>
          <img className="w-[180px] dark:hidden xl:hidden xl:w-[120px]" src={Logo} alt="" />
          <img className="hidden w-[180px] dark:block xl:w-[120px] dark:xl:hidden" src={LogoTitle} alt="" />
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
                  {errors.username && (
                    <span className="text-red-500">{t('Auth.Errors.usernameRequired')}</span>
                  )}
                </div>

                <div className="flex w-full flex-col gap-1">
                  <LabelForm title={t('Auth.LabelForm.fullname')} />
                  <Input
                    className="w-[350px] focus:outline-none xl:w-[300px]"
                    type="text"
                    placeholder={t('Auth.Placeholder.fullname')}
                    {...register('fullName', { required: true })}
                  />
                  {errors.fullName && (
                    <span className="text-red-500">{t('Auth.Errors.fullnameRequired')}</span>
                  )}
                </div>

                <div className="flex w-full flex-col gap-1">
                  <LabelForm title={t('Auth.LabelForm.email')} />
                  <Input
                    className="w-[350px] focus:outline-none xl:w-[300px]"
                    type="email"
                    placeholder={t('Auth.Placeholder.email')}
                    {...register('email', { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-500">{t('Auth.Errors.emailRequired')}</span>
                  )}
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
                  {errors.phone && (
                    <span className="text-red-500">{t('Auth.Errors.phoneRequired')}</span>
                  )}
                </div>
                <div className="flex w-full flex-col gap-1">
                  <LabelForm title={t('Auth.LabelForm.password')} />
                  <Input
                    className="w-[350px] focus:outline-none xl:w-[300px]"
                    type="password"
                    placeholder={t('Auth.Placeholder.password')}
                    {...register('password', { required: true })}
                  />
                  {errors.username && (
                    <span className="text-red-500">{t('Auth.Errors.passwordRequired')}</span>
                  )}
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
                  {errors.username && (
                    <span className="text-red-500">{t('Auth.Errors.genderRequired')}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-1">
              <Button type="submit" color="primary" className="mt-10 border border-white text-white">
                {t('Auth.Register')}
              </Button>
            </div>
          </form>

          {isOtpInputVisible && (
            <div className="mt-5">
              <Input
                className="w-[350px] focus:outline-none xl:w-[190px]"
                type="text"
                placeholder={t('Auth.Placeholder.otp')}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button className="m-4 bg-green-400" onClick={onVerifyOtp}>
                {t('Auth.VerifyOtp')}
              </Button>
            </div>
          )}

          <ServiceForm />
          <p className="my-5 text-center font-sub text-base font-[400] text-black dark:text-white">
            {t('Auth.CreateAccount')} &nbsp;
            <NavLink className="text-blue-500" to="/auth/login">
              {t('Auth.Login')}
            </NavLink>
          </p>
        </div>
      </div>
      <div className="hidden w-1/2 gap-5 p-10 xl:flex xl:flex-col xl:items-center xl:justify-center">
        <img className="block w-[130px] dark:hidden" src={Logo} alt="" />
        <img className="hidden w-[130px] dark:block" src={LogoTitle} alt="" />
        <img className="w-full rounded-lg" src={BannerLogin} alt="" />
      </div>
    </div>
  );
};

export default SignUpPage;
