import React from 'react';

import { uniqueID, blobFrom } from '../utility';
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
      props: { repository, onLoad }
    } = this;

    const contents = await getContents(repository, path.join('/'));

    if (contents instanceof Array)
      return {
        label: '/',
        list: contents.map(({ name }) => name)
      };

    const { type, name, content } = contents;

    if (type === 'file') onLoad(name, blobFrom(`data:;base64,${content}`));
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

    if (level != null) list.splice(index, Infinity, level);
    else list.length = index;

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
            <span key={IID}>
              <input
                type="text"
                id={IID}
                list={LID}
                onChange={this.onChange.bind(this, index)}
              />
              <datalist id={LID}>
                {list.map(item => (
                  <option value={item} key={item} />
                ))}
              </datalist>
              <label htmlFor={IID} style={{ padding: '0 0.5rem' }}>
                {label}
              </label>
            </span>
          );
        })}
      </>
    );
  }
}
