import { object, string, number, date, InferType } from 'yup';
import * as yup from 'yup';

//型定義
export type posts = {
    title:string;
    content:string;
    name: string;
};

//バリデーション
const schema = yup.object().shape({
    title: string().required(),
    contnet: string().required(),
});

export const Address = ['tokyo', 'osaka', ''] as const; // ''は未選択状態
export const Gender = ['male', 'female', 'other'] as const;