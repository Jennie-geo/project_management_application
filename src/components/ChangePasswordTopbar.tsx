import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function ChangePasswordTopbar() {
  return (
    <ChangePasswordTopbarWrap >
      <div className="header">
        <h1>Change Password</h1>
      </div>
      <Links>
        <li>
          <Link className="linktag" to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link className="linktag" to="/changepassword">
            Change Password
          </Link>
        </li>
      </Links>
    </ChangePasswordTopbarWrap>
  );
}

export const Links = styled.ul`
  display: flex;
  justify-content: left;
  align-items: center;
  li {
    list-style-type: none;
    margin: 20px;
    .linktag {
      text-decoration: none;
      color: #000000;
    }
    .linktag:hover {
      padding: 18px 0;
      border-bottom: 3px solid #ffc200;
    }
  }
`;
export const ChangePasswordTopbarWrap = styled.div`
  width: 100%;
  height: 136px;
  background-color: #ffffff;
  .header {
    padding: 20px;
  }
`;
