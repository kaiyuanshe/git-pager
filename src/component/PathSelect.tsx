import React from 'react';
import CascadeSelect from './CascadeSelect';

import { blobFrom } from '../utility';
import { getContents } from '../service';

interface SelectProps {
  repository: string;
  filter?: (name: string) => boolean;
  onLoad?: (URL: string, data: Blob, SHA: string) => void;
}

export default class PathSelect extends CascadeSelect<SelectProps> {
  filter: (name: string) => boolean;

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

      const { type, content, html_url, sha } = contents;

      if (type !== 'file') return;

      this.setState({ html_url });

      onLoad(html_url, sha, blobFrom(`data:;base64,${content}`));
    } catch (error) {
      if (
        error instanceof URIError &&
        // @ts-ignore
        error.response.status === 404 &&
        // @ts-ignore
        name.includes('.')
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
          <a className="d-block pt-2" target="_blank" href={html_url}>
            <code>{html_url}</code>
          </a>
        )}
      </>
    );
  }
}
