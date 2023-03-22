export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  cookTime: string;
  prepTime: string;
  totalTime: string;
  author: {
    name: string;
    image: string;
  }
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
}