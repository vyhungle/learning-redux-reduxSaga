import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./rootSaga";
import productReducer from "../features/home/productSplice";

const sagaMiddleware =createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth:loginReducer,
    product:productReducer
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
