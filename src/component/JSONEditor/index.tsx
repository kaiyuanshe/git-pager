import React from 'react';

import AddBar from './AddBar';

import { DataMeta } from './types';

export class ListField extends React.Component<{ value: any }, DataMeta> {
  state = {
    ...ListField.metaOf(this.props.value)
  };

  static metaOf(value: any): DataMeta {
    if (value instanceof Array)
      return {
        type: 'array',
        value,
        children: Array.from(value, (value, key) => {
          return {
            ...this.metaOf(value),
            key
          };
        })
      };

    if (value instanceof Object)
      return {
        type: 'object',
        value,
        children: Object.entries(value).map(([key, value]) => {
          return {
            ...this.metaOf(value),
            key
          };
        })
      };

    return {
      type: /[\r\n]/.test(value) ? 'text' : 'string',
      value
    };
  }

  addItem = (type: string) => {
    var item: DataMeta = { type, value: [] };

    switch (type) {
      case 'string':
        item = ListField.metaOf('');
        break;
      case 'text':
        item = ListField.metaOf('\n');
        break;
      case 'object':
        item = ListField.metaOf({});
        break;
      case 'array':
        item = ListField.metaOf([]);
    }

    this.setState({
      ...this.state,
      children: (this.state.children || []).concat(item)
    });
  };

  fieldOf(type: string, value: any) {
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
        return <ListField value={value} />;
    }
  }

  wrapper(slot: React.ReactFragment) {
    return this.state.type === 'array' ? (
      <ol className="inline-form">{slot}</ol>
    ) : (
      <ul className="inline-form">{slot}</ul>
    );
  }

  render() {
    const { type: field_type, children = [] } = this.state;

    return this.wrapper(
      <>
        {children.map(({ type, key, value }) => (
          <li className="input-group input-group-sm" key={key}>
            {field_type === 'object' && (
              <input
                type="text"
                className="form-control w-25"
                value={key}
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
