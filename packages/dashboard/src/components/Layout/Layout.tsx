import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Header from './Header';
import { useRefreshTokenQuery } from '../../generated/graphql';
import clsx from 'clsx';
import ReactTooltip from 'react-tooltip';

interface IProps {
  loading?: boolean;
  breadcrumbs?: { name: string; href: string; current?: boolean }[];
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<IProps> = ({ children, loading, breadcrumbs, title }) => {
  const { data } = useRefreshTokenQuery({ fetchPolicy: 'network-only' });

  useEffect(() => {
    if (data?.refreshToken?.token) {
      localStorage.setItem('token', data.refreshToken.token);
    }
  }, [data]);

  const renderBreadcrumbs = () => {
    if (!breadcrumbs) {
      return null;
    }

    return (
      <ol className="breadcrumb" aria-label="breadcrumbs">
        {breadcrumbs.map((breadcrumb) => {
          return (
            <li key={breadcrumb.name} className={clsx('breadcrumb-item', { active: breadcrumb.current })}>
              <Link href={breadcrumb.href}>
                <a href={`/dashboard/${breadcrumb.href}`}>{breadcrumb.name}</a>
              </Link>
            </li>
          );
        })}
      </ol>
    );
  };

  return (
    <div className="page">
      <Head>
        <title>Tipi</title>
      </Head>
      <ReactTooltip offset={{ right: 3 }} effect="solid" place="bottom" />
      <Header />
      <div className="page-wrapper">
        <div className="page-header d-print-none text-white">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">{renderBreadcrumbs()}</div>
                <h2 className="page-title">{title}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="page-body">
          <div className="container-xl">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
