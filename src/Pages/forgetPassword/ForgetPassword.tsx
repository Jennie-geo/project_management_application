import React, { useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Logo from "../../Assets/logo.svg";
import ErrorMessage from "../../components/errorMessage";
import { useHistory } from "react-router-dom";
import CustomRedirect from "../../Utils/CustomRedirect";

function ForgetPassword() {
  console.log("rendering forgetpassword page");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    interface AxiosInterface {
      email: string;
    }
    await axios
      .request<AxiosInterface>({
        url: "https://kojjac.herokuapp.com/users/password/forgetPassword",
        data: {
          email,
        },
        method: "post",
        withCredentials: true,
      })
      .then(async (response) => {
        console.log("Success:", response);
        setEmailSent(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setError(error.response.data.message);
        setEmailSent(false);
        setLoading(false);
      });
  };

  return emailSent ? (
    <Wrapper>
      <div
        style={{ backgroundColor: "white", height: "20rem", padding: "5rem" }}
      >
        <h1>Reset Password</h1>
        <p style={{ marginTop: "1rem" }}>
          Check your email address for password reset link.
        </p>
        <Button onClick={(e) => history.push("/login")}>
          Go to login page
        </Button>
      </div>
    </Wrapper>
  ) : (
    <Wrapper>
      <div className="login">
        <img className="logo" src={Logo} alt="Login" />
        <BorderBottom />
        <form onSubmit={submitHandler}>
          <label>
            <h3>Email Address</h3>
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <Button disabled={loading}>
            {" "}
            {loading
              ? "Sending Link, Please wait...."
              : "Send password reset link"}{" "}
          </Button>

          <Button onClick={(e) => history.push("/login")}>
            &#8592; Go to login page
          </Button>
        </form>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      </div>
    </Wrapper>
  );
}

export const SSOWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GoogleButton = styled.button`
  width: 255px;
  height: 50px;
  border: none;
  border-radius: 25px;
  margin: 20px 25px;
  font-family: Heebo;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  background-color: var(--color-green);
  cursor: pointer;
`;
export const FacebookButton = styled.button`
  width: 255px;
  height: 50px;
  border: none;
  border-radius: 25px;
  margin: 20px 25px;
  font-family: Heebo;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  background-color: var(--color-green);
  cursor: pointer;
`;

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--deepGrey-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login {
    background-color: var(--white-background);
    width: 505px;
    height: 692px;
    padding: 20px;
  }
`;
export const BorderBottom = styled.div`
  margin: 40px 0px;
  border-bottom: 1px solid #ececec; ;
`;
export const Input = styled.input`
  background: var(--lightGrey-background);
  border-radius: 8px;
  display: block;
  width: 445px;
  height: 50px;
  border: none;
  margin: 10px 0;
  font-size: 20px;
  font-style: bold;
  padding: 25px;
`;

export const Button = styled.button`
  width: 444px;
  height: 50px;
  background-color: var(--color-green);
  border: none;
  border-radius: 25px;
  margin: 20px 0;
  font-family: Heebo;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  cursor: pointer;
`;

export default ForgetPassword;
