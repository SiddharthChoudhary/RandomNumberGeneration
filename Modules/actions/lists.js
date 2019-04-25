import { ADD_LIST } from './types';

export const addList = (listName,list) => {
  return {
    type: ADD_LIST,
    name: listName,
    list:list
  }
}