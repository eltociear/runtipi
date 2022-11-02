import clsx from 'clsx';
import React from 'react';
import { AppStatusEnum } from '../../generated/graphql';

const AppStatus: React.FC<{ status: AppStatusEnum; lite?: boolean }> = ({ status, lite }) => {
  const formattedStatus = `${status[0]}${status.substring(1, status.length).toLowerCase()}`;

  const classes = clsx('status-dot status-gray', {
    'status-dot-animated status-green': status === AppStatusEnum.Running,
    'status-red': status === AppStatusEnum.Stopped,
  });

  return (
    <div data-place="top" data-tip={lite && formattedStatus} className="d-flex align-items-center">
      <span className={classes}></span>
      {!lite && <span className="ms-2 mb-1 text-muted fs-6 fw-light">{formattedStatus}</span>}
    </div>
  );
};

export default AppStatus;
