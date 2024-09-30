import React from 'react';
import { Button, Input } from 'react-daisyui';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LabelForm from '../../components/auth/LabelForm';
import ServiceForm from '../../components/auth/ServiceForm';
import { Logo } from '../../assets/images';
import HeaderAuth from '../../components/auth/HeaderAuth';
import { BannerLogin } from '../../assets/image-represent';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';

interface FormData {
  username: string;
  password: string;
}

const LoginPage: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.username, data.password);
      toast.success('Đăng nhập thành công');
      navigate('/');
    } catch (error) {
      toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <div className="xl:flex xl:flex-row xl:items-center xl:justify-center">
      <HeaderAuth Title_NavbarMobile={t('Auth.Login')} />
      {/* Form */}
      <div className="flex w-full flex-col items-center justify-center xl:w-1/2">
        <div>
          <h1 className="hidden text-center text-[40px] font-[600] text-primary xl:block">
            {t('Auth.Login')}
          </h1>
          <img className="w-[180px] xl:hidden xl:w-[120px]" src={Logo} alt="" />
        </div>
        <div className="mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full flex-col space-y-4">
              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.LabelForm.username')} />
                <Input
                  className="w-[350px] focus:outline-none md:w-[700px] xl:w-[500px]"
                  placeholder={t('Auth.Placeholder.username')}
                  type="text"
                  {...register('username', { required: true })}
                />
                {errors.username && (
                  <span className="text-red-500">
                    {t('Auth.Errors.usernameRequired')}
                  </span>
                )}
              </div>
              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.LabelForm.password')} />
                <Input
                  className="w-[350px] focus:outline-none md:w-[700px] xl:w-[500px]"
                  placeholder={t('Auth.Placeholder.password')}
                  type="password"
                  {...register('password', { required: true })}
                />
                {errors.username && (
                  <span className="text-red-500">
                    {t('Auth.Errors.passwordRequired')}
                  </span>
                )}
              </div>

              <Link
                className="self-end font-sub text-[16px] font-[400] text-primary"
                to="/auth/request-password-reset"
              >
                {t('Auth.ForgotPassword')}
              </Link>

              <Button type="submit" color="primary" className="text-white">
                {t('Auth.Login')}
              </Button>
            </div>
          </form>
          <ServiceForm />
          <p className="my-5 text-center font-sub text-base font-[400]">
            {t('Auth.CreateAccount')} &nbsp;
            <NavLink className="text-primary" to="/auth/register">
              {t('Auth.Register')}
            </NavLink>
          </p>
        </div>
      </div>
      {/* BoxImg */}
      <div className="hidden w-1/2 p-10 xl:flex xl:flex-col xl:items-center xl:justify-center">
        <img className="w-[130px]" src={Logo} alt="" />
        <img className="w-full rounded-lg" src={BannerLogin} alt="" />
      </div>
    </div>
  );
};

export default LoginPage;
