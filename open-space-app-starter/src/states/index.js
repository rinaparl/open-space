/**
 * @TODO: Create Redux store
 */


import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import talkDetailReducer from './talkDetail/reducer';
import talksReducer from './talks/reducer';
import usersReducer from './users/reducer';
 
const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    talks: talksReducer,
    talkDetail: talkDetailReducer,
    loadingBar: loadingBarReducer,
  },
});
 
function asyncPreloadProcess() {
    return async (dispatch) => {
      dispatch(showLoading());
   
      try {
        // preload process
        const authUser = await getOwnProfile();
        dispatch(setAuthUserActionCreator(authUser));
      } catch (error) {
        // fallback process
        dispatch(setAuthUserActionCreator(null));
      } finally {
        // end preload process
        dispatch(setIsPreloadActionCreator(false));
      }
   
      dispatch(hideLoading());
    };
  }

export default store;
