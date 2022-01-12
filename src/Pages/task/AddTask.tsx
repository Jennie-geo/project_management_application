import axios from "axios";
import React, { useState, useEffect, useContext, FC } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { setTimeout } from "timers";
import { useParams } from "react-router-dom";
import { authContext } from "../../Utils/Authcontext";
import { TeamInterface } from "../../Interfaces/interface";
import { ToastContainer, toast } from "react-toastify";

const AddTask: FC<{ teams: TeamInterface[]; projectId: string;onClose:Function;}> = ({
  teams,
  projectId,
  onClose,
}) => {
  type teamType = string[];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [Projects, setProjects] = useState<teamType>([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState("");
  const { token } = useContext(authContext);
  const [dueDate, setDueDate] = useState("");
  const [tag, setTag] = useState("");
  const [teamId, setTeamId] = useState("");
  const [taskStatus, setTaskStatus] = useState("backlog");
  const [assignees, setAssignees] = useState<
    { fullname: string; _id: string }[]
  >([]);

  useEffect(() => {
    console.log("ProjectId:", projectId);
    //load up valid collaborators
    axios
      .request({
        url: `https://kojjac.herokuapp.com/projects/validCollaborators/${projectId}`,
        method: "get",
        headers: { token: token! },
        withCredentials: true,
      })
      .then((response: any) => {
        setLoading(false);
        setAssignees(response.data.assignees);
        console.log("assignees: ", response.data.assignees);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
      });
  }, []);

  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log({
      title,
      description,
      assignee,
      projectId,
      dueDate,
      status: taskStatus,
      tag,
      team: teamId,
    });
    //this should prompt the update-[profile end-point
    axios
      .request({
        url: `https://kojjac.herokuapp.com/tasks/create`,
        method: "post",
        data: {
          title,
          description,
          assignee,
          projectId,
          dueDate,
          status: taskStatus,
          tag,
          team: teamId,
        },
        headers: { token: token! },
        withCredentials: true,
      })
      .then((response) => {
        setLoading(false);
        toast.success("Task created successfully.");
        console.log("Add Task:", response.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error, Unable to create task");
        setFailed(err.response.data.messsage);
        console.log(err.response);
      });
  };

  return (
    <div>
      <Wrapper>
        <ToastContainer></ToastContainer>
        {teams.length < 1 || assignees.length < 1 ? (<>
          <h1 onClick={()=>onClose()} className="cancel-btn" title="Close Modal">×</h1> 

          <p style={{ margin: "5rem" }}>
            Please ensure that you have at least one team channel and at least
            one collaborator to assign task.
          </p>
          </>
        ) : (
          <>
            <div className="name">
            <h1 onClick={()=>onClose()} className="cancel-btn" title="Close Modal">×</h1> 
              <h1>Add a New Task</h1>
              <BorderBottom />
            </div>
            <Form className="profileForm" onSubmit={submitHandler}>
              <label>
                <h3> Title </h3>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type=" text"
                  placeholder="Title of task"
                  required
                />
              </label>

              <label>
                <h3> Description </h3>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type=" text"
                  placeholder="Description of task"
                  required
                />
              </label>

              <label>
                <h3> Assignee </h3>
                <Select
                  name="assignee"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  required
                >
                  <option value={""}>Select Assignee</option>
                  {assignees?.map((item) => {
                    return <option value={item._id}>{item.fullname}</option>;
                  })}
                </Select>
              </label>

              <label>
                <h3> Due Date </h3>
                <Input
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  type="date"
                  required
                />
              </label>

              <label>
                <h3> status </h3>
                <Select
                  name="status"
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                  required
                >
                  <option value="backlog">Backlog</option>;
                  <option value="todo">Todo</option>;
                </Select>
              </label>

              <label>
                <h3> Tag </h3>
                <Input
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  type=" text"
                  placeholder="Tag of task"
                  required
                />
              </label>

              <label>
                <h3> Team </h3>
                <Select
                  name="team"
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                  required
                >
                  <option value="">select team</option>
                  {teams?.map((item) => {
                    return <option value={item._id}>{item.teamName}</option>;
                  })}
                </Select>
              </label>

              <button disabled={loading} type="submit" className="button">
                {loading ? "Loading" : "Create Task"}
              </button>
              {/* {failed ? <strong className="failure-tag">Failed to update</strong> :  <strong className="failure-tag">Update successful</strong>} */}
              <p>{failed}</p>
            </Form>
          </>
        )}
      </Wrapper>
    </div>
  );
};

export default AddTask;

const Wrapper = styled.div`
  margin-top: 5rem;
  padding-top: 1rem;
  padding-bottom: 0.3rem;
  width: 49vw;
  min-width: 400px;
  max-height: 100vh;
  overflow-y: auto;
  background-color: #ffffff;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  .profileForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .button {
    border-radius: 50px;
    background-color: var(--color-green);
    text-align: center;
    width: 40vw;
    min-width: 300px;
    height: 6vh;
    margin: 10px 0;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }
  h3 {
    font-size: 1rem;
  }
  .cancel-btn {
    display: block;
    text-align: right;
    font-weight: bold;
    cursor: pointer;
    color:red;
  }
  .Projects-input {
    width: 40vw;
    min-width: 300px;
    /* height: 6vh; */
    /* min-height: 6vh; */
    background-color: var(--lightGrey-background);
    border-radius: 10px;
    margin: 10px 0;
    display: flex;
    padding: 15px;
    height: 80px;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .team-div {
    margin-left: 5px;
    justify-content: center;
    align-items: center;
  }
  .team-tag {
    background-color: #ffffff;
    border-radius: 20px;
    padding: 10px;
    margin-top: -10px;
    margin-right: 5px;
  }
  .removeTeam {
    cursor: pointer;
  }
  .failure-tag {
    font-style: italic;
    margin: 10px 0px;
    font-color: red;
  }
`;

const Input = styled.input`
  width: 40vw;
  min-width: 300px;
  height: 6vh;
  min-height: 6vh;
  padding: 1rem;
  background-color: var(--lightGrey-background);
  border: none;
  border-radius: 10px;
  margin: 10px 0;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 40vw;
  min-width: 300px;
  height: 6vh;
  min-height: 6vh;
  background-color: var(--lightGrey-background);
  border: none;
  border-radius: 10px;
  margin: 10px 0;
  font-size: 1rem;
`;
export const BorderBottom = styled.div`
  margin: 40px 0px;
  border-bottom: 1px solid #ececec;
  width: 45vw;
`;
