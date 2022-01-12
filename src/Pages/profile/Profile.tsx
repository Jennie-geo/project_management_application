/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { useState, useEffect, useContext, ChangeEvent, FC } from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { authContext } from '../../Utils/Authcontext';
import Header from '../../components/Header';
const Profile: FC<{ setNavDisplayPicture: (a: string) => void }> = ({
  setNavDisplayPicture,
}) => {
  type teamType = string[];
  const [fullname, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [profileImage, setProfileImage] = useState<File>();
  const [profileImgUrl, setProfileImgUrl] = useState('');
  const [about, setAbout] = useState('');
  const [teams, setTeams] = useState<teamType>([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState('');
  const [file, setFile] = useState('');
  const { token } = useContext(authContext);
  ////test array of teams
  const teamsArr = [
    'Front-end',
    'middle-end',
    'Front-end',
    'middle-end',
    'Front-end',
    'middle-end',
  ];
  useEffect(() => {
    changePicFile();
  }, [profileImage]);
  useEffect(() => {
    setTeams(teamsArr); //the getAllteams endpoint
    axios
      .request({
        url: 'https://kojjac.herokuapp.com/users/profile',
        method: 'get',
        headers: { token: token! },
        withCredentials: true,
      })
      .then((response: any) => {
        setFullName(response.data.data.fullname);
        setRole(response.data.data.role);
        setGender(response.data.data.gender);
        setLocation(response.data.data.location);
        setAbout(response.data.data.about);
        setProfileImgUrl(response.data.data.profileImage);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    //getting the teams the user is on
    // axios.request({
    // url: "https://kojjac.herokuapp.com/users/profile",
    // })
  }, []);
  const cancelAll = () => {
    setFullName('');
    setRole('');
    setGender('');
    setLocation('');
    setAbout('');
    //i don't know if the teams should also be cancelled
  };
  const leaveTeamFunc = () => {
    //this should prompt the leave-team end-point
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);
    //this should prompt the update-[profile end-point
    axios
      .request({
        url: 'https://kojjac.herokuapp.com/users/profile',
        method: 'put',
        data: { fullname, role, gender, location, about },
        headers: { token: token! },
        withCredentials: true,
      })
      .then((response: any) => {
        setLoading(false);
        setFailed('Updated successfully');
        console.log(response);
      })
      .catch((err) => {
        setFailed(err.response.data.messsage);
        console.log(err.response);
      });
  };
  function handleImgChange(e: ChangeEvent<HTMLInputElement>) {
    setProfileImage(e.target.files![0]);
  }
  const changePicFile = () => {
    // e.preventDefault() ///to allow the reload of the page when the pic is changed
    const formData = new FormData();
    formData.append('file', profileImage as File);
    axios
      .request({
        url: 'https://kojjac.herokuapp.com/users/uploadProfile',
        method: 'post',
        data: formData,
        headers: { token: token! },
      })
      .then((response: any) => {
        setLoading(false);
        // console.log("Change PicFile says: ", response);
        setProfileImgUrl(response.data.data.profileImage);
        setNavDisplayPicture(response.data.data.profileImage);
      })
      .catch((err) => {
        setFailed(err.response.data.messsage);
        // alert(err.response.message);
        console.log(err.response);
      });
  };
  const headerlinks = [
    {
      name: 'Profile',
      link: '/profile',
    },
    {
      name: 'Change Password',
      link: '/changepassword',
    },
  ];
  return (
    <>
      <Header
        header="Profile Settings"
        signOut="Sign Out"
        headerlinks={headerlinks}
      ></Header>
      <Wrapper>
        <div className="image">
          {/* <div onClick={changePic} className="change-pic-div">change</div> */}
          <label className="change-pic-div" htmlFor="change">
            Change
          </label>
          <input
            className="change-pic-div"
            onChange={handleImgChange}
            // onClick={(e) => changePicFile(e)}
            accept="Image/"
            type="file"
            style={{ visibility: 'hidden' }}
            id="change"
          />
          <img src={profileImgUrl} alt="avatar" />
        </div>
        <Form className="profileForm" onSubmit={submitHandler}>
          <label>
            <h3> Name </h3>
            <Input
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              type=" text"
              placeholder="Enter name"
            />
          </label>
          <label>
            <h3> Role </h3>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              type=" text"
              placeholder="Role"
            />
          </label>
          <label>
            <h3> Gender </h3>
            <Input
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              type=" text"
              placeholder="Male"
            />
          </label>
          <label>
            <h3> Location </h3>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type=" text"
              placeholder="Location "
            />
          </label>
          <label>
            <h3> About</h3>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="about-textBox"
              placeholder="About"
            />
          </label>
          <button disabled={loading} type="submit" className="button">
            {loading ? 'Loading' : 'Update Profile'}
          </button>
          {/* {failed ? <strong className="failure-tag">Failed to update</strong> :  <strong className="failure-tag">Update successful</strong>} */}
          <p>{failed}</p>
          <p className="cancel-btn" onClick={cancelAll}>
            {' '}
            Cancel
          </p>
        </Form>
      </Wrapper>
    </>
  );
};
export default Profile;
const Wrapper = styled.div`
  margin-top: 2rem;
  padding-top: 100px;
  padding-bottom: 1rem;
  width: 49vw;
  min-width: 400px;
  max-height: 85vh;
  background-color: #ffffff;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  margin-bottom: 50px;
  .profileForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #ffffff;
    position: relative;
    margin-bottom: 30px;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    /* position: absolute;
    clip-path: circle(); */
  }
  .change-pic-div {
    width: 95px;
    height: 24px;
    background-color: #eaeaea;
    position: absolute;
    top: 96px;
    left: 12px;
    cursor: pointer;
    border-radius: 0 0 50% 50%;
    /* opacity: 0.7; */
    border: none;
    outline: 0;
    font-weight: 300;
    text-align: center;
  }
  .change-pic-div::-webkit-file-upload-button {
    border: none;
    display: none;
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
  .about-textBox {
    padding: 10px;
    margin: 10px 0;
    width: 40vw;
    height: 15vh;
    border: none;
    border-radius: 10px;
    background-color: var(--lightGrey-background);
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
    color: red;
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
