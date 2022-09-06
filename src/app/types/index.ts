export interface IArticle {
  _id: string;
  title: string;
  type: string;
  userInfo: any;
  createTime: string;
  fav: number;
  answer: number;
  status: string;
  isTop: number;
  read: number;
  content: string
}
export interface IComment {
  _id?: string
  content?: string
}