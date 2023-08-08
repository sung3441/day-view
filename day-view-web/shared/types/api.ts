export type Token = {
  token: string;
};

export type UserRes = {
  data: {
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
};

export type PatchUserParams = {
  nickname?: string;
  birthday?: string;
  profileImageUrl?: string;
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

export type CreateChannelParamType = {
  name: string;
  secretYn: boolean;
};

export type PutChannelParamType = {
  channelId: number;
  name: string;
};

export type addScheduleParamType = {
  title: string;
  content?: string;
  startDate: Date;
  endDate: Date;
  recordImageUrl?: string;
};

export type SearchChannelParamType = {
  page: number;
  size: number;
  keyword: string;
  order: string;
};

export type SearchItemType = {
  id: number;
  name: string;
  channelType: ChannelSelectType;
  creatorId: number;
  creatorNickname: string;
  subscriberCount: number;
  createdDate: string;
  subscribe: boolean;
};

export type SearchChannelRes = {
  data: {
    content: SearchItemType[];
    last: boolean;
    totalElements: number;
    totalPages: number;
  };
};

export type PatchChannelType = {
  subscribeId: number;
  color?: string;
  showYn?: boolean;
};

export type RecordRes = {
  recordId: number;
  title: string;
  content: string;
  complete: boolean;
  startDate: string;
  endDate: string;
  recordImageUrl: string;
};
