import React from 'react';

import AddBar from './AddBar';

import { DataMeta } from './types';

interface FieldProps {
  value: Object | Array<any> | null;
  onChange?: (event: React.ChangeEvent) => void;
}

function dataChange(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const method = target[propertyKey];
  // @ts-ignore
  descriptor.value = function(index: number, { target: { value: data } }) {
    // @ts-ignore
    const { children = [] } = this.state;

    const item = children[index];

    if (!item) return;
    // @ts-ignore
    method.call(this, item, data);
    // @ts-ignore
    const { onChange } = this.props;

    if (onChange instanceof Function)
      // @ts-ignore
      onChange({ target: { value: this.state.value } });
  };
}

export class ListField extends React.Component<FieldProps, DataMeta> {
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

  @dataChange
  setKey(item: DataMeta, newKey: string) {
    const { value, children = [] } = this.state;

    item.key = newKey;

    for (let oldKey in value)
      if (!children.find(({ key }) => key === oldKey)) {
        value[newKey] = value[oldKey];

        delete value[oldKey];
        break;
      }
  }

  @dataChange
  setValue(item: DataMeta, newValue: string) {
    const { value } = this.state;

    item.value = newValue;

    value[item.key + ''] = newValue;
  }

  fieldOf(index: number, type: string, value: any) {
    switch (type) {
      case 'string':
        return (
          <input
            type="text"
            className="form-control"
            defaultValue={value}
            placeholder="Value"
            // @ts-ignore
            onBlur={this.setValue.bind(this, index)}
          />
        );
      case 'text':
        return (
          <textarea
            className="form-control"
            defaultValue={value}
            placeholder="Value"
            // @ts-ignore
            onBlur={this.setValue.bind(this, index)}
          ></textarea>
        );
      default:
        return (
          // @ts-ignore
          <ListField value={value} onChange={this.setValue.bind(this, index)} />
        );
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
        <li className="form-group">
          <AddBar onSelect={this.addItem} />
        </li>
        {children.map(({ type, key, value }, index) => (
          <li className="input-group input-group-sm" key={key}>
            {field_type === 'object' && (
              <input
                type="text"
                className="form-control"
                // @ts-ignore
                defaultValue={key}
                required
                placeholder="Key"
                // @ts-ignore
                onBlur={this.setKey.bind(this, index)}
              />
            )}
            {this.fieldOf(index, type, value)}
          </li>
        ))}
      </>
    );
  }
}
