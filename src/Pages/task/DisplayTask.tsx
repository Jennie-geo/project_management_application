import styled from "styled-components";
import { FC, useContext, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Header from "../../components/Header";
import TaskDescription from "./TaskDescription";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TaskInterface } from "../../Interfaces/interface";
import { authContext } from "../../Utils/Authcontext";
import useAxios from "axios-hooks";

export const DisplayTask: FC<{
  setOpenTask: Function;
  setprojectIdForModal: Function;
}> = ({ setOpenTask, setprojectIdForModal }) => {
  const { projectId, projectname } =
    useParams<{ projectId: string; projectname: string }>();
  // const [backlogs, setBacklogs] = useState<TaskInterface[]>([]);
  // const [todos, setTodos] = useState<TaskInterface[]>([]);
  // const [done, setDone] = useState<TaskInterface[]>([]);
  // const [loading, setLoading] = useState(false);
  const { token } = useContext(authContext);
  const [taskForDetail, setTaskForDetail] = useState<TaskInterface>();
  const [{ data, loading, error, response }, refetch, manualCancel] = useAxios({
    url: `${
      process.env.REACT_APP_BACKEND_URL as string
    }/tasks/getTasks/${projectId}/backlog`,
    headers: { token: token! },
    method: "get",
  });
  // useEffect(() => {
  //   console.log("using effect... projectId:", projectId);
  //   refetch();
  // }, [projectId]);

  if (error) {
    return <p> Check your console log to see what I am doing?</p>;
  }

  const headerlinks = [
    { name: "Tasks", link: `/tasks/${projectId}/${projectname}` },
    { name: "Kanban", link: `/kanban/${projectId}/${projectname}` },
    { name: "Activity", link: `/activity/${projectId}/${projectname}` },
    { name: "Files", link: `/file/${projectId}/${projectname}` },
  ];
  console.log("kayode:", data);
  // const { todo: todos, backlog: backlogs, done } = data.tasks;
  const todos = (data.tasks.todo as TaskInterface[]) || [];
  const backlogs = (data.tasks.backlogs as TaskInterface[]) || [];
  const done = (data.tasks.done as TaskInterface[]) || [];

  // (function () {
  //   const { todo, backlog, done } = data.tasks;
  //   setTodos(todo);
  //   setBacklogs(backlog);
  //   setDone(done);
  // })();

  // function rerender() {
  //   setTaskForDetail(undefined);
  //   //set projectId for parent
  //   setprojectIdForModal(projectId);
  //   //get task with backlog status
  //   axios
  //     .request<{
  //       tasks: {
  //         todo: TaskInterface[];
  //         backlog: TaskInterface[];
  //         done: TaskInterface[];
  //       };
  //     }>({
  //       url: `${
  //         process.env.REACT_APP_BACKEND_URL as string
  //       }/tasks/getTasks/${projectId}/backlog`,
  //       headers: { token: token! },
  //       method: "get",
  //     })
  //     .then((response) => {
  //       const { todo, backlog, done } = response.data.tasks;
  //       setTodos(todo);
  //       setBacklogs(backlog);
  //       setDone(done);
  //       console.log("Success:", response.data.tasks);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log("Error, unable to get Task by status");
  //     });
  // }

  return (
    <div>
      <Header
        signOut="signOut"
        header={`${projectname}`}
        headerlinks={headerlinks}
      />
      <div style={{ display: "flex" }}>
        <DisplayTaskContainer>
          <TaskCardGroup title={"Backlog"} setOpenTask={setOpenTask}>
            {backlogs.length > 0 ? (
              backlogs.map((backlog) => (
                <DisplayTaskCard
                  title={backlog.title as string}
                  tag={backlog.tag as string}
                  task={backlog}
                  handleClick={setTaskForDetail}
                />
              ))
            ) : (
              <p>No backlogs</p>
            )}
          </TaskCardGroup>

          <TaskCardGroup title={"Todo"} setOpenTask={setOpenTask}>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <DisplayTaskCard
                  title={todo.title as string}
                  tag={todo.tag as string}
                  task={todo}
                  handleClick={setTaskForDetail}
                />
              ))
            ) : (
              <p>No todos</p>
            )}
          </TaskCardGroup>

          <TaskCardGroup title={"Done"} setOpenTask={setOpenTask}>
            {done.length > 0 ? (
              done.map((task_done) => (
                <DisplayTaskCard
                  title={task_done.title as string}
                  tag={task_done.tag as string}
                  task={task_done}
                  handleClick={setTaskForDetail}
                />
              ))
            ) : (
              <p>No task is done</p>
            )}
          </TaskCardGroup>
        </DisplayTaskContainer>
        <TaskDescription
          myTask={taskForDetail}
          rerender={refetch}
          handleUpdate={setTaskForDetail}
        />
      </div>
    </div>
  );
};

export const DisplayTaskCard: FC<{
  task: TaskInterface;
  handleClick: Function;
  title: string;
  tag: string;
  avatarUrl?: string;
}> = ({ title, tag, avatarUrl = "", handleClick, task }) => {
  const tagColorAndBg = generateRandomFontColor();

  return (
    <CardBody
      onClick={(e) => handleClick(task)}
      custom_background={generateRandomHexColor()}
    >
      <div style={{ display: "flex", margin: " 10px 0" }}>
        <TaskCardCheckBox type="checkbox" />
        <h3
          style={{
            display: "inline-block",
            marginLeft: "20px",
            lineHeight: "27px",
          }}
        >
          {title}
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          marginLeft: "29px",
          alignItems: "center",
        }}
      >
        <div>
          {avatarUrl ? <Avatar src={avatarUrl} /> : <AccountCircleIcon />}
        </div>
        <TagContainer
          custom_color={tagColorAndBg.color}
          background={tagColorAndBg.background}
        >
          {tag}
        </TagContainer>
      </div>
    </CardBody>
  );
};

export const TaskCardGroup: FC<{ title: string; setOpenTask: Function }> = ({
  title,
  children,
  setOpenTask,
}) => {
  return (
    <TaskCardGroupContainer>
      <TaskCardGroupHeader>
        <h1 style={{ display: "inline-block" }}>{title}</h1>
        <AddTaskDiv onClick={(e) => setOpenTask(true)}>+ Add Task</AddTaskDiv>
      </TaskCardGroupHeader>
      <TaskCardGroupBody>{children}</TaskCardGroupBody>
    </TaskCardGroupContainer>
  );
};

export function generateRandomHexColor() {
  const colors = ["#F7F6F3", "#FFF8DD", "#EAEAEA"];
  const randomIndex = Math.floor(Math.random() * colors.length + 0);
  return colors[randomIndex];
}

export function generateRandomFontColor() {
  const backgroundOpacity = 0.1;
  const colors = [
    { color: [237, 100, 0, 1], background: [237, 100, 0, backgroundOpacity] },
    { color: [118, 76, 237, 1], background: [118, 76, 237, backgroundOpacity] },
    { color: [25, 117, 208, 1], background: [25, 117, 208, backgroundOpacity] },
  ];
  const randomIndex = Math.floor(Math.random() * colors.length + 0);
  return colors[randomIndex];
}

const DisplayTaskContainer = styled.div`
  background-color: white;
  width: 45% !important;
  padding: 30px;
  height: 82vh;
  margin-top: 5px;
  margin-bottom: 50px;
  overflow-y: auto;
`;

const CardBody = styled.div<{ custom_background: string }>`
  background-color: ${(props) => props.custom_background};
  margin: 20px 0;
  padding: 20px 20px;
  border-radius: 20px;
`;
const TaskCardGroupContainer = styled.div`
  background-color: white;
  margin-bottom: 40px;
`;
const TaskCardGroupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TaskCardGroupBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const AddTaskDiv = styled.div`
  background-color: #cef9c6;
  border-radius: 20px;
  padding: 15px 25px;
  font-weight: bold;
  cursor: pointer;
`;

const TaskCardCheckBox = styled.input`
  display: inline-block;
  border: 1px solid #000000;
  margin-top: 10px;
`;
const TagContainer = styled.div<{
  background: number[];
  custom_color: number[];
}>`
  font-weight: bold;
  line-height: 20px;
  font-family: Heebo;
  color: rgba(${(props) => props.custom_color.join()});
  background-color: rgba(${(props) => props.background.join()});
  padding: 4px 10px;
  border-radius: 20px;
  margin-left: 10px;
  text-transform: uppercase;
  font-weight: bold;
`;
