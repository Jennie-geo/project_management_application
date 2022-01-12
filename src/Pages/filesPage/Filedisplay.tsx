import React from 'react'
 import { FaFileDownload  } from "react-icons/fa";
 import {BsSearch } from 'react-icons/bs';
 import Image from "/Users/decagon/projectFrontend/project-management-web-team-b-1/src/Pages/filesPage/chinexprofile.jpeg";


interface FiledisplayProps {
    
}
 
interface FiledisplayState {
    
}
 
class Filedisplay extends React.Component<FiledisplayProps, FiledisplayState> {
    constructor(props: FiledisplayProps) {
        super(props);
        this.state = {  };
    }

    fileSelectedHandler = (event:any) =>{
        console.log(event.target.files[0].name)
    }


    render() { 
        return ( 
            <div>
                <input type="file" onChange={this.fileSelectedHandler}></input>
                <FaFileDownload />
                
                <BsSearch />
  <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
    <p className="good">dool</p>
    <img style={{width: "2%", height: '2%'}} src={Image} alt = "profile" />
                
            </div>
         );
    }
}
 
export default Filedisplay;


    // interface Props {
        
    // }
    
    // interface State {
        
    // }
    
//     export default class File extends React.Component<Props, State> {
//         constructor(props: Props) {
//             super(props);
//         this.state = {
//             Files : [...files]
//          };
//     }

//     componentDidMount(){
//       try {
          
//         axios.get("http://localhost:3008/tasks/files", { withCredentials: true})
//                     .then(res => {
//                         console.log(res, 'data')
//                     })
//                     .catch(err => {
//                         console.log(err.response, 'error')
//                     })
               

//       } catch (error) {
          
//       } 
//          }



//     render() { 
       
//     return (<div>

// <div className="container">
//   <div className="row">
//     <div className="col">
//                          <p><i className="far fa-file-download"></i></p>
//     </div>
//     <div className="col-9 file">
        
    
//             <table  className="table">
//                  <thead>
//                      <tr >
//                         {/* {columns.map(column=>(
//                                <th className="clickable" key ={column.path || column.key} >
//                                {column.label}</th>))} */}

//                                <td className="image">Image</td>
//                                <td className="name"><BsSearch />name</td>
//                                <td className="size">size</td>
//                                <td className="UploadBy">Upload By</td>
//                                <td className="Tag">Tag</td>
//                                <td className="Date">Date</td>

//                    </tr>
//                 </thead>
//                       <tbody>
//                           {this.state.Files.length===0 && <h1>there are no files availab</h1>}
//                 {this.state.Files.map((row)=> (
//                         <tr key={row._id}>
//                         <td className="image">{row.image}</td>
  //<td className="imagefiles"><img  src={row.image}  alt = "profile" /></td> 
//                         <td className="name">{row.name}</td>
//                         <td className="size">{row.size}</td>
//                         <td className="UploadBy">{row.UploadBy}</td>
//                         <td className="Tag">{row.Tag}</td>
//                         <td className="Date">{row.Date}</td>
//                         <td><button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"> actions</button></td>
//                         <td>{}<FaFileDownload /></td>
//                      </tr>
//                     )              
//     ) 
//                  }
    
//                 </tbody>
//             </table>
//     </div>
    
//   </div>
// </div>





//     </div>


    
    
    
        
//     )
// }

//     }
