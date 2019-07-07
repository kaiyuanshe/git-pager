import React from 'react';
import CascadeSelect from './CascadeSelect';

import { blobFrom } from '../utility';
import { getContents } from '../service';

export default class PathSelect extends CascadeSelect {
  constructor(props) {
    super(props);

    this.filter = props.filter instanceof Function ? props.filter : Boolean;

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
        error.response.status === 404 &&
        name.includes('.')
      )
        onLoad(`https://github.com/${repository}/blob/master/${pathName}`);
    }
  }

  render() {
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
