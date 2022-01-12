import React, { useContext, useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { AiFillFile } from "react-icons/ai";
import { authContext } from "../../Utils/Authcontext";
import Header from "../../components/Header";
import Home from "../Home/Home";
import styled from "styled-components";
import Image from "@material-ui/icons/Person";
import { useParams } from "react-router-dom";
// import "./file.css";
// import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
export interface IState {
  Files: any[];
}
export default function File() {
  const [Files, setFiles] = useState<{ [key: string]: any }>([]);
  // const [onlineFiles, setonlineFiles]= useState([]);
  const { token } = useContext(authContext);
  const { projectId, projectname } =
    useParams<{ projectId: string; projectname: string }>();
  const headerlinks = [
    { name: "Tasks", link: `/tasks/${projectId}/${projectname}` },
    { name: "Kanban", link: `/kanban/${projectId}/${projectname}` },
    { name: "Activity", link: `/activity/${projectId}/${projectname}` },
    { name: "Files", link: `/file/${projectId}/${projectname}` },
  ];
  useEffect(() => {
    axios
      .request({
        url: `https://kojjac.herokuapp.com/tasks/allFiles/${projectId}`,
        // url: "https://kojjac.herokuapp.com/tasks/allFiles",
        method: "get",
        headers: { token: token! },
      })
      .then((response) => {
        return response.data;
      })
      .then((data: any) => {
        console.log(data);
        setFiles(data.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);
  let style = {
    width: "2%",
    height: "2%",
  };
  return (
    <>
      <Header signOut="signOut" header="File" headerlinks={headerlinks} />
      <Wrapper>
        <div className="file">
          <table className="table">
            {Files.length > 0 && (
              <thead className="head">
                <tr>
                  <td className="image-header">Image</td>
                  <td className="name-header">
                    <BsSearch />
                    name
                  </td>
                  <td className="size-header">size</td>
                  <td className="UploadBy-header">Upload By</td>
                  <td className="Tag-header">Tag</td>
                  <td className="Date-header">Date</td>
                </tr>
              </thead>
            )}
            <tbody className="body">
              {Files.length === 0 && <h1>there are no files available</h1>}
              {Files.map((row: any) => (
                <tr key={row._id} className="row">
                  <td>
                    {}
                    <h4>
                      <AiFillFile />
                    </h4>
                  </td>
                  <td className="name">{row.name}</td>
                  <td className="size">{row.fileSize}</td>
                  <td className="UploadBy">
                    <img className="image" src={row.uploadedBy.profileImage} />
                    {row.uploadedBy.fullname}
                  </td>
                  <td className="Tag">{row.Tag || "Tag"}</td>
                  <td className="Date">{row.uploadedOn}</td>
                  <td>
                    <button
                      className="button"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {" "}
                      actions
                    </button>
                  </td>
                  <td>
                    {}
                    <FiDownload />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <button onClick={getAllFiles}> get file</button> */}
        </div>
        {/* </div> */}
      </Wrapper>
    </>
  );
}
const Wrapper = styled.div`
  margin: 10px;
  width: 97%;
  background-color: #fff;
  height: 100%;
  border-radius: 8px;
  .table {
    padding: 20px;
    width: 100%;
  }
  .head {
    width: 90%;
    margin: 20px;
  }
  .image-header {
    width: 30px;
  }
  .button {
    background: #eaeaea;
    border-radius: 20px;
    /* width: 100%;
    height: 100%; */
    border: none;
    width: 99px;
    height: 40px;
  }
  .body {
    padding: 10px;
    height: 20vh;
    /* border-top: 1px solid grey;
    border-bottom: 1px solid grey; */
  }
  .row {
    height: 7vh;
    /* border-top: 1px solid grey; */
    border-bottom: 1px solid grey;
  }
  .UploadBy {
    border-radius: 20px;
    /* width: 150px; */
  }
`;
//  useEffect(()=>{
//       axios.get("http://localhost:3008/tasks/files",{
//          method:'GET',
//          headers:{ 'Content-Type': 'application/json',"authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjk2ODhjMGQyMjRjN2UwYTI2YjFjOSIsImlhdCI6MTYzNDY0MjcwOCwiZXhwIjoxNjM0NjQ1MTA4fQ.NRkL1ksU_zpMNBnzfzaVQwRcFEHcsulj2JskDLD_Sbg"}
//      })
//      .then(res => console.log(res))
//      .then(data => {
//         //  setFiles(data)
//      })
//      .catch(e =>{
//          console.log("error", e)
//      })
//  },[])
{
  /* <tbody>
                                  {Files.length===0 && <h1>there are no files availab</h1>}
                                {Files.map((row)=> (
                                    <tr key={row._id}>
                                <td>{}<h4><AiFillFile /></h4></td>
                                <td className="name">{row.name}</td>
                                <td className="size">{"24kb"}</td>
                                <td className="UploadBy"><img style={style} src={Image} alt = "profile" />  {"chinedu"}</td>
                                <td className="Tag">{"developer"}</td>
                                <td className="Date">{"2021-10-21"}</td>
                                <td><button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"> actions</button></td>
                                <td>{}<FaFileDownload /></td>
                             </tr>
                            )              
                            ) 
                        }
            
                        </tbody> */
}
{
  /* <tbody>
                                  {Files.length===0 && <h1>there are no files availab</h1>}
                                {Files.map((row)=> (
                                    <tr key={row._id}>
                                <td>{}<h4><AiFillFile /></h4></td>
                                <td className="name">{row.name || "austin"}</td>
                                <td className="size">{row.size || "24kb"}</td>
                                <td className="UploadBy"><img style={style} src={Image} alt = "profile" /> {row.UploadBy || "chinedu"}</td>
                                <td className="Tag">{row.Tag || "developer"}</td>
                                <td className="Date">{row.Date ||"2021-10-21"}</td>
                                <td><button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"> actions</button></td>
                                <td>{}<FaFileDownload /></td>
                             </tr>
                            )              
                            ) 
                        }
            
                        </tbody> */
}
{
  /* <tbody>
                                  {Files.length===0 && <h1>there are no files availab</h1>}
                                {Files.map((row)=> (
                                    <tr key={row}>
                                <td>{}<h4><AiFillFile /></h4></td>
                                <td className="name">{row}</td>
                                <td className="size">{"24kb"}</td>
                                <td className="UploadBy"><img  src={Image} alt = "profile" />  {"chinedu"}</td>
                                <td className="Tag">{"developer"}</td>
                                <td className="Date">{"2021-10-21"}</td>
                                <td><button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"> actions</button></td>
                                <td>{}<FaFileDownload /></td>
                             </tr>
                            )              
                            ) 
                        }
            
                        </tbody> */
}
