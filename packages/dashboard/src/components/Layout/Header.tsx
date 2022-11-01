/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { getUrl } from '../../core/helpers/url-helpers';
import { IconBrandGithub, IconHeart, IconMoon, IconSun } from '@tabler/icons';
import { useUIStore } from '../../state/uiStore';
import NavBar from './NavBar';

interface IProps {}

const Header: React.FC<IProps> = () => {
  const { setDarkMode } = useUIStore();

  return (
    <header className="navbar navbar-expand-md navbar-dark navbar-overlap d-print-none">
      <div className="container-xl">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
          <span className="navbar-toggler-icon" />
        </button>
        <a href="/dashboard">
          <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <img alt="Tipi logo" className="navbar-brand-image me-3" src={getUrl('tipi.png')} />
            Tipi
          </h1>
        </a>
        <div className="navbar-nav flex-row order-md-last">
          <div className="nav-item d-none d-md-flex me-3">
            <div className="btn-list">
              <a href="https://github.com/meienberger/runtipi" target="_blank" rel="noreferrer" className="btn">
                <IconBrandGithub size={24} />
                Source code
              </a>
              <a href="https://github.com/meienberger/runtipi?sponsor=1" target="_blank" rel="noreferrer" className="btn">
                <IconHeart className="icon text-pink" size={24} />
                Sponsor
              </a>
            </div>
          </div>
          <div className="d-flex">
            <a
              onClick={() => setDarkMode(true)}
              className="nav-link px-0 hide-theme-dark cursor-pointer"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              aria-label="Enable dark mode"
              data-bs-original-title="Enable dark mode"
            >
              <IconMoon size={24} />
            </a>
            <a
              onClick={() => setDarkMode(false)}
              className="nav-link px-0 hide-theme-light cursor-pointer"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              aria-label="Enable light mode"
              data-bs-original-title="Enable light mode"
            >
              <IconSun size={24} />
            </a>
          </div>
        </div>
        <NavBar />
      </div>
      {/* <Flex className="items-center border-b-2 bg-graycool px-5 flex-1 py-2">
        <div onClick={onClickMenu} className="visible md:invisible absolute cursor-pointer py-2">
          <FiMenu color="black" />
        </div>
        <Flex justifyContent="center" flex="1">
          <Link href="/" passHref>
            <img src={getUrl('tipi.png')} alt="Tipi Logo" width={30} height={30} />
          </Link>
        </Flex>
      </Flex> */}
    </header>
  );
};

export default Header;
