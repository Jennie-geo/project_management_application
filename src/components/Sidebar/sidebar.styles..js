import styled from "styled-components";

export const Grid = styled.div`
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    overflow-y: scroll;
    height: 100%;
    width: 70px;
    background: var(--dark-background);
    padding: 6px 10px;
    z-index: 99;
    transition: all 0.5s ease;
  }
  .sidebar.open {
    width: 290px;
  }
  #add {
    color: #ffc200;
  }
  .sidebar .logo-details {
    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
  }
   .sidebar .logo-details .icon {
    opacity: 0;
    transition: all 0.5s ease;
  }
  .sidebar .logo-details .logo_name {
    color: #fff;
    font-size: 15px;
    font-weight: 800;
    opacity: 0;
    transition: all 0.5s ease;
  }
  .sidebar.open .logo-details .icon,
  .sidebar.open .logo-details .logo_name {
    opacity: 1;
  }
  .sidebar .logo-details #btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 22px;
    transition: all 0.4s ease;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s ease;
  }
  .sidebar.open .logo-details #btn {
    text-align: right;
  }
  .sidebar i {
    color: #fff;
    height: 60px;
    min-width: 50px;
    font-size: 28px;
    text-align: center;
    line-height: 60px;
  }
  .sidebar .nav-list {
    margin-top: 5em;
    height: 100%;
  }
  #menu {
    color: #878787;
    margin-top: 15%;
  }
  #job {
    color: #878787;
    margin-top: 5%;
  }
  #menu:hover {
    background-color: transparents;
  }
  .sidebar li {
    position: relative;
    margin: 2px 0;
    list-style: none;
  }
  .sidebar li .tooltip {
    position: absolute;
    top: -20px;
    left: calc(100% + 15px);
    z-index: 3;
    background: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 400;
    opacity: 0;
    white-space: nowrap;
    pointer-events: none;
    transition: 0s;
  }
  .sidebar li:hover .tooltip {
    opacity: 1;
    pointer-events: auto;
    transition: all 0.4s ease;
    top: 50%;
    transform: translateY(-50%);
  }
  .sidebar.open li .tooltip {
    display: none;
  }
  .sidebar input {
    font-size: 15px;
    color: #fff;
    font-weight: 400;
    outline: none;
    height: 50px;
    width: 100%;
    width: 50px;
    border: none;
    transition: all 0.5s ease;
    background: var(--lightDark-background);
  }
  .sidebar.open input {
    padding: 0 20px 0 50px;
    width: 100%;
  }
  .sidebar .bx-search {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    font-size: 22px;
    background: var(--lightDark-background);
    color: #fff;
  }
  .sidebar.open .bx-search:hover {
    background: var(--lightDark-background);
    color: #fff;
  }
  .sidebar .bx-search:hover {
    background: var(--lightDark-background);
    color: #11101d;
  }
  .sidebar li a {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    text-decoration: none;
    transition: all 0.4s ease;
    text-align: center;
    padding: 10px 0 10px 20px;
    height: 50%;
  }
  .sidebar li a:hover {
    background: var(--lightDark-background);
    border-left: 4px solid #ffc200;
  }
  .sidebar li a .links_name {
    color: #fff;
    font-size: 15px;
    font-weight: 800;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: 0.4s;
  }
  .sidebar.open li a .links_name {
    opacity: 1;
    pointer-events: auto;
  }
  .sidebar li a:hover .links_name,
  .sidebar li a:hover i {
    transition: all 0.5s ease;
    color: #fff;
  }
  .sidebar li i {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    border-radius: 12px;
  }
  .sidebar li.profile {
    position: absolute;
    height: 66px;
    width: 70px;
    left: 0;
    top: 4.2em;
    padding: 10px 22px;
    background: var(--lightDark-background);
    transition: all 0.5s ease;
    overflow: hidden;
  }
  .sidebar.open li.profile {
    width: 290px;
  }
  .sidebar li .profile-details {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-evenly;
  }
  .sidebar li img {
    height: 45px;
    width: 45px;
    object-fit: cover;
    border-radius: 6px;
    margin-right: 20px;
  }
  .sidebar li.profile .name,
  .sidebar li.profile .job {
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    white-space: nowrap;
  }
  .sidebar li.profile .job {
    font-size: 12px;
    margin-top: 2%;
  }
  .sidebar .profile #log_out {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background: #1d1b31;
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-radius: 0px;
    transition: all 0.5s ease;
  }
  .sidebar.open .profile #log_out {
    width: 50px;
    background: none;
  }
  /* .invite__text{
    display: flex;
  } */
.invite__text{
  color: white;
  font-weight: 700;
 
}
  #invite{
    color: #ffc200;
    text-decoration: underline; 
  }
  #invite__container{
    padding:20px;
    line-height: 20px;
    margin-top: 30%;
    display: flex;
    height:20%;
    align-items: flex-end;

  }
  #collaborate{
    color: white;


  }
  .home-section {
    position: relative;
    background: #eeebe5;
    min-height: 100vh;
    top: 0;
    left: 70px;
    width: calc(100% - 70px);
    transition: all 0.5s ease;
    z-index: 2;
  }
  .sidebar.open ~ .home-section {
    left: 290px;
    width: calc(100% - 290px);
  }
  .home-section .text {
    display: inline-block;
    color: #11101d;
    font-size: 25px;
    font-weight: 500;
    margin: 18px;
  }
  
  @media (max-width: 420px) {
    .sidebar li .tooltip {
      display: none;
    }
  }
`;

export const Statistics = styled.div`
display:flex;
color: white;
padding: 16px 30px 20px 30px;
justify-content:space-between;
#tag{
  color: #878787;
    margin-top: 7px; 
}
.stats__right > h1{
  text-align: left;
  font-weight: 800;
}
.stats__right > p{
  font-size: 13px;
  font-weight: bold;
}
.stats__left {
  margin-right: 20px;
}
.stats__left > h1{
  text-align: left;
  font-weight: 800;
}
.stats__left > p{
  font-size: 13px;
  font-weight: bold;
}
` 
