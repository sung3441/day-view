import { getSearchChannel } from '@/shared/api';
import { string } from 'prop-types';
import dates from '@/component/calendar/dateSection/Dates';

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

export type CreateChannelParmaType = {
  name: string;
  secretYn: boolean;
};

export type addScheduleParamType = {
  channelId: number;
  title: string;
  startDate: Date;
  endDate: Date;
  content?: string;
  recordImageUrl?: string;
};

export type SearchChannelParmaType = {
  page: number;
  size: number;
  keyword: string;
  order: string;
};

export type SearchChannelRes = {
  data: {
    content: [
      {
        id: number;
        name: string;
        channelType: ChannelSelectType;
        creatorId: number;
        creatorNickname: string;
        subscriberCount: number;
        createdDate: Date;
        subscribe: boolean;
      }
    ];
    last: boolean;
    totalElements: number;
  };
};
