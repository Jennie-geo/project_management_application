import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import PersonOutlineIcon from "@mui/material/Avatar";
import { authContext } from "../../Utils/Authcontext";
import { ActivitiesArray } from "./Activity-data";
import { useParams } from "react-router-dom";
import { ActivityInterface } from "../../Interfaces/interface";
const Activity = () => {
  const [loading, setLoading] = useState(true);
  const [todayActivities, setTodayActivities] = useState<ActivityInterface[]>(
    []
  );
  const { token } = useContext(authContext);
  const { projectId, projectname } =
    useParams<{ projectId: string; projectname: string }>();
  console.log(projectId);
  useEffect(() => {
    axios
      .request({
        url: `https://kojjac.herokuapp.com/tasks/allactivity`,
        method: "get",
        headers: { token: token! },
      })
      .then((response: any) => {
        // return response.data;
        setLoading(false);
        setTodayActivities(response.data.activities);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);
  return (
    <>
      <Wrapper>
        <h2 className="activity-header">Activity</h2>
        <p className="day">Today</p>
        {todayActivities.length > 0 ? (
          <div>
            {todayActivities.map((activity: ActivityInterface) => {
              let { createdAt, message, _id } = activity;
              createdAt = new Date(createdAt).toLocaleTimeString("en-US", {
                hour: "numeric",
                hour12: true,
                minute: "2-digit",
              });
              return (
                <div key={_id} className="activity">
                  <div className="icon-class">
                    <PersonOutlineIcon />
                  </div>
                  <div className="textAndTime">
                    <p className="activity-text">{message}</p>
                    <p className="activity-time">{createdAt}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <p> no activity created today</p>
          </div>
        )}
      </Wrapper>
    </>
  );
};
export default Activity;
const Wrapper = styled.div`
  flex: 0.2;
  background-color: #ffffff;
  padding: 30px 25px; ///to start with
  height: 85vh;
  overflow-y: scroll;
  .activity-header {
    font-style: bold;
    margin-bottom: 25px;
  }
  .day {
    color: #808080;
  }
  .activity {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 15px;
    margin-bottom: 15px;
    /* position: relative; */
  }
  .activity-icon {
    background-color: #cef9c6;
    padding: 15px;
    border-radius: 50%;
    margin-right: 30px;
    /* position: absolute;
        top: 0;
        left: 0; */
    z-index: 10;
  }
  .activity-text {
    margin-bottom: 10px;
  }
  .icon-class {
    display: flex;
    position: relative;
  }
  .timeline {
    height: 40vh;
    /* color: #808080; */
    border-left: 1px solid lightgray;
    position: absolute;
    left: 28%;
  }
  .activity-time {
    color: #808080;
    margin-bottom: 25px;
  }
  .file-style {
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
  }
  .file-upload {
    width: 45px;
    height: 45px;
    border-radius: 5px;
  }
`;
