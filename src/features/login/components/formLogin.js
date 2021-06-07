import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { loginPending } from "../loginSlice";

export default function FormLogin() {
  const { isLoading, errors, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  if (isAuth) {
    history.push("/home");
  }
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={async (values) => {
        dispatch(loginPending({ values }));
      }}
    >
      {(formProps) => (
        <Form onSubmit={formProps.handleSubmit}>
          <Container>
            <Field
              type="username"
              name="username"
              placeholder="Tài khoản"
              value={formProps.values.username}
              onChange={formProps.handleChange("username")}
            />
            {errors.username && <Error>{errors.username}</Error>}
            <Field
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formProps.values.password}
              onChange={formProps.handleChange("password")}
            />
            {errors.password && <Error>{errors.password}</Error>}
            <BoxButton>
              <ButtonSubmit type="submit">
                {isLoading ? "loading..." : "Đăng nhập"}
              </ButtonSubmit>
              <TextRegister href="/register">
                Đăng ký tài khoản mới
              </TextRegister>
            </BoxButton>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const ButtonSubmit = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 15px;
  border: none;
  margin: 5px;
  margin-top: 20px;
  background-color: #1da1f3;
  color: white;
  font-weight: 700;
  margin-left: 5px;
`;

const Field = styled.input`
  height: 40px;
  width: 350px;
  border-radius: 10px;
  border: solid 1px gainsboro;
  margin: 5px;
  padding: 10px;
  outline: none;
  margin-bottom: 10px;
`;

const BoxButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TextRegister = styled.a`
  text-decoration: none;
  color: #1da1f3;
  position: relative;
  top: 7px;
`;

const Error = styled.p`
  font-size: 15px;
  color: #ff9494;
  font-weight: 600;
  margin: 0;
  margin-left: 5px;
`;
