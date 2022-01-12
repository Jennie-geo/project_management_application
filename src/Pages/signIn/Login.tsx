import React, { useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Logo from "../../Assets/logo.svg";
import ErrorMessage from "../Signup/errorMessage";
import { authContext } from "../../Utils/Authcontext";
import CustomRedirect from "../../Utils/CustomRedirect";
import { Link } from "react-router-dom";

function Login() {
  console.log("rendering login page");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, token } = useContext(authContext);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Email and Password are required");
      return;
    }
    setLoading(true);

    interface AxiosInterface {
      email: string;
      password: string;
      token?: string;
    }
    await axios
      .request<AxiosInterface>({
        url: "https://kojjac.herokuapp.com/users/login",
        data: {
          email,
          password,
        },
        method: "post",
        withCredentials: true,
      })
      .then(async (response) => {
        console.log("Success:", response);
        const tokenFromServer = response.data.token;
        signIn(tokenFromServer);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setError(error.response.data.msg);
        setLoading(false);
      });
  };

  return token ? (
    <CustomRedirect />
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
              // required
            />
          </label>

          <label>
            <h3> Password</h3>
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              // required
            />
          </label>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

          <Button disabled={loading}>
            {" "}
            {loading ? "logging in...." : "Login"}{" "}
          </Button>
        </form>
        <SSOWrapper>
          <a
            className="buttonAtag"
            href="https://kojjac.herokuapp.com/users/google"
          >
            <GoogleButton>
              <i className="fab fa-google"></i>
              <p className="buttonText">Login With Google Account</p>
            </GoogleButton>
          </a>
          <a
            className="buttonAtag"
            href="https://kojjac.herokuapp.com/users/auth/facebook/callback"
          >
            <FacebookButton>
              <i className="fab fa-facebook-square"></i>
              <p className="buttonText">Login With Facebook Account</p>
            </FacebookButton>
          </a>
        </SSOWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Link to="/forgetpassword" style={{ color: "blue" }}>
            Forget password?
          </Link>
          <Link to="/signup" style={{ color: "blue" }}>
            Signup here?
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}

export const SSOWrapper = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  .fa-google {
    font-size: 30px;
    color: #ffffff;
    width: 20%;
    border-right: 1px solid #c4332a;
  }
  .fa-facebook-square {
    font-size: 30px;
    color: #ffffff;
    width: 20%;
    border-right: 1px solid #253b65;
  }
  .buttonAtag {
    text-decoration: none;
  }
`;

export const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  width: 444px;
  height: 50px;
  border: none;
  border-radius: 25px;
  margin-bottom: 10px;
  font-family: Heebo;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  background-color: #e93f33;
  cursor: pointer;
  padding: 0 20px;
  .buttonText {
    width: 80%;
    margin-right: 40px;
    color: #ffffff;
  }
`;
export const FacebookButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 444px;
  height: 50px;
  border: none;
  border-radius: 25px;
  margin: 10px 0;
  font-family: Heebo;
  font-style: normal;
  font-weight: bold;
  /* font-size: 14px; */
  line-height: 21px;
  /* background-color: var(--color-green); */
  background-color: #3a5999;
  cursor: pointer;
  padding: 0 20px;
  .buttonText {
    width: 80%;
    margin-right: 40px;
    color: #ffffff;
  }
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
  margin: 10px 0;
  font-family: Heebo;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  cursor: pointer;
`;

export default Login;
