import React from 'react';

interface NavigationBtnProps {
  Icons: React.ReactNode;
  badgeNumber?: number;
  bg_span: React.ReactNode;
  style: React.ReactNode;
  onClick: () => void;
}

const NavigationBtn: React.FC<NavigationBtnProps> = ({
  Icons,
  badgeNumber = 1,
  bg_span,
  style,
  onClick
}) => {
  return (
    <div onClick={onClick} className={`${style} btn relative text-[20px]`}>
      {Icons}
      {badgeNumber > 0 && (
        <span
          className={`${bg_span} absolute right-[-10px] top-[-10px] flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-white p-[3px] text-xs font-light text-white`}
        >
          {badgeNumber}
        </span>
      )}
    </div>
  );
};

export default NavigationBtn;
