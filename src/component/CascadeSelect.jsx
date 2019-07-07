import React from 'react';
import { uniqueID, debounce } from '../utility';

export default class CascadeSelect extends React.Component {
  state = {
    UID: uniqueID(),
    path: [],
    list: []
  };

  constructor(props) {
    super(props);

    if (this.constructor === CascadeSelect)
      throw TypeError('CascadeSelect is an Abstract Class');
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

  get pathName() {
    return this.state.path.filter(Boolean).join('/');
  }

  reset() {
    const { path, list } = this.state;

    this.setState({ path: [path[0]], list: [list[0]] });
  }

  componentDidMount() {
    this.changeLevel(-1, '');
  }

  changeLevel = debounce(async (index, value) => {
    const { path, list } = this.state;

    path.splice(index, Infinity, value);

    const level = await this.getNextLevel();

    if (level != null) list.splice(++index, Infinity, level);
    else list.length = ++index;

    this.setState({ list });
  });

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
                onChange={({ target: { value } }) =>
                  (value = value.trim()) && this.changeLevel(index, value)
                }
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
