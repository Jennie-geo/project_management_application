import axios from "axios";
import { useState, useEffect, FC, useContext } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { ProjectInterface } from "../../Interfaces/interface";
import { authContext } from "../../Utils/Authcontext";
// import Delete from "../../image/Delete.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTeam: FC<{ projects: ProjectInterface[]; getTeams: Function ;onClose:Function}> = ({
  projects,
  getTeams,
  onClose
}) => {
  const [teamName, setTeamName] = useState("");
  const [about, setAbout] = useState("");
  const [projectId, setProjectId] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState("");
  const { token } = useContext(authContext);

  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    //this should prompt the update-[profile end-point
    axios
      .request({
        url: `https://kojjac.herokuapp.com/teams/create/${projectId}`,
        method: "post",
        data: { teamName, about, projectId },
        headers: { token: token! },
        withCredentials: true,
      })
      .then((response: any) => {
        setLoading(false);
        setFailed("Team created successfully");
        toast.success("Team created successfully");
        getTeams();
        console.log(response);
      })
      .catch((err) => {
        setFailed(err.response.data.messsage);
        toast.error(err.response.data.messsage);
        setLoading(false);
        console.log(err.response);
      });
  };

  return (
    <div>
      <Wrapper>
        <ToastContainer />
        <div className="name">
        <h1 onClick={()=>onClose()} className="cancel-btn" title="Close Modal">×</h1> 

          <h1>Add a New Team</h1>
          <BorderBottom />
        </div>
        <Form className="profileForm" onSubmit={submitHandler}>
          <label>
            <h3> Team Name </h3>
            <Input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              type=" text"
              placeholder="Enter Team Name"
              required
            />
          </label>

          <label>
            <h3> About </h3>
            <Input
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              type=" text"
              placeholder="describe team..."
              required
            />
          </label>

          <label>
            <h3> Projects </h3>
            <Select
              name="assignee"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              <option value="">--select project--</option>
              {projects.map((project) => {
                return <option value={project._id}>{project.name}</option>;
              })}
            </Select>
          </label>

          <button disabled={loading} type="submit" className="button">
            {loading ? "Loading" : "Create Team"}
          </button>
          {/* {failed ? <strong className="failure-tag">Failed to update</strong> :  <strong className="failure-tag">Update successful</strong>} */}
          {/* <p>{failed}</p> */}
        </Form>
      </Wrapper>
    </div>
  );
};

export default AddTeam;

const Wrapper = styled.div`
  margin-top: 5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 49vw;
  min-width: 400px;
  /* height: 90vh; */
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
  .teams-input {
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
    /* margin-left: 5px; */
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 5vh; */
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
export const BorderBottom = styled.div`
  margin: 40px 0px;
  border-bottom: 1px solid #ececec;
  width: 45vw;
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
