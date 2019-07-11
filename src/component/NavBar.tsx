import React from 'react';
import classNames from 'classnames';

import { uniqueID, isXDomain } from '../utility';

interface MenuItem {
  title: string;
  href: string;
}

export interface NavBarProps {
  title: string;
  menu: MenuItem[];
  expand?: string;
  theme?: string;
  background?: string;
  rightSlot?: React.Component | React.ReactFragment;
}

export default function NavBar({
  title,
  menu = [],
  expand = 'lg',
  theme = 'light',
  background = 'light',
  rightSlot
}: NavBarProps) {
  const UID = uniqueID();

  return (
    <nav
      className={`navbar navbar-expand-${expand} navbar-${theme} bg-${background} sticky-top`}
    >
      <div className="container">
        <a className="navbar-brand" href=".">
          {title}
        </a>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target={'#' + UID}
          aria-controls={UID}
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id={UID}>
          <ul className="navbar-nav mr-auto">
            {menu.map(({ title, href }, index) => (
              <li
                className={classNames('nav-item', { active: !index })}
                key={title}
              >
                <a
                  className="nav-link"
                  href={href}
                  target={isXDomain(href) ? '_blank' : undefined}
                >
                  {title}
                  {!index && <span className="sr-only">(current)</span>}
                </a>
              </li>
            ))}
          </ul>
          {rightSlot}
        </div>
      </div>
    </nav>
  );
}
