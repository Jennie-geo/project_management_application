import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import PersonOutlineIcon from '@mui/material/Avatar';
import axios from 'axios';
import { authContext } from '../../Utils/Authcontext';
import Header from '../../components/Header';
import './activity.css';
import { useParams } from 'react-router-dom';
import { ActivityInterface } from '../../Interfaces/interface';
interface IComment {
  src: string;
  comment: string;
}
const Activities = () => {
  const [loading, setLoading] = useState(true);
  const [todayActivities, setTodayActivities] = useState<ActivityInterface[]>(
    []
  );

  const { token } = useContext(authContext);
  const { projectId, projectname } =
    useParams<{ projectId: string; projectname: string }>();
  const headerlinks = [
    { name: 'Tasks', link: `/tasks/${projectId}/${projectname}` },
    { name: 'Kanban', link: `/kanban/${projectId}/${projectname}` },
    { name: 'Activity', link: `/activity/${projectId}/${projectname}` },
    { name: 'Files', link: `/file/${projectId}/${projectname}` },
  ];

  useEffect(() => {
    axios
      .request({
        url: 'https://kojjac.herokuapp.com/tasks/allactivity',
        method: 'get',
        headers: { token: token! },
      })
      .then((response: any) => {
        console.log(response.data);
        setLoading(false);
        setTodayActivities(response.data.activities);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);
  return (
    <>
      <Header signOut="signOut" header="File" headerlinks={headerlinks} />
      <Wrapper>
        {loading ? (
          <p>Loading Activity please wait</p>
        ) : (
          <div>
            <h1 className="day">Today</h1>

            {todayActivities.length > 0 ? (
              <div>
                {todayActivities.map((activity) => {
                  let { createdAt, message, _id } = activity;
                  createdAt = new Date(createdAt).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    hour12: true,
                    minute: '2-digit',
                  });
                  return (
                    <div key={_id} className="activity">
                      <div className="description">
                        <div className="icon-container">
                          <PersonOutlineIcon />
                        </div>
                        <p className="activityText">{message}</p>
                        <p className="time">{createdAt}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <p> no activity created today</p>
              </div>
            )}
            <h1 className="day">Yesterday</h1>
            {todayActivities
              .filter(
                (activity) =>
                  new Date(activity.createdAt).getDate() ===
                  new Date().getDate() - 1
              )
              .map((activity) => {
                let { createdAt, message, _id } = activity;
                createdAt = new Date(createdAt).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  hour12: true,
                  minute: '2-digit',
                });
                return (
                  <div key={_id} className="activity">
                    <div className="description">
                      <div className="icon-container">
                        <PersonOutlineIcon />
                      </div>
                      <p className="activityText">{message}</p>
                      <p className="time">{createdAt}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </Wrapper>
    </>
  );
};
function Comment(props: IComment) {
  return (
    <>
      <div className="comment">
        <img className="profile-img" src={props.src} alt="icon" />
        <p className="profile-comment">{props.comment}</p>
      </div>
    </>
  );
}
export default Activities;
const Wrapper = styled.div`
  /* width: 800px; */
  width: 50%;
  background-color: #ffffff;
  margin: 0 auto;
  margin-top: 30px;
  padding: 20px;
  border-radius: 10px;
  .activity {
    display: flex;
    flex-direction: column;
  }
  .description {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .icon-container {
    padding: 20px;
    /* background-color: #CEF9C6; */
    border-radius: 50px;
  }
  .comment {
    display: flex;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    background-color: #f7f6f3;
    padding: 30px 30px 30px 40px;
    border-radius: 10px;
    position: relative;
    /* padding-left: -10px; */
  }
  .profile-img {
    position: absolute;
    left: -20px;
    top: 15px;
  }
  .photos {
    display: flex;
    margin-left: 20px;
    /* width: 100px;
        height: 100px; */
    /* flex-direction: row; */
  }
  .picture {
    padding: 5px;
  }
  .day {
    margin-bottom: 30px;
    margin-top: 20px;
    opacity: 50%;
  }
  .activityText {
    width: 65%;
    /* margin-left: 20px; */
    /* padding:10px */
  }
  .time {
  }
`;
