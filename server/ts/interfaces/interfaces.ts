import { Document } from 'mongoose';

export interface IUser extends Document {
  user_name: string;
  email: string;
  password: string;
  image_url: string;
}

export interface ITitle extends Document {
  title: string;
  user_id: IUser['_id'];
}

export interface IEntry extends Document {
  entry: string;
  user_id: IUser['_id'];
  title_id: ITitle['_id'];
}