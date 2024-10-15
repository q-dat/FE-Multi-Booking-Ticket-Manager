export interface Post {
  _id: string;
  title: string;
  content: string;
  createAt: string;
  post_catalog_id: {
    _id: string;
    name: string;
  };
  img: string;
}
