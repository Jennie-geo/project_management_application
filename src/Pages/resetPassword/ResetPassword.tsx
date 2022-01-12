import axios from 'axios';
import styled from 'styled-components';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../components/Header';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const { token } = useParams<{ token: string }>();

  const history = useHistory();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== repeatPassword) {
      setErrorMsg('Password does not match, please check and try again.');
      return;
    }
    interface AxiosInterface {
      newPassword: string;
      repeatPassword: string;
      token?: string;
    }

    try {
      const backendurl = process.env.REACT_APP_BACKEND_URL as string;
      await axios
        .request<AxiosInterface>({
          url: `${backendurl}/users/password/resetPassword/${token}`,
          method: 'post',
          data: { newPassword, repeatPassword },
          headers: { token: token! },
        })
        .then((response) => {
          setSuccess(true);
          console.log(response.data);
        });
    } catch (error: any) {
      console.log(error.response);
      setErrorMsg(`Error: ${error.response.message}`);
    }
  };
  return (
    <>
      <Header header="Reset Password" signOut="signOut" headerlinks={[]} />
      <ChangepasswordWrapper>
        <div className="changepasswordForm">
          {success ? (
            <Wrapper>
              <div
                style={{
                  backgroundColor: 'white',
                  height: '20rem',
                  padding: '5rem',
                }}
              >
                <h1>Reset Password</h1>
                <p style={{ marginTop: '1rem' }}>
                  Password changed Successfully.
                </p>
                <Button onClick={(e) => history.push('/login')}>
                  You can Login now
                </Button>
              </div>
            </Wrapper>
          ) : (
            <form onSubmit={submitHandler}>
              <label>
                <h4>New Password</h4>
                <ChangePasswordInput
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  name="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </label>
              <label>
                <h4>Re-Enter New Password</h4>
                <ChangePasswordInput
                  type="password"
                  placeholder="Re-Enter New Password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  required
                />
              </label>
              <ChangePasswordButton>Change Password</ChangePasswordButton>
            </form>
          )}
          <ChangePasswordButton onClick={(e) => history.push('/login')}>
            Back to Login{' '}
          </ChangePasswordButton>
          {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        </div>
      </ChangepasswordWrapper>
    </>
  );
}

export const CancelButton = styled.h5`
  text-align: center;
`;

export const ChangepasswordWrapper = styled.div`
  width: 742px;
  height: 550px;
  margin: 40px auto;
  background: var(--deepGrey-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .changepasswordForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--white-background);
    width: 550px;
    height: 887px;
    padding: 20px;
  }
`;

export const ChangePasswordInput = styled.input`
  background: var(--lightGrey-background);
  border-radius: 8px;
  display: block;
  width: 400px;
  height: 40px;
  border: none;
  margin: 20px 0;
  font-size: 20px;
  font-style: bold;
  padding: 25px;
`;

export const ChangePasswordButton = styled.button`
  width: 400px;
  height: 40px;
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
