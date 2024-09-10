import React from 'react';
import { Button, Input } from 'react-daisyui';
import { Logo } from '../../assets/images';

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="mx-auto flex w-full max-w-[390px] flex-col gap-[48px] p-[32px] sm:max-w-[504px]">
      <form >
        <div className="mx-auto flex max-w-[342px] flex-col items-center gap-[16px] sm:mx-0 sm:max-w-full sm:items-start sm:gap-[28px]">
          <div className="flex items-center justify-center gap-4">
            <img width={80} src={Logo} alt="Reski." />
            <h1 className="hidden text-[36px] font-[600] leading-[36px] text-primary sm:block">
              Reset Password
            </h1>
          </div>
          <h1 className="block text-center text-[24px] font-[600] leading-[24px] text-primary sm:hidden">
            Hello
          </h1>
        </div>
        <div className="mt-10 flex w-full flex-col gap-[24px]">
          <div className="flex w-full flex-col gap-[8px]">
            <label htmlFor="password">New Password</label>
            <Input
              placeholder="Enter new password"
              type="password"
              name="password"
            />
          </div>
          <div className="flex w-full flex-col gap-[8px]">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Input
              placeholder="Confirm new password"
             
              type="password"
              name="confirmPassword"
            />
           
              </div>
          </div>
          <Button
            type="submit"
            color="primary"
            className="text-white"
          >
            Reset Password
          </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
