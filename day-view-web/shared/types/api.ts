import { number, string } from 'prop-types';
export type Token = {
  token: string;
};

export type UserRes = {
  memberId: number;
  provider: string;
  email: string;
  nickname: string;
  profileImageUrl: string;
  birthday: string;
  accessToken?: string;
  refreshToken?: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
};

export type ChannelSelectType = 'MANAGE' | 'SUBSCRIBE' | 'GOOGLE';

export type ChannelRes = {
  channelId: number;
  subscribeId: number;
  name: string;
  showYn: boolean;
  color: string;
  channelType: string;
  subscribeAuth: string;
};
