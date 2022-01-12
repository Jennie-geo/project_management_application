import axios from "axios";
import React, { useState, useEffect, useContext, FC } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { authContext } from "../../Utils/Authcontext";
import { ToastContainer, toast } from "react-toastify";
import { ProjectInterface } from "../../Interfaces/interface";
const InviteCollab: FC<{ projects: ProjectInterface[] }> = ({ projects }) => {
  type teamType = string[];
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState("");
  const { token } = useContext(authContext);
  const [projectId, setProjectId] = useState("");

  //   useEffect(() => {
  //     axios
  //       .request({
  //         url: "https://kojjac.herokuapp.com/",
  //         method: "get",
  //         headers: { token: token! },
  //         withCredentials: true,
  //       })
  //       .then((response: any) => {
  //         console.log(response.data.data);
  //       })
  //       .catch((err) => {
  //         console.log(err.response);
  //       });
  //   }, []);

  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log("kayode:", projectId);
    //this should prompt the update-[profile end-point
    axios
      .request({
        url: "https://kojjac.herokuapp.com/projects/invite",
        method: "post",
        data: { email, projectId },
        headers: { token: token! },
        withCredentials: true,
      })
      .then((response: any) => {
        setLoading(false);
        setFailed("Invite sent.");
        toast.success("Invitation sent successfully.");
        console.log(response);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error, Unable to invite collaborator.");
        setFailed(err.response.data.messsage);
        console.log(err.response);
      });
  };

  return (
    <div>
      <Wrapper>
        {projects.length < 1 ? (
          <p style={{ padding: "20px" }}>Please create a project</p>
        ) : (
          <>
            <ToastContainer></ToastContainer>
            <div className="name">
              <h1>Invite Collaborator</h1>
              <BorderBottom />
            </div>
            <Form className="profileForm" onSubmit={submitHandler}>
              <label>
                <h3> Projects </h3>
                <Select
                  name="projectname"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  required
                >
                  <option value="">select project</option>
                  {projects.map((project) => {
                    return <option value={project._id}>{project.name}</option>;
                  })}
                </Select>
              </label>

              <label>
                <h3> Email </h3>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type=" text"
                  placeholder="collaborator email..."
                  required
                />
              </label>

              <button disabled={loading} type="submit" className="button">
                {loading ? "Loading" : "Invite Collaborator"}
              </button>

              <p>{failed}</p>
            </Form>
          </>
        )}
      </Wrapper>
    </div>
  );
};

export default InviteCollab;

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
    text-align: center;
    font-weight: bold;
    cursor: pointer;
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
