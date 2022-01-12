import Tick from "../activity-images/tick.svg";
import Chat from "../activity-images/Iconmessage.svg";
import Ovalcomment from "../activity-images/Ovalcomment.png";
import download from "../activity-images/Icondownload.svg";
import Fill from "../activity-images/Fill 1.svg";
import photo1 from "../activity-images/Imageactivity1.png";
import photo2 from "../activity-images/Imageactivity2.png";
import photo3 from "../activity-images/Imageactivity3.png";
import photo4 from "../activity-images/Imageactivity4.png";
import photo5 from "../activity-images/Imageactivity5.png";
import photo6 from "../activity-images/Imageactivity6.png";
import photo7 from "../activity-images/Imageactivity7.png";
import photo8 from "../activity-images/Imageactivity8.png";

export const activityArr = [
  {
    icon: { image: Tick, color: "#CEF9C6" },
    text: "Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users",
    time: "8:40 PM",
  },
  {
    icon: { image: Chat, color: "#FFF8DD" },
    text: "Emilee Simchenko commented on Account for teams and personal in bottom style",
    time: "7:32 PM",
    profilePic: Ovalcomment,
    comment:
      "During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes",
  },
  {
    icon: { image: download, color: "#E3EFFF" },
    text: "Darika Samak uploaded 4 files on An option to search in current projects or in all projects",
    time: "6:02 PM",
    photos: [photo1, photo2, photo3, photo4],
    // photos: photo1,
  },
];
export const activityArr2 = [
  {
    icon: { image: download, color: "#E3EFFF" },
    text: "Darika Samak uploaded 4 files on An option to search in current projects or in all projects",
    time: "6:02 PM",
    photos: [photo5, photo6, photo7, photo8],
  },
  {
    icon: { image: Tick, color: "#CEF9C6" },
    text: "Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users",
    time: "5:49 PM",
  },
  {
    icon: { image: Fill, color: "#F5F0FF" },
    text: "Darika Samak edited Listing on Product Hunt so that we can reach as many potential users",
    time: "5:40 PM",
  },
];
