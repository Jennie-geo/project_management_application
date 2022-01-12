import React, { FC, useContext, useEffect, useState } from "react";
import People from "./people";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { authContext } from "../../Utils/Authcontext";
import {
  TaskInterface,
  TeamInterface,
  TeamMembersInterface,
} from "../../Interfaces/interface";

const LeftPanel: FC<{ setDetail: Function }> = ({ setDetail }) => {
  const [members, setMembers] = useState<TeamMembersInterface[]>();
  const { teamId } = useParams<{ teamId: string }>();
  const { token } = useContext(authContext);

  useEffect(() => {
    axios
      .request<{
        members: TeamMembersInterface[];
      }>({
        url: `https://kojjac.herokuapp.com/teams/getAllTeamMembers/${teamId}`,
        headers: { token: token! },
      })
      .then((response) => {
        const message = response.data.members;
        setMembers(message);
        console.log("jenny", message);
      });
  }, [teamId]);

  return (
    <div className="container-left">
      <div className="header_nav">
        <header>Members</header>
        <p className="counter">{members ? members.length : 0}</p>
      </div>

      {members ? (
        members.map((el, index) => (
          <div
            key={index}
            onClick={(e) => setDetail(el.user.fullname, el.role, el.tasks, el.user?.profileImage)}
          >
            {/* Avatar={<Avatar>{el.name[0].toUpperCase()}</Avatar>} */}
            <div className="leftsidecontainer">
              {/* <div className="avatar">{el.image}</div> */}
              <Avatar alt="Remy Sharp" src={el.user?.profileImage} />
              <div className="profile_desc">
                <h5 id="user_name">{el.user.fullname}</h5>
                <p className="job_title">{el.role}</p>
              </div>
              <div className="taskNumber">
                <div className="taskNum">{`${el.tasks.length}`}</div>
                <div className="tasks">TASKS</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2 style={{ paddingLeft: "20px" }}>No member exist</h2>
      )}
    </div>
  );
};
export default LeftPanel;
