import React from 'react';
import { Button, Input, Select } from 'react-daisyui';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LabelForm from '../../components/auth/LabelForm';
import { Logo } from '../../assets/images';
import ServiceForm from '../../components/auth/ServiceForm';

const SignUpPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex w-full max-w-[390px] flex-col gap-[48px] p-[32px] sm:max-w-[504px]">
      <div className="mx-auto flex flex-col items-center gap-[16px] sm:mx-0 sm:max-w-full sm:gap-[28px]">
        <div className="flex items-center justify-center gap-4">
          <img width={80} src={Logo} alt="Reski." />
          <h1 className="block text-center text-[24px] font-[600] leading-[24px] text-primary sm:text-[36px]">
            {t('Auth.signupTitle')}
          </h1>
        </div>
        <p className="block text-[16px] font-[400] leading-[25.6px] sm:hidden">
          {t('Auth.signupSubtitle')}
        </p>
      </div>
      <div className="mx-0 flex w-full min-w-0 flex-col gap-[24px] sm:mx-auto sm:max-w-[388px] sm:gap-[48px]">
        <form>
          <div className="flex w-full flex-col gap-[24px]">
            <div className="flex w-full flex-col gap-[8px]">
              <LabelForm title={t('Auth.usernameLabel')} />
              <Input
                type="text"
                placeholder={t('Auth.usernamePlaceholder')}
                name="username"
              />
            </div>

            <div className="flex w-full flex-col gap-[8px]">
              <LabelForm title={t('Auth.fullNameLabel')} />
              <Input
                type="text"
                placeholder={t('Auth.fullNamePlaceholder')}
                name="full_name"
              />
            </div>

            <div className="flex w-full flex-col gap-[8px]">
              <LabelForm title={t('Auth.emailLabel')} />
              <Input
                type="email"
                placeholder={t('Auth.emailPlaceholder')}
                name="email"
              />
            </div>

            <div className="flex w-full flex-col gap-[8px]">
              <LabelForm title={t('Auth.phoneLabel')} />
              <Input
                type="text"
                placeholder={t('Auth.phonePlaceholder')}
                name="phone"
              />
            </div>

            <div className="flex w-full flex-col gap-[8px]">
              <LabelForm title={t('Auth.passwordLabel')} />
              <Input
                type="password"
                placeholder={t('Auth.passwordPlaceholder')}
                name="password"
              />
            </div>

            <div className="flex w-full flex-col gap-[8px]">
              <LabelForm title={t('Auth.branchLabel')} />
              <Select>
                <option hidden defaultValue={1} value="">
                  {t('Auth.branchPlaceholder')}
                </option>
              </Select>
            </div>

            <div className="flex w-full flex-col gap-[8px]">
              <LabelForm title={t('Auth.sexLabel')} />
              <Select>
                <option hidden defaultValue={1} value="">
                  {t('Auth.sexPlaceholder')}
                </option>

                <option>
                  ...
                </option>
              </Select>
            </div>

            <div className="flex w-full flex-col gap-[8px]">
              <LabelForm title={t('Auth.imageLabel')} />
              <Input type="file" name="image" className="p-[7px]" />
            </div>

            <Button type="submit" color="primary" className="text-white">
              {t('Auth.submitButton')}
            </Button>
          </div>
        </form>

        <ServiceForm />
        <p className="text-center font-sub font-[400] leading-[28.8px] md:text-[18px]">
          {t('Auth.loginPrompt')}{' '}
          <Link className="text-primary" to="/auth/login">
            {t('Auth.loginLink')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
