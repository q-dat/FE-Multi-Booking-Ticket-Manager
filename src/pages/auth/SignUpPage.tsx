import React, { useState } from 'react';
import { Button, Input, Select } from 'react-daisyui';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import LabelForm from '../../components/auth/LabelForm';
import { Logo } from '../../assets/images';
import ServiceForm from '../../components/auth/ServiceForm';
import HeaderAuth from '../../components/auth/HeaderAuth';
import { BannerLogin } from '../../assets/image-represent';
import { useAuth } from '../../context/AuthContext';

const SignUpPage: React.FC = () => {
  const { t } = useTranslation();
  const { register } = useAuth();

  const [formData, setFormData] = useState<{
    username: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    gender: string;
    profileImage: File | null;
  }>({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
    profileImage: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(formData);
      alert('Đăng ký thành công!');
    } catch (error) {
      console.error('Đăng ký thất bại', error);
      alert('Đăng ký thất bại!');
    }
  };

  return (
    <div className="xl:flex xl:flex-row xl:items-center xl:justify-center">
      <HeaderAuth Title_NavbarMobile={t('Auth.Register')} />
      {/* Form */}
      <div className="flex w-full flex-col items-center justify-center xl:w-1/2">
        <div className="">
          <h1 className="hidden text-center text-[40px] font-[600] text-primary xl:block">
            {t('Auth.Register')}
          </h1>
          <img className="w-[180px] xl:hidden xl:w-[120px]" src={Logo} alt="" />
        </div>
        <div className="mt-10">
          <form onSubmit={handleSubmit}>
            <div className="flex w-full flex-col gap-5 md:flex-row">
              <div className="flex flex-col space-y-4">
                <div className="flex w-full flex-col gap-1">
                  <LabelForm title={t('Auth.LabelForm.username')} />
                  <Input
                    className="w-[350px] focus:outline-none xl:w-[300px]"
                    type="text"
                    placeholder={t('Auth.Placeholder.username')}
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex w-full flex-col gap-1">
                  <LabelForm title={t('Auth.LabelForm.fullname')} />
                  <Input
                    className="w-[350px] focus:outline-none xl:w-[300px]"
                    type="text"
                    placeholder={t('Auth.Placeholder.fullname')}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex w-full flex-col gap-1">
                  <LabelForm title={t('Auth.LabelForm.email')} />
                  <Input
                    className="w-[350px] focus:outline-none xl:w-[300px]"
                    type="email"
                    placeholder={t('Auth.Placeholder.email')}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex w-full flex-col gap-1">
                  <LabelForm title={t('Auth.LabelForm.phone')} />
                  <Input
                    className="w-[350px] focus:outline-none xl:w-[300px]"
                    type="text"
                    placeholder={t('Auth.Placeholder.phone')}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
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
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <LabelForm title={t('Auth.LabelForm.sex')} />
                  <Select
                    className="w-[350px] focus:outline-none xl:w-[300px]"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option hidden defaultValue={1} value="">
                      {t('Auth.Placeholder.sex')}
                    </option>
                    <option value="male">{t('Auth.Gender.Male')}</option>
                    <option value="female">{t('Auth.Gender.Female')}</option>
                  </Select>
                </div>

                <div className="flex w-full flex-col gap-1">
                  <LabelForm title={t('Auth.LabelForm.avatar')} />
                  <Input
                    className="w-[350px] p-[7px] focus:outline-none xl:w-[300px]"
                    type="file"
                    name="profileImage"
                    onChange={(e) =>
                      setFormData({ ...formData, profileImage: e.target.files?.[0] || null })
                    }
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
      {/* BoxImg */}
      <div className="hidden w-1/2 p-10 xl:flex xl:flex-col xl:items-center xl:justify-center">
        <img className="w-[130px]" src={Logo} alt="" />
        <img className="w-full rounded-lg" src={BannerLogin} alt="" />
      </div>
    </div>
  );
};

export default SignUpPage;
