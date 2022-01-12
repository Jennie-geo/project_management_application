import axios from "axios";
import React, { useContext } from "react";
import styled from "styled-components";
import { useState } from "react";
import { Wrapper, Input, Button } from "../Signup/Signup";
import ChangePasswordTopbar from "../../components/ChangePasswordTopbar";
import { authContext } from "../../Utils/Authcontext";
import Home from "../Home/Home";
import { useHistory } from "react-router-dom";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { token } = useContext(authContext);
  const history = useHistory();
  const [status, setStatus] = useState("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    console.log("changepassword says:", token);
    interface ChangePassword {
      oldPassword: string;
      newPassword: string;
      repeatPassword: string;
      token?: string;
    }

    try {
      await axios
        .request<ChangePassword>({
          url: "https://kojjac.herokuapp.com/users/password/changepassword",
          method: "post",
          data: { oldPassword, newPassword, repeatPassword },
          headers: { token: token! },
          withCredentials: true,
        })
        .then((response) => {
          // alert(response.data.)
          setStatus("Password changed successfully");
        });
    } catch (error: any) {
      setStatus(error.response.data.message);
    }
  };
  return (
    <>
      <ChangePasswordTopbar />
      <ChangepasswordWrapper>
        <div className="changepasswordForm">
          <form onSubmit={submitHandler}>
            <label>
              <h4>Old Password</h4>
              <ChangePasswordInput
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                name="email"
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </label>

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
            <div style={{ color: "red" }}>{status}</div>
            <ChangePasswordButton>Change Password</ChangePasswordButton>
            <CancelButton onClick={(e) => history.push("/profile")}>
              Cancel
            </CancelButton>
          </form>
        </div>
      </ChangepasswordWrapper>
    </>
  );
}

export const CancelButton = styled.h5`
  text-align: center;
  cursor: pointer;
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
