import { createStore, combineReducers } from 'redux';
import listsReducer from './reducers/addIntoListReducer';

const rootReducer = combineReducers({
  lists: listsReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;