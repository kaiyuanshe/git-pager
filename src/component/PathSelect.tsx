import React from 'react';
import CascadeSelect, { CascadeProps, CascadeState } from './CascadeSelect';

import { blobFrom } from '../utility';
import { getContents } from '../service';

export interface GitContent {
  type: string;
  name: string;
}

interface SelectProps extends CascadeProps {
  repository: string;
  filter?: (content: GitContent) => boolean;
  onLoad?: (URL: string, data?: Blob) => void;
}

interface SelectState extends CascadeState {
  html_url: string;
}

export default class PathSelect extends CascadeSelect<
  SelectProps,
  SelectState
> {
  filter: (name: GitContent) => boolean;

  constructor(props: SelectProps) {
    super(props);

    this.filter = props.filter instanceof Function ? props.filter : Boolean;
    // @ts-ignore
    this.state.html_url = '';
  }

  reset() {
    super.reset();

    this.setState({ html_url: '' });
  }

  async getNextLevel() {
    const {
      name,
      pathName,
      // @ts-ignore
      props: { repository, onLoad }
    } = this;

    try {
      const contents = await getContents(repository, pathName);

      if (contents instanceof Array)
        return {
          label: '/',
          list: contents.filter(this.filter).map(({ name }) => name)
        };

      const { type, content, html_url } = contents;

      if (type !== 'file') return;

      this.setState({ html_url });

      if (onLoad instanceof Function)
        onLoad(html_url, blobFrom(`data:;base64,${content}`));
    } catch ({ name: ErrorClass, status }) {
      if (
        ErrorClass === 'HttpError' &&
        status === 404 &&
        // @ts-ignore
        name.includes('.') &&
        onLoad instanceof Function
      )
        onLoad(`https://github.com/${repository}/blob/master/${pathName}`);
    }
  }

  render() {
    // @ts-ignore
    const { html_url } = this.state;

    return (
      <>
        {super.render()}
        {html_url && (
          <a
            className="d-block pt-2"
            target="_blank"
            href={html_url}
            rel="noopener noreferrer"
          >
            <code>{html_url}</code>
          </a>
        )}
      </>
    );
  }
}
