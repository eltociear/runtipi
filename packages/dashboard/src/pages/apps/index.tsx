import React from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import AppTile from '../../components/AppTile';
import { InstalledAppsQuery, useInstalledAppsQuery } from '../../generated/graphql';

const Apps: NextPage = () => {
  const { data, loading } = useInstalledAppsQuery();

  const renderApp = (app: InstalledAppsQuery['installedApps'][0]) => {
    const updateAvailable = Number(app.updateInfo?.current) < Number(app.updateInfo?.latest);

    if (app.info) return <AppTile key={app.id} app={app.info} status={app.status} updateAvailable={updateAvailable} />;
  };

  return (
    <Layout loading={loading || !data?.installedApps} title="My Apps">
      <div className="row row-cards">{data?.installedApps.map(renderApp)}</div>
    </Layout>
  );
};

export default Apps;
