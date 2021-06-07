import { all, call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import jwtDecode from "jwt-decode";

import setAuthToken from "../../utils/setAuthToken";
import { loginPending,authUser,loginSuccess,loginFail } from "../login/loginSlice";

function* getUser() {
  var user=null;
  if (localStorage.getItem("Token")) {
    var token = localStorage.getItem("Token");
    const decodedToken = jwtDecode(token);
    user = decodedToken;
    setAuthToken(token);
  }
  if (user) {
    yield put({ type: authUser.type, payload: { user: user } });
  } else {
    setAuthToken(null);
  }
}

export function* loginUser(action) {
  try {
    const { payload } = action;
    const { data } = yield call(
      axios.post,
      "http://localhost:5000/api/auth/login",
      payload.values
    );
    if (data.success) {
      yield put({ type: loginSuccess.type, payload: { token: data.token } });
      yield call(getUser);
    } else {
      yield put({ type: loginFail.type, payload: { errors: data.errors } });
    }
  } catch (error) {
    console.log(error);
  }
}

function* workerLogin() {
  yield takeEvery(loginPending.type, loginUser);
}

export default function* productSaga() {
  yield all([getUser(), workerLogin()]);
}
