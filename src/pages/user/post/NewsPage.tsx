import React, { useContext, useEffect, useState } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { PostContext } from '../../../context/post/PostContext';
import { useTranslation } from 'react-i18next';

const NewsPage: React.FC = () => {
  //Translation
  const {t} = useTranslation()
  const { posts, getAllPosts } = useContext(PostContext);
  const [selectedPost, setSelectedPost] = useState<(typeof posts)[0] | null>(
    null
  );

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  useEffect(() => {
    if (posts.length > 0 && !selectedPost) {
      setSelectedPost(posts[0]);
    }
  }, [posts, selectedPost]);
  //
  const handlePostSelect = (post: (typeof posts)[0]) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const otherPosts = posts.filter(post => post._id !== selectedPost?._id);

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile={t('UserPage.Navbar.News')} />
      <div className="px-2 dark:bg-white xl:px-[100px]">
        {selectedPost && (
          <div className="mb-10">
            <p className="text-[35px] font-bold">{selectedPost.title}</p>
            <p className="font-light text-[14px]">Danh mục:&nbsp;{selectedPost.catalog}</p>
            <p className="text-[14px]">
              Xuất bản:&nbsp;
              {new Date(selectedPost.updatedAt).toLocaleDateString('vi-VN')}
            </p>
            <hr className="my-4" />
            <div
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              className="text-[18px]"
            ></div>
          </div>
        )}

        <div>
          <h2 className="mb-6 text-[24px] font-semibold">{t('UserPage.Navbar.News')}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map(post => (
              <div
                key={post._id}
                className="cursor-pointer rounded border p-4 shadow transition hover:shadow-lg"
                onClick={() => handlePostSelect(post)}
              >
                <img src={post.imageUrl} alt="Ảnh đại diện" className='w-full h-[250px] object-cover' />
                <p className="text-[30px] font-bold">{post.title}</p>
                <p className="font-light text-[14px]">Danh mục:&nbsp;{post.catalog}</p>
                <p className="text-[14px]">
                  Xuất bản:&nbsp;
                  {new Date(post.updatedAt).toLocaleDateString('vi-VN')}
                </p>
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="line-clamp-6 text-[18px]"
                ></div>{' '}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;

