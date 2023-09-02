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

export type AddScheduleParamType = {
  channelId: number;
  title: string;
  startDate: string;
  endDate: string;
  content?: string;
  recordImageUrl?: string;
  allDay: boolean;
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
  color: string;
  channelName: string;
  subscribeId: number;
  channelId: number;
  allDay: boolean;
};

export type PatchRecordParamType = {
  recordId: number;
  title: string;
  content: string;
  complete: boolean;
  startDate: string;
  endDate: string;
  recordImageUrl: string;
};

export type RecordInChannel = Omit<
  RecordRes,
  'color' | 'channelName' | 'subscribeId' | 'channelId'
>;

export type RecordInSubscribeParam = {
  startDate: string; // 2021-09-01T00:00:00
  endDate: string; // 2021-09-30T23:59:59
};

export type MyChannelRecodeRes = {
  data: RecordRes[];
};

export type SubscribeMembersRes = {
  count: number;
  subscribers: {
    name: string;
    email: string;
    auth: string;
    profileImageUrl: string;
  }[];
};
