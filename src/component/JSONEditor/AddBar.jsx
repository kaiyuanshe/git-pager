import React from 'react';

const type_map = {
  string: { title: 'Inline text', icon: 'grip-lines' },
  text: { title: 'Rows text', icon: 'align-left' },
  object: { title: 'Key-value list', icon: 'list-ul' },
  array: { title: 'Ordered list', icon: 'list-ol' }
};

export default function AddBar({ onSelect }) {
  return (
    <nav>
      {Object.entries(type_map).map(([key, { title, icon }]) => (
        <button
          key={key}
          type="button"
          className={'btn btn-sm btn-success m-1 fas fa-' + icon}
          title={title}
          onClick={onSelect.bind(null, key)}
        ></button>
      ))}
    </nav>
  );
}
