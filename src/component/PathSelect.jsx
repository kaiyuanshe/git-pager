import React from 'react';

import { uniqueID } from '../utility';

export default class PathSelect extends React.Component {
  state = {
    UID: uniqueID(),
    list: [],
    path: []
  };

  componentDidMount() {
    return this.onChange(-1, { target: {} });
  }

  getNextLevel(index, value) {
    return {
      label: '/',
      list: Array((index += 2)).fill(index)
    };
  }

  async onChange(
    index,
    {
      target: { value }
    }
  ) {
    const { list } = this.state,
      level = await this.getNextLevel(index, value);

    list.splice(index + 1, Infinity, level);

    this.setState({ list });
  }

  render() {
    const { UID, list } = this.state;

    return (
      <>
        {list.map(({ label, list }, index) => {
          const IID = `input-${UID}-${index}`,
            LID = `list-${UID}-${index}`;

          return (
            <>
              <input
                type="text"
                id={IID}
                list={LID}
                onChange={this.onChange.bind(this, index)}
              />
              <datalist id={LID}>
                {list.map(item => (
                  <option value={item} />
                ))}
              </datalist>
              <label htmlFor={IID} style={{ padding: '0 0.5rem' }}>
                {label}
              </label>
            </>
          );
        })}
      </>
    );
  }
}
