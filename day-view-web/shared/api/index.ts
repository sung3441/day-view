import { Client } from '@/shared/axios';
import {
  ChannelRes,
  ChannelSelectType,
  CreateChannelParmaType,
  Token,
  UserRes,
  addScheduleParamType,
  SearchChannelParmaType,
  SearchChannelRes,
} from '@/shared/types/api';

export const getAccessToken = async () => {
  const res = await new Client('/api/v1/auth/refresh').get<Token>();
  console.log('getAccessToken', res);
  return res;
};

export const getUser = async () => {
  const res = await new Client('/api/members/me').get<UserRes>();
  console.log('getUser', res);
  return res;
};

export const getChannel = async (channelSelectType: ChannelSelectType) => {
  const res = await new Client(`/api/channels/${channelSelectType}`).get<{
    data: ChannelRes[];
  }>();
  console.log('getChannel', res);
  return res;
};

export const createChannel = async (
  createChannelParma: CreateChannelParmaType
) => {
  const res = await new Client(`/api/channels`).post(createChannelParma);
  return res;
};

export const subscribeChannel = async (channelId: number) => {
  const res = await new Client(`/api/channels/${channelId}/subscribes`).post();
  return res;
};

export const unsubscribeChannel = async (subscribeId: number) => {
  const res = await new Client(`/api/subscribes/${subscribeId}`).delete();
  return res;
};

export const addSchedule = async (addScheduleParam: addScheduleParamType) => {
  const { channelId, ...params } = addScheduleParam;
  const res = await new Client(
    `/api/channels/${channelId}/records`
  ).post<addScheduleParamType>(params);

  return res;
};

export const getSearchChannel = async (
  createChannelParma: SearchChannelParmaType
) => {
  const res = await new Client(`/api/channels
`).get<SearchChannelRes>(createChannelParma);
  return res;
};
