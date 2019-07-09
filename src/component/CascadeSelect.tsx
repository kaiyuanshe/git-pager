import React from 'react';
import { uniqueID, debounce } from '../utility';

interface SelectProps {
  required: boolean;
}

interface SelectState {
  path?: string[];
  list: any[][];
}

interface LevelItem {
  label?: string;
  list: string[];
}

export default abstract class CascadeSelect<
  P,
  S = null
> extends React.Component<SelectProps | P, SelectState | S> {
  UID = uniqueID();

  state = {
    path: [],
    list: []
  };

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

  abstract async getNextLevel(): Promise<LevelItem | undefined>;

  changeLevel = debounce(async (index: number, value: string) => {
    const { path, list } = this.state;
    // @ts-ignore
    path.splice(index, Infinity, value);

    const level = await this.getNextLevel();
    // @ts-ignore
    if (level != null) list.splice(++index, Infinity, level);
    else list.length = ++index;

    this.setState({ list });
  });

  render() {
    const {
      UID,
      state: { list },
      // @ts-ignore
      props: { required }
    } = this;

    return (
      <>
        {list.map(({ label, list }: LevelItem, index) => {
          const IID = `input-${UID}-${index}`,
            LID = `list-${UID}-${index}`;

          return (
            <span key={IID} className="form-inline d-inline-flex">
              <input
                type="text"
                className="form-control"
                id={IID}
                list={LID}
                // @ts-ignore
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
