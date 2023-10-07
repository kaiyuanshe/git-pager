import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { isXDomain, uniqueID } from 'web-utility';

interface MenuItem {
  title: string;
  href: string;
}

export interface NavBarProps
  extends Partial<Record<'id' | 'expand' | 'theme' | 'background', string>> {
  title: string;
  menu: MenuItem[];
  rightSlot?: ReactNode;
}

export const NavBar: FC<NavBarProps> = ({
  id = uniqueID(),
  title,
  menu = [],
  expand = 'lg',
  theme = 'light',
  background = 'light',
  rightSlot
}) => (
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
        data-target={'#' + id}
        aria-controls={id}
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id={id}>
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
