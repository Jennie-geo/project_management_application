import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import Logo from "../../Assets/logo.svg";
import ErrorMessage from "./errorMessage";
import { useHistory, Link } from "react-router-dom";
import { GoogleButton, FacebookButton, SSOWrapper } from "../signIn/Login";
import { authContext } from "../../Utils/Authcontext";
import CustomRedirect from "../../Utils/CustomRedirect";

function Signup() {
  const [fullname, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const history = useHistory();
  const { token } = useContext(authContext);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://kojjac.herokuapp.com/users/signup",
        {
          fullname,
          email,
          password,
        }
      );

      console.log(data);
      setEmailSent(true);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return token ? (
    <CustomRedirect />
  ) : (
    <Wrapper>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      <div className="login">
        <img className="logo" src={Logo} alt="Login" />
        <BorderBottom />
        <form onSubmit={submitHandler}>
          <label>
            <h3> Full Name</h3>
            <Input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setfullName(e.target.value)}
              required
            />
          </label>
          <label>
            <h3> Email Address</h3>
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            <h3> Password</h3>
            <Input
              type="password"
              placeholder="Enter Paasword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            <h3>Repeat Password </h3>
            <Input
              id="fn"
              type="password"
              placeholder="Repeat Password"
              required
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </label>

          <Button disabled={loading}>
            {loading ? "Signing up" : "Signup"}{" "}
          </Button>
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
        </form>

        <Link to="/login">Go to login page</Link>
      </div>
    </Wrapper>
  );
}

export default Signup;

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
    height: 762px;
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
