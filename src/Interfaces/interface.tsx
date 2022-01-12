export interface ProjectInterface {
  owner: string;
  name: string;
  collaborators: { email: string; isVerified: boolean };
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface TeamInterface {
  teamName: string;
  _id: string;
}

interface User {
  fullname: String;
  profileImage: String;
}

export interface CommentInterface {
  commenter: User;
  body: String;
  createdAt: Date;
}

export interface TaskInterface {
  _id?: string;
  title: string;
  description: string;
  status: string;
  owner: User;
  assignee: User;
  fileUploads: string[];
  comments: CommentInterface[];
  dueDate: Date;
  createdAt: Date;
  projectId: string;
  tag: string;
}

export interface ActivityInterface {
  _id?: string;
  message: string;
  createdAt: string;
}

export interface TeamMembersInterface {
  user: { fullname: string; _id: string; email: string; profileImage?: string };
  role: string;
  tasks: TaskInterface[];
}
