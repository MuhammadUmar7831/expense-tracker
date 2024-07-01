import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loading.slices.js";
import errorReducer from "./slices/error.slices.js";
import successReducer from "./slices/success.slices.js";
import userReducer from "./slices/user.slices.js";

export default configureStore({
  reducer: {
    loading: loadingReducer,
    error: errorReducer,
    success: successReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
