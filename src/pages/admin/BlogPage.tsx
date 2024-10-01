import React from 'react';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { Button } from 'react-daisyui';
import { RiAddBoxLine } from 'react-icons/ri';

const BlogPage: React.FC = () => {
  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Bài Viết" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin={'Bài Viết'}
          Btn_Create={
            <Button color="primary" className="text-sm font-light text-white">
              <div className="flex items-center space-x-1">
                <RiAddBoxLine className="text-xl" />
                <p> Thêm</p>
              </div>
            </Button>
          }
        />
        <div className="bg-white">Bài Viết</div>
      </div>
    </div>
  );
};

export default BlogPage;

