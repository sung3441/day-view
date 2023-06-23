import { Client } from '@/shared/axios';
import {
  ChannelRes,
  ChannelSelectType,
  CreateChannelParmaType,
  Token,
  UserRes,
  addScheduleParamType,
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
  const res = await new Client(`/api/channels/${channelSelectType}`).get<
    ChannelRes[]
  >();
  console.log('getChannel', res);
  return res;
};

export const createChannel = async (
  createChannelParma: CreateChannelParmaType
) => {
  console.log('CreateChannelParmaType');
  const res = await new Client(`/api/channels`).post(createChannelParma);
  console.log('createChannelParma', res);
  return res;
};

export const addSchedule = async (addScheduleParam: addScheduleParamType) => {
  console.log('addSchedule');

  const { channelId, ...params } = addScheduleParam;

  const res = await new Client(
    `/api/channels/${channelId}/records`
  ).post<addScheduleParamType>(params);

  console.log('addSchedule', res);

  return res;
};
