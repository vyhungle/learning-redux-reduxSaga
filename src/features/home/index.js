import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsPending } from "./productSplice";

export default function Index() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(productsPending());
  }, [dispatch]);
  
  return (
    <div>
      <h1>{user.username}</h1>
      <button>call product</button>
    </div>
  );
}
