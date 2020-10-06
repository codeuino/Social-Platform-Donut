import React, { Component } from "react";
import Navigation from "../../dashboard/navigation/navigation";
import EditorContent from "./EditorContent/EditorContent";
import "./ProposalEditor.scss";

class ProposalEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      org: true
    };
  }
  render() {
    return (
      <div className="editor">
        <div className="editor__navigation">
          <Navigation org={this.state.org} />
        </div>
        <div className="editor__content">
          <EditorContent />
        </div>
      </div>
    );
  }
}

export default ProposalEditor;
