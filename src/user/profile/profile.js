import React, { Component } from "react";
import "./profile.scss";
import Navigation from "../dashboard/navigation/navigation";
import UserInfo from "./user-info/user-info";
import Portfolio from "../dashboard/portfolio/portfolio";
import Posts from "../pinned-posts/posts/posts";

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <div className="navigation">
          <Navigation></Navigation>
        </div>
        <div className="news">
          <div className="notify-user">
            <UserInfo></UserInfo>
            <Portfolio></Portfolio>
          </div>
          <div className="posts-profile">
            <Posts></Posts>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
