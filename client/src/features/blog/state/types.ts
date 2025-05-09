export interface GetPostsQuery { 
  page: number; 
  itemsPerPage: number; 
};

export interface PostFormData {
  title: string;
  content: string;
  images: any[];
}

export interface PostType extends PostFormData {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export interface CreatePostResponse {
  payload: PostType;
  message: string;
};