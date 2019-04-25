import { ADD_LIST } from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  lists: AsyncStorage.getAllKeys((err,keys)=>{
    if(keys){
        return keys
    }
  }),
};

const listsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_LIST:
      AsyncStorage.setItem(action.name,action.list,err=>{
          alert("Couldn't set the list item")
      })
      return {
        ...state,
        lists: AsyncStorage.getAllKeys((err,keys)=>{
            if(keys){
                return keys
            }
        })
      };
    // case ADD_ITEM_TO_LIST:
    //first trying to run the simple addlist version, will update this later
    //   AsyncStorage.getItem(action.payload)
    //   return{
    //       ...state,

    //   }
    default:
      return state;
  }
}

export default listsReducer;