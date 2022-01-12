import { Avatar } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect, FC, useContext } from "react";
// import { BrowserRouter as Router, Link } from "react-router-dom";
// import Text from "../images/img.jpeg";
// import imgUrl from "../../Images/img.jpeg";
import Image from "../../Assets/Circle.svg";
import { ActivityInterface, TaskInterface } from "../../Interfaces/interface";
import { authContext } from "../../Utils/Authcontext";

const RightPanel: FC<{
  name: String;
  jobtitle: String;
  tasks: TaskInterface[] | undefined;
  profileImage: string
}> = ({ name, jobtitle, tasks, profileImage }) => {
  const imgUrl = "/../../Images/img.jpeg";
  console.log(imgUrl, "imgUrl");
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<ActivityInterface[]>();
  const { token } = useContext(authContext);
  useEffect(() => {
    axios
      .request<{
        activities: ActivityInterface[];
      }>({
        url: "https://kojjac.herokuapp.com/tasks/allactivity",
        method: "get",
        headers: { token: token! },
      })
      .then((response) => {
        console.log("On Right Panel:", response.data);
        setActivities(response.data.activities);
      })
      .catch((err) => {
        console.log("Error");
      });
  }, [name, jobtitle, tasks, profileImage]);
  return loading ? (
    <h1 className="load">Loading data, please wait...</h1>
  ) : (
    <>
      <div className="container-right">
        {/* <div className="profiles_header"> */}

        <div className="profiles">
          <div className="img_container">
            {/* <img src={imgUrl} alt="" className="image_url" /> */}
            <Avatar className ="team__profileImage" alt="Remy Sharp" src={profileImage} />
        
          </div>
          <div className="profileSmallwrap">
            <div className="personalDetails">
              <h1 className="profile_name">{name}</h1>
              <h4 className="job_title">{jobtitle}</h4>
              <p className="country">Nigeria</p>
            </div>
            <p className="right_side_dots">
              {/* <img src={Image} alt="option icon" /> */}
              <i className="fas fa-ellipsis-h"></i>
            </p>
          </div>
        </div>
        <hr className="horizontal" />
        <div className="taskleveldiagram">
          <div className="close_task">
            <p>
              <span>
                {tasks
                  ? tasks.filter((task) => task.status === "done").length
                  : 0}
              </span>
            </p>
            <p>close task</p>
          </div>
          {/* <div className="blue_diagram">blue diagram</div> */}
          <div className="open_task">
            <p>
              <span>
                {tasks
                  ? tasks.filter((task) => task.status !== "done").length
                  : 0}
              </span>
            </p>
            <p>open task</p>
          </div>
          {/* <div className="green_diagram">green diagram</div> */}
        </div>

        <hr className="horizontal" />

        <div className="assignedTask">
          <div className="task_assign_no">
            <h4 className="profile_view">
              {" "}
              Assigned Task{" "}
              <span>
                {tasks
                  ? tasks.filter((task) => task.status !== "done").length
                  : 0}
              </span>
            </h4>
          </div>
          {tasks ? (
            tasks.map((task) => {
              return (
                <div className="design">
                  <p className="icon">
                    <input type="checkbox" />
                  </p>
                  <div className="text">
                    <p className="assignedtext">{task.description}</p>
                    <p className="designtage">{task.tag}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ marginTop: "20px", marginBottom: "10px" }}>
              No task assigned
            </p>
          )}
        </div>

        <hr className="horizontal" />
        <h5 className="lastActivityHeader">Last Activity</h5>
        <div className="lastactivitywrapper">
          {activities ? (
            activities.map((activity) => (
              <div className="lastactivity">
                <div className="lastactivityicon">
                  <i className="far fa-check-circle"></i>
                </div>
                <div className="lastactivitydata">
                  <p className="lastactivitytext">{activity.message}</p>
                  <div className="lastactivitydate">
                    <p className="lastactivitydatemonth">
                      {new Date(activity.createdAt)
                        .toUTCString()
                        .split(" ")
                        .slice(1)
                        .filter(
                          (elem) => !elem.includes("GMT") && !elem.includes(":")
                        )
                        .join(" ")}
                    </p>
                    {/* <p className="lastactivitydatemonth">6:02pm</p> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No activities</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RightPanel;
