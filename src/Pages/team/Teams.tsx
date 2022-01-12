import React, { Fragment, useState, useEffect } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
// import "../index.css";
import Home from "../Home/Home";
import Header from "../../components/Header";
import "./teamstyles.css";
import { TaskInterface } from "../../Interfaces/interface";

const Teams = () => {
  const [name, setname] = useState("");
  const [jobtitle, setjobtitle] = useState("");
  const [tasks, setTasks] = useState<TaskInterface[]>();
  const [profileImage, setProfileImage] = useState("")

  function setDetail(name: string, job: string, tasks: TaskInterface[], profileImage: string) {
    setname(name);
    setjobtitle(job);
    setTasks(tasks);
    setProfileImage(profileImage)
  }

  const headerlinks = [
    {
      name: "",
      link: "",
    },
  ];

  return (
    <>
      <div className="headerWrapper">
        <Header
          header="Designers"
          signOut="SignOut"
          headerlinks={headerlinks}
        />
      </div>
      <div className="wrapper">
        <div className="container">
          <LeftPanel setDetail={setDetail} />
          <RightPanel name={name} jobtitle={jobtitle} tasks={tasks} profileImage={profileImage}  />
        </div>
      </div>
    </>
  );
};

export default Teams;
