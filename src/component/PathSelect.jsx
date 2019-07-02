import React from 'react';

import { uniqueID } from '../utility';
import { getContents } from '../service';

export default class PathSelect extends React.Component {
  state = {
    UID: uniqueID(),
    list: [],
    path: []
  };

  componentDidMount() {
    return this.onChange(-1, { target: { value: '' } });
  }

  async getNextLevel() {
    const {
      state: { path },
      props: { repository }
    } = this;

    return {
      label: '/',
      list: (await getContents(repository, path.join('/'))).map(
        ({ name }) => name
      )
    };
  }

  async onChange(
    index,
    {
      target: { value }
    }
  ) {
    const { path, list } = this.state;

    path.splice(++index, Infinity, value);

    const level = await this.getNextLevel();

    list.splice(index, Infinity, level);

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
