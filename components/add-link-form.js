import React from 'react';

class AddLinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sourceUrl: '' };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.onAdd(this.state.sourceUrl);
  }

  handleChange = (event) => {
    this.setState({ sourceUrl: event.target.value });
  }

  render() {
    const { onAdd } = this.props;
    return (
      <div style={this.props.style}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Image URL:
            <input
              type="text"
              value={this.state.sourceUrl}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

export default AddLinkForm;
