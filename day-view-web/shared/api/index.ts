import { Client } from '@/shared/axios';
import {
  ChannelRes,
  ChannelSelectType,
  CreateChannelParamType,
  Token,
  UserRes,
  addScheduleParamType,
  SearchChannelParamType,
  SearchChannelRes,
  PatchChannelType,
  PutChannelParamType,
} from '@/shared/types/api';

export const getAccessToken = async () => {
  const res = await new Client('/api/v1/auth/refresh').get<Token>();
  return res;
};

export const getUser = async () => {
  const res = await new Client('/api/members/me').get<UserRes>();
  console.log('resresresres', res);
  return res;
};

export const getChannel = async (channelSelectType: ChannelSelectType) => {
  const res = await new Client(`/api/channels/${channelSelectType}`).get<{
    data: ChannelRes[];
  }>();
  return res;
};

export const createChannel = async (
  createChannelParam: CreateChannelParamType
) => {
  const res = await new Client(`/api/channels`).post(createChannelParam);
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

export const patchChannel = async (PatchChannelParams: PatchChannelType) => {
  const { subscribeId, showYn, color } = PatchChannelParams;
  const res = await new Client(`/api/subscribes/${subscribeId}`).patch({
    showYn,
    color,
  });
  return res;
};

/** 채널명 수정 */
export const putChannel = async (PutChannelParams: PutChannelParamType) => {
  const { channelId, name } = PutChannelParams;
  const res = await new Client(`/api/channels/${channelId}`).put({
    name,
  });
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
  createChannelParam: SearchChannelParamType
) => {
  const res = await new Client(`/api/channels
`).get<SearchChannelRes>(createChannelParam);
  return res;
};

export const getRecordInChannel = async ({
  channelId,
}: {
  channelId: number;
}) => {
  const res = await new Client(`/api/channels/${channelId.toString()}/records
`).get<SearchChannelRes>();

  return res;
};
