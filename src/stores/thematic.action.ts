import type { ThematicParams } from '@/interface/Thematic';

import { addThematic, deleteDataThematic, getDataThematic, updateDataThematic } from '@/api/thematic';

import { createAsyncAction } from './utils';

export const createThematic = createAsyncAction<ThematicParams, any>(payload => {
  return async () => {
    const data = await addThematic(payload);

    if (data) {
      return true;
    }

    return false;
  };
});

export const getThematic = createAsyncAction<any, any>(payload => {
  return async () => {
    const data = await getDataThematic(payload);

    if (data) {
      return data;
    }

    return false;
  };
});

export const deleteThematic = createAsyncAction<string, any>(payload => {
  return async () => {
    const data = await deleteDataThematic(payload);

    if (data) {
      return true;
    }

    return false;
  };
});
export const updateThematic = createAsyncAction<any, any>(payload => {
  return async () => {
    const data = await updateDataThematic(payload);

    if (data) {
      return true;
    }

    return false;
  };
});
