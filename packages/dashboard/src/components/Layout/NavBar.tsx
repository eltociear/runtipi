import { IconHome } from '@tabler/icons';
import React from 'react';

const NavBar: React.FC = () => {
  return (
    <div id="navbar-menu" className="collapse navbar-collapse" style={{}}>
      <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/dashboard" className="nav-link">
              <IconHome size={24} />
              <span className="ms-2">Dashboard</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
