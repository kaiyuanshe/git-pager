import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { blobFrom } from 'web-utility';

import { getContents } from '../service';
import { CascadeProps, CascadeSelect } from './CascadeSelect';

export interface GitContent {
  type: string;
  name: string;
}

export interface SelectProps extends CascadeProps {
  repository: string;
  filter?: (content: GitContent) => boolean;
  onLoad?: (URL: string, data?: Blob) => void;
}

@observer
export class PathSelect extends CascadeSelect<SelectProps> {
  @observable
  html_url = '';

  filter: (name: GitContent) => boolean;

  constructor(props: SelectProps) {
    super(props);

    this.filter = props.filter instanceof Function ? props.filter : Boolean;

    this.html_url = '';
  }

  reset() {
    super.reset();

    this.html_url = '';
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

      const { type, html_url } = contents;

      if (type !== 'file' || !html_url) return;

      this.html_url = html_url;

      if ('content' in contents)
        onLoad?.(html_url, blobFrom(`data:;base64,${contents.content}`));
    } catch (error) {
      const { name: ErrorClass, status } = error as any;

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
    const { html_url } = this;

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
