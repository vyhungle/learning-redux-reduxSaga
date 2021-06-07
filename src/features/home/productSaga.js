import { call, put, takeEvery } from "redux-saga/effects";
import { productsPending } from "./productSplice";
import axios from "axios";

function* workerSaga() {
  try {
    const { data } = yield call(
      axios.get,
      "http://localhost:5000/api/product/all"
    );
    // dispatch a success action to the store with the new dog
    if (data.success)
      yield put({ type: "products/productsSuccess", payload: { products:data.products } });
    else yield put({ type: "products/productsFail" });
  } catch (error) {
    // dispatch a failure action to the store with the error
    console.log(error);
  }
}

export default function* productSaga() {
  yield takeEvery(productsPending().type, workerSaga);
}
