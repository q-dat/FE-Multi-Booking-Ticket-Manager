import React from 'react';
import { BannerRight, BannerTop } from '../../assets/image-represent';

const BoxImage: React.FC<{}> = () => {
  return (
    <div className="order-1 w-full p-0 sm:order-2 sm:h-full sm:p-[32px]">
      <img
        className="hidden h-full w-full rounded-md object-cover sm:block"
        src={BannerRight}
        alt=""
      />
      <img
        className="block h-full w-full object-cover sm:hidden "
        src={BannerTop}
        alt=""
      />
    </div>
  );
};

export default BoxImage;
