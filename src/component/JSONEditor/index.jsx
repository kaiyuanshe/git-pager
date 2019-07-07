import React from 'react';

import AddBar from './AddBar';

export class ListField extends React.Component {
  state = {
    data: []
  };

  addItem = type => {
    const item = { type };

    switch (type) {
      case 'string':
      case 'text':
        item.value = '';
        break;
      case 'object':
        item.value = {};
        break;
      case 'array':
        item.value = [];
    }

    this.setState({
      data: this.state.data.concat(item)
    });
  };

  fieldOf(type, value) {
    switch (type) {
      case 'string':
        return (
          <input
            type="text"
            className="form-control w-75"
            value={value}
            placeholder="Value"
          />
        );
      case 'text':
        return (
          <textarea className="form-control w-75" placeholder="Value">
            {value}
          </textarea>
        );
      default:
        return <ListField type={type} value={value} />;
    }
  }

  wrapper(slot) {
    return this.props.type === 'array' ? (
      <ol className="inline-form">{slot}</ol>
    ) : (
      <ul className="inline-form">{slot}</ul>
    );
  }

  render() {
    const { type: field_type } = this.props;

    return this.wrapper(
      <>
        {this.state.data.map(({ type, value }) => (
          <li className="input-group input-group-sm ">
            {field_type === 'object' && (
              <input
                type="text"
                className="form-control w-25"
                placeholder="Key"
              />
            )}
            {this.fieldOf(type, value)}
          </li>
        ))}
        <li className="form-group">
          <AddBar onSelect={this.addItem} />
        </li>
      </>
    );
  }
}
