import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "./popups.scss";

export class DeleteEvent extends Component {

  render() {
    return (
      <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title className="delete_event_title" >Delete This Project</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
      <Button variant="danger">
            Remove
          </Button>
          <Button variant="light">
            Keep It
          </Button>
      </Modal.Footer>
    </Modal>           
    );
  }
}
