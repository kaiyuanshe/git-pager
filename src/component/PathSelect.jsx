import React from 'react';

import { uniqueID, blobFrom, debounce } from '../utility';
import { getContents } from '../service';

export default class PathSelect extends React.Component {
  state = {
    UID: uniqueID(),
    path: [],
    list: []
  };

  reset() {
    const { path, list } = this.state;

    this.setState({ path: path.slice(0, 1), list: list.slice(0, 1) });
  }

  componentDidMount() {
    return this.onChange(-1, { target: { value: '' } });
  }

  get path() {
    return this.state.path
      .filter(Boolean)
      .slice(0, -1)
      .join('/');
  }

  get name() {
    return this.state.path.slice(-1)[0];
  }

  async getNextLevel() {
    const {
      path,
      name,
      props: { repository, onLoad }
    } = this;

    try {
      const contents = await getContents(repository, `${path}/${name}`);

      if (contents instanceof Array)
        return {
          label: '/',
          list: contents.map(({ name }) => name)
        };

      const { type, name: fileName, content } = contents;

      if (type === 'file')
        onLoad(fileName, blobFrom(`data:;base64,${content}`));
    } catch (error) {
      if (error instanceof URIError && error.response.status === 404)
        onLoad(name);
    }
  }

  changeLevel = debounce(async (index, value) => {
    const { path, list } = this.state;

    path.splice(++index, Infinity, value);

    const level = await this.getNextLevel();

    if (level != null) list.splice(index, Infinity, level);
    else list.length = index;

    this.setState({ list });
  });

  onChange(
    index,
    {
      target: { value }
    }
  ) {
    this.changeLevel(index, value);
  }

  render() {
    const { UID, list } = this.state,
      { required } = this.props;

    return (
      <>
        {list.map(({ label, list }, index) => {
          const IID = `input-${UID}-${index}`,
            LID = `list-${UID}-${index}`;

          return (
            <span key={IID} className="form-inline d-inline-flex">
              <input
                type="text"
                className="form-control"
                id={IID}
                list={LID}
                onChange={this.onChange.bind(this, index)}
                required={!index && required}
              />
              <datalist id={LID}>
                {list.map(item => (
                  <option value={item} key={item} />
                ))}
              </datalist>
              <label htmlFor={IID} className="pl-2 pr-2">
                {label}
              </label>
            </span>
          );
        })}
      </>
    );
  }
}
