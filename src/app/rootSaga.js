
import { all } from 'redux-saga/effects'
import productSaga from '../features/home/productSaga';
import authSaga from "../features/auth/authSaga";


export default function* rootSaga(){
    yield all([productSaga(),authSaga()]);
}