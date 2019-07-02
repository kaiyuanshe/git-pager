import React from 'react';

import PathSelect from '../component/PathSelect';

export default class Editor extends React.Component {
  render() {
    const { repository } = this.props;

    return (
      <main className="card" style={{ margin: '1rem' }}>
        <form className="card-body">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">File path</label>
            <div className="col-sm-10">
              <PathSelect repository={repository} />
            </div>
          </div>
        </form>
      </main>
    );
  }
}
