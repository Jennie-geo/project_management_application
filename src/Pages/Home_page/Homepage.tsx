import React, { useState, useEffect, useContext } from "react";
import { Avatar } from "@material-ui/core";
import "./Homepage.css";
import Activity from "./ActivityComponents";
import Header from "../../components/Header";
import { TaskInterface } from "../../Interfaces/interface";
import axios from "axios";
import { authContext } from "../../Utils/Authcontext";
import { TaskCardGroup, DisplayTaskCard } from "../task/DisplayTask";

const Homepage = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>();
  const { token } = useContext(authContext);
  const date = new Date().toString().split(" ")[1];
  console.log(date);
  const currentDate = new Date().toString().split(" ")[2];
  const todayDate = `${date} ${currentDate}`;
  console.log(todayDate);

  useEffect(() => {
    console.log("fetching from api");
    axios
      .request<{
        tasks: TaskInterface[];
      }>({
        url: `https://kojjac.herokuapp.com/tasks`,
        headers: { token: token! },
      })
      .then((response) => {
        setTasks(response.data.tasks);
      });
  }, []);
  return (
    <>
      <Header signOut="Sign Out" header="Home" headerlinks={[]} />

      <div className="main_homepage">
        <div className="task_part">
          <div className="sub_header">
            <h1 className="subheader_text">Completed Tasks</h1>
            <h1 className="subheader_number">
              {tasks
                ? tasks.filter((task) => task.status === "done").length
                : 0}
            </h1>
          </div>

          <div className="subheader_center">
            <TaskCardGroup
              title="Today's Task"
              setOpenTask={() => console.log()}
            >
              {tasks &&
                tasks
                  .filter(
                    (task) =>
                      new Date(task.createdAt).getDate() ===
                        new Date().getDate() && task.status === "todo"
                  )
                  .map((task) => {
                    return (
                      <DisplayTaskCard
                        task={task}
                        handleClick={() => console.log()}
                        title={task.title}
                        tag={task.tag}
                      />
                    );
                  })}
            </TaskCardGroup>
          </div>

          <div className="subheader_end">
            <TaskCardGroup
              title="Pending Task"
              setOpenTask={() => console.log()}
            >
              {tasks &&
                tasks
                  .filter(
                    (task) =>
                      task.status === "backlog" || task.status === "todo"
                  )
                  .map((task) => {
                    return (
                      <DisplayTaskCard
                        task={task}
                        handleClick={() => console.log()}
                        title={task.title}
                        tag={task.tag}
                      />
                    );
                  })}
            </TaskCardGroup>
          </div>
        </div>
        <div className="activity_part">
          <Activity />
        </div>
      </div>
    </>
  );
};

export default Homepage;
// export default {}
