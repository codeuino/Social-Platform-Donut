import React, { Component } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import "./PostContent.scss";
import { connect } from "react-redux";
import parse from "html-react-parser";
import { getAllCommentsOfPost } from "../../../actions/commentAction";
import userIcon2 from "../../../assets/images/userIcon2.jpg";

class PostContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      comments: null,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.getAllCommentsOfPost(this.props.postId);
    }, 2000);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const { displayingPost, posts, comments } = nextProps;
    const post = posts[displayingPost];

    this.setState(
      {
        post: post,
        comments: comments,
      },
      () => {
        console.log(this.state);
      }
    );
  }

  handleComments = () => {
    console.log("handlecomments clicked");
    console.log(this.state);
    this.props.getAllCommentsOfPost(this.state.post._id);
  };

  render() {
    const { onHide, show } = this.props;
    const { post } = this.state;

    return (
      <Modal className="modal" show={show} onHide={onHide} centered>
        <div className="content-cards-designs">
          <div className="content-clone-card">
            <div className="content-card-main-content">
              <div className="content-card-header">
                <div className="user-post-info">
                  <div className="user-thumb">
                    <img src={userIcon2} className="img-responsive" />
                  </div>
                  <div className="user-information">
                    <p>{`${post?.userId?.name.firstName} ${post?.userId?.name.lastName}`}</p>
                    <small>{post?.createdAt}</small>
                  </div>
                </div>
                <div className="post-action">
                  <i className="fas fa-ellipsis-h"></i>
                </div>
              </div>

              <div className="content-card-body simple-text-card">
                <p>{parse(String(post?.content))}</p>
              </div>
            </div>

            <div className="content-card-like-comment-holder">
              <div className="content-card-like-comment"></div>
            </div>

            <div className="content-card-actions-holder">
              <div className="content-card-actions">
                <div className="content-btn-holder">
                  <a href="#">
                    <i className="far fa-thumbs-up"></i> Like
                  </a>
                </div>
                <div
                  className="content-btn-holder"
                  onClick={this.handleComments}
                >
                  <a href="#">
                    <i className="far fa-comment-alt"></i> Comment
                  </a>
                </div>
              </div>
            </div>

            <div className="content-card-comments">
              <div className="comment-input-holder">
                <div className="user-thumb">
                  <img src={userIcon2} className="img-responsive" />
                </div>
                <div className="comment-input">
                  <div
                    className="comment-box"
                    placeholder="Write a comment..."
                    contentEditable="true"
                  ></div>
                </div>
              </div>
              <div className="comment-container">
                {this.state.comments?.map((commentItem, index) => {
                  return (
                    <div className="comment-item" key={index}>
                      <div className="user-icon">
                        <img
                          src={userIcon2}
                          className="img-responsive"
                          style={{ borderRadius: "50%" }}
                        />
                      </div>
                      <div className="user-comment">
                        <div className="commenting-user">{`${commentItem.userId.name.firstName} ${commentItem.userId.name.lastName}`}</div>
                        <p className="comment-content">{commentItem.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.user.userPosts,
  comments: state.comment.allComments,
});

export default connect(mapStateToProps, { getAllCommentsOfPost })(PostContent);
