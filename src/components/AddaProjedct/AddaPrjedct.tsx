import axios from "axios";
import React, { useState, useEffect, useContext, FC } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { ProjectInterface, TeamInterface } from "../../Interfaces/interface";
import { setTimeout } from "timers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "../../Utils/Authcontext";
// import Delete from "../../image/Delete.svg";

const AddProject: FC<{ projects: ProjectInterface[]; setProjects: Function ; onClose:Function}> =
  ({ projects, setProjects,onClose }) => {
    type teamType = string[];
    const [projectName, setprojectName] = useState("");
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState("");
    const { token } = useContext(authContext);

    const submitHandler = (e: any) => {
      e.preventDefault();
      setLoading(true);
      //this should prompt the update-[profile end-point
      axios
        .request<{ projectname: String; data?: ProjectInterface }>({
          url: "https://kojjac.herokuapp.com/projects/create",
          method: "post",
          data: { projectname: projectName },
          headers: { token: token! },
          withCredentials: true,
        })
        .then((response) => {
          setLoading(false);
          toast.success("Project created successfully");
          console.log("Success:", response.data);
          setProjects([...projects, response.data.data]);
        })
        .catch((err) => {
          setFailed(err.response.data.message);
          toast.warn(err.response.data.message);
          toast.error("Unable to create project.");
          console.log("Error:", err.response);
          console.log(err);
          toast.error(err.response);
          setLoading(false);
        });
    };

    return (
      <div>
        <Wrapper>
          <ToastContainer />


          <div className="name">
<h1 onClick={()=>onClose()} className="cancel-btn" title="Close Modal">×</h1> 
            <h1>Add a New Project</h1>
            <BorderBottom />
          </div>
          <Form className="profileForm" onSubmit={submitHandler}>
            <label>
              <h3> Name </h3>
              <Input
                value={projectName}
                onChange={(e) => setprojectName(e.target.value)}
                type=" text"
                placeholder="Enter name"
                required
              />
            </label>

            {/* <label>
  const leaveTeamFunc = () => {
    //this should prompt the leave-team end-point
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    //this should prompt the update-[profile end-point
    axios
      .request({
        url: "https://kojjac.herokuapp.com/",
        method: "post",
        data: { projectname: projectName },
        headers: { token: token! },
        withCredentials: true,
      })
      .then((response) => {
        setLoading(false);
        setFailed("Updated successfully");
        console.log("Success:", response.data);
      })
      .catch((err) => {
        setFailed(err.response.data.messsage);
        toast.error("Unable to create project.");
        console.log(err.response);
      });
  };

  return (
    <div>
      <Wrapper>
        <div className="name">
          <h1>Add a New Project</h1>
          <BorderBottom />
        </div>
        <Form className="profileForm" onSubmit={submitHandler}>
          <label>
            <h3> Name </h3>
            <Input
              value={projectName}
              onChange={(e) => setprojectName(e.target.value)}
              type=" text"
              placeholder="Enter name"
            />
          </label>

          {/* <label>
            <h3> Projects </h3>
            <div className="Projects-input">
              {Projects.map((team, index) => {
                return (
                  <>
                    <div className="team-div">
                      <div key={index} className="team-tag">
                        {team}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </label> */}

            <button disabled={loading} type="submit" className="button">
              {loading ? "Loading" : "Create Project"}
            </button>
            <ToastContainer />
            {/* {failed ? <strong className="failure-tag">Failed to update</strong> :  <strong className="failure-tag">Update successful</strong>} */}
          </Form>
        </Wrapper>
      </div>
    );
  };

export default AddProject;

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
export const BorderBottom = styled.div`
  margin: 40px 0px;
  border-bottom: 1px solid #ececec;
  width: 45vw;
`;


