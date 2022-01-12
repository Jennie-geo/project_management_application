import { authContext } from '../../Utils/Authcontext';
import { useContext, useEffect, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Statistics } from '../../components/Sidebar/sidebar.styles.';
import Image from '../../Images/profile2.png';
import Icon from '../../Assets/design.svg';
import Logo from '../../Assets/logo.svg';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import AddTeam from '../../components/Add A Team/AddTeam';
import ProtectedRoute from '../../Utils/ProtectedRoute';
import Switch from 'react-bootstrap/esm/Switch';
import Profile from '../profile/Profile';
import ChangePassword from '../changePassword/ChangePassword';
import Teams from '../team/Teams';
import useAxios from 'axios-hooks';
import { Avatar } from '@material-ui/core';
import {
  ProjectInterface,
  TaskInterface,
  TeamInterface,
} from '../../Interfaces/interface';
import AddProject from '../../components/AddaProjedct/AddaPrjedct';
import File from '../filesPage/File';
import { DisplayTask } from '../task/DisplayTask';
import AddTask from '../task/AddTask';
import Homepage from '../Home_page/Homepage';
import Kanban from '../Kanban/Kanban.js';
import Load from '../../components/Loading/loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InviteCollaborator from '../team/InviteCollab';
import Activities from '../activityPage/Activities';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
const useStylesProject = makeStyles((theme) => ({
  projectModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
const Home: FC<{}> = ({ children }) => {
  console.log('renderi');
  const backendUrl = process.env.REACT_APP_BACKEND_URL as string;
  const { token, signOut } = useContext(authContext);
  const [loading, setLoading] = useState(true);
  const [serverResponse, setResponse] = useState('');
  const [user, setUser] = useState<{ [key: string]: any }>({ name: '' });
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [toggle, setToggle] = useState(true);
  const [teams, setTeams] = useState<TeamInterface[]>();
  const [tasks, setTasks] = useState<TaskInterface[]>();
  const [taskCompleted, setTaskCompleted] = useState('');
  const [taskOpened, setTaskOpened] = useState('');
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [openTask, setOpenTask] = useState(false);
  const [openCollaboratorModal, setOpenCollabModal] = useState(false);
  const [modalProjectId, setModalProjectId] = useState('');
  const [
    {
      data: profileData,
      loading: profileLoading,
      error: profileError,
      response,
    },
    refetchProfile,
    cancelProfileFetch,
  ] = useAxios({
    url: backendUrl + '/users/profile',
    headers: {
      token: token as string,
    },
    method: 'GET',
  });

  const [
    {
      data: projectData,
      loading: projectLoading,
      error: projectError,
      response: projectResponse,
    },
  ] = useAxios({
    url: backendUrl + '/projects/getproject',
    headers: {
      token: token as string,
    },
    method: 'GET',
  });

  //update the user and profile image
  useEffect(() => {
    if (profileError) {
      history.push('/login');
      signOut();
    }
    if (profileData) {
      console.log('profile effect:', profileData);
      profileData && setUser(profileData.data);
      profileData && setImgUrl(profileData.data.profileImage);
      setLoading(false);
    }
  }, [profileData, profileError]);

  //update the project
  useEffect(() => {
    if (!projectLoading) {
      setProjects(projectData.projects);
      getAllTasksForUser();
      setLoading(false);
    }
  }, [projectLoading]);

  //

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = () => {
    console.log('getting the teams');
    axios
      .request<{ teams: TeamInterface[] }>({
        url: 'https://kojjac.herokuapp.com/teams/all',
        method: 'get',
        headers: { token: token! },
      })
      .then((response) => {
        console.log(response.data.teams);
        setTeams(response.data.teams);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getAllTasksForUser = () => {
    axios
      .request<{ tasks: TaskInterface[]; completed: string; open: string }>({
        url: 'https://kojjac.herokuapp.com/tasks',
        method: 'get',
        headers: { token: token! },
      })
      .then((response) => {
        setTasks(response.data.tasks);
        setTaskOpened(response.data.open);
        setTaskCompleted(response.data.completed);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleSignOut = () => {
    signOut();
    history.push('/login');
  };

  const setprojectIdForModal = (newProjectId: string) => {
    setModalProjectId(newProjectId);
  };

  const showSidebar = () => {
    setToggle(!toggle);
    let sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('open');
  };

  const classes = useStyles();
  const classe = useStylesProject();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenProject = () => {
    setOpenProject(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseProject = () => {
    setOpenProject(false);
  };

  const handleCloseTask = () => {
    setOpenTask(false);
  };

  const handleCloseCollaborator = () => {
    setOpenCollabModal(false);
  };

  return loading ? (
    <Load />
  ) : (
    <>
      <Grid>
        <div className="sidebar open">
          <div className="logo-details">
            <i className="bx bxl-c-plus-plus icon">
              <img
                style={{ width: '30%', marginRight: '1%' }}
                src={Logo}
                alt="logo"
              />
            </i>
            <div className="logo_name">PROJECTUS</div>
            <i className="bx bx-menu" onClick={showSidebar} id="btn">
              <svg fill="#fff" viewBox="0 0 100 80" width="20" height="20">
                <rect width="100" height="20"></rect>x
                <rect y="30" width="100" height="20"></rect>
                <rect y="60" width="100" height="20"></rect>
              </svg>
            </i>
          </div>
          <ul className="nav-list">
            <li className="profile">
              <div className="profile-details">
                <Avatar
                  style={{ borderRadius: '50%' }}
                  src={imgUrl}
                  alt="profileImg"
                />
                <div className="name_job">
                  <div
                    className="name"
                    onClick={(e) => history.push('/profile')}
                    style={{ cursor: 'pointer' }}
                  >
                    {user.fullname}
                  </div>
                  <div className="job" style={{ cursor: 'pointer' }} id="job">
                    Product Owner
                  </div>
                </div>
                <i
                  style={{ color: '#878787', cursor: 'pointer' }}
                  className="fas fa-ellipsis-h"
                ></i>
              </div>

              <i className="bx bx-log-out" id="log_out"></i>
            </li>
            {/* Statistics  */}
            <li>
              <Statistics className="stats">
                <div className="stats__left">
                  <h1>{taskCompleted}</h1>
                  <p id="tag">completed Tasks</p>
                </div>
                <div className="stats__right">
                  <h1>{taskOpened}</h1>
                  <p id="tag">Open Taks</p>
                </div>
              </Statistics>
            </li>
            <li>
              <i className="bx bx-search">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.6084 13.7175L12.1325 10.2417C12.114 10.2232 12.0924 10.2103 12.0731 10.1931C12.757 9.15561 13.1562 7.91371 13.1562 6.57816C13.1562 2.94512 10.2111 0 6.57809 0C2.94512 0 0 2.94512 0 6.57809C0 10.211 2.94506 13.1562 6.57803 13.1562C7.91364 13.1562 9.15549 12.757 10.193 12.0731C10.2102 12.0923 10.223 12.114 10.2415 12.1324L13.7175 15.6084C14.2396 16.1305 15.0862 16.1305 15.6084 15.6084C16.1305 15.0863 16.1305 14.2397 15.6084 13.7175ZM6.57809 10.8758C4.20448 10.8758 2.28035 8.95164 2.28035 6.57809C2.28035 4.20448 4.20455 2.28035 6.57809 2.28035C8.95158 2.28035 10.8758 4.20455 10.8758 6.57809C10.8758 8.95164 8.95158 10.8758 6.57809 10.8758Z"
                    fill="white"
                  />
                </svg>
              </i>
              <input type="text" placeholder="Search..." />
            </li>
            <li>
              <a href="#">
                <span className="links_name" id="menu">
                  MENU
                </span>
              </a>
              <span className="tooltip">Menu</span>
            </li>
            <li>
              <Link to="/home">
                <span className="links_name">Home</span>
              </Link>
              <span className="tooltip">Home</span>
            </li>
            {/* <li>
              <Link to="/tasks">
                <span className="links_name">My Tasks</span>
              </Link>
              <span className="tooltip">My Tasks</span>
            </li> */}
            {/* <li>
              <a href="#">
                <span className="links_name">Notifications</span>
              </a>
              <span className="tooltip">Notifications</span>
            </li> */}
            <li>
              <Link to="#">
                <span className="links_name" id="menu">
                  PROJECTS
                </span>
              </Link>
              <span className="tooltip">PROJECTS</span>
            </li>
            {projects?.map((project) => {
              return (
                <li>
                  <Link to={`/tasks/${project._id}/${project.name}`}>
                    <img
                      style={{ width: '8%', height: '8%' }}
                      src={Icon}
                      alt="icon"
                    />
                    <span className="links_name">{project.name}</span>
                  </Link>
                  <span className="tooltip">{project.name}</span>
                </li>
              );
            })}
            <li>
              <span className="tooltip">Notifications</span>
            </li>
            <li>
              <a href="#">
                <Button onClick={handleOpenProject}>
                  <span className="links_name" id="add">
                    +Add a Project
                  </span>
                </Button>

                {/* modal to create project */}
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classe.projectModal}
                  open={openProject}
                  onClose={handleCloseProject}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openProject}>
                    <div>
                      <AddProject
                        projects={projects as ProjectInterface[]}
                        setProjects={setProjects}
                        onClose={handleCloseProject}
                      />
                    </div>
                  </Fade>
                </Modal>
                {/* modal for adding new task */}
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={openTask}
                  onClose={handleCloseTask}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openTask}>
                    <div>
                      <AddTask
                        teams={teams as TeamInterface[]}
                        projectId={modalProjectId}
                        onClose={handleCloseTask}
                      />
                    </div>
                  </Fade>
                </Modal>
              </a>
            </li>
            <li>
              <Link to="/teams">
                <span className="links_name" id="menu">
                  TEAMS
                </span>
              </Link>
              <span className="tooltip">TEAMS</span>
            </li>
            {teams?.map((team) => {
              return (
                <li>
                  <Link to={`/teams/${team._id}`}>
                    <span className="links_name">{team.teamName}</span>
                  </Link>
                  <span className="tooltip">{team.teamName}</span>
                </li>
              );
            })}
            <li>
              <a href="#">
                <Button onClick={handleOpen}>
                  <span className="links_name" id="add">
                    {' '}
                    +Add Team
                  </span>
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <div>
                      <AddTeam
                        projects={projects}
                        getTeams={getTeams}
                        onClose={handleClose}
                      />
                    </div>
                  </Fade>
                </Modal>
                {/* modal for inviting collaborators */}
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={openCollaboratorModal}
                  onClose={handleCloseCollaborator}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openCollaboratorModal}>
                    <div>
                      <InviteCollaborator projects={projects} />
                    </div>
                  </Fade>
                </Modal>
              </a>
              <span className="tooltip">Notifications</span>
            </li>
          </ul>
          <div id="invite__container">
            <span className="invite__text">
              <Link
                id="invite"
                to="#"
                onClick={(e) => setOpenCollabModal(true)}
              >
                Invite your team{' '}
              </Link>
              <span id="collaborate">and start collaborating</span>
            </span>
          </div>
        </div>
        <section className="home-section">
          <Switch>
            <ProtectedRoute path="/profile">
              <Profile setNavDisplayPicture={setImgUrl} />
            </ProtectedRoute>

            <ProtectedRoute path="/home">
              <Homepage />
            </ProtectedRoute>
            <ProtectedRoute path="/changepassword">
              <ChangePassword />
            </ProtectedRoute>
            <ProtectedRoute path="/teams/:teamId">
              <Teams />
            </ProtectedRoute>
            <ProtectedRoute path="/file/:projectId/:projectname">
              <File />
            </ProtectedRoute>

            <ProtectedRoute path="/tasks/:projectId/:projectname">
              <DisplayTask
                setOpenTask={setOpenTask}
                setprojectIdForModal={setprojectIdForModal}
              />
            </ProtectedRoute>

            <ProtectedRoute path="/kanban/:projectId/:projectname">
              <Kanban updateTask={getAllTasksForUser} />
            </ProtectedRoute>

            <ProtectedRoute path="/activity/:projectId/:projectname">
              <Activities />
            </ProtectedRoute>

            <ProtectedRoute path="/">
              <Homepage />
            </ProtectedRoute>
          </Switch>
        </section>
      </Grid>
    </>
  );
};
export default Home;
