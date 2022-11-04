import { SlideFade, Flex, Divider, useDisclosure, useToast } from '@chakra-ui/react';
import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { useSystemStore } from '../../../state/systemStore';
import AppActions from '../components/AppActions';
import InstallModal from '../components/InstallModal';
import StopModal from '../components/StopModal';
import UninstallModal from '../components/UninstallModal';
import UpdateSettingsModal from '../components/UpdateSettingsModal';
import AppLogo from '../../../components/AppLogo/AppLogo';
import Markdown from '../../../components/Markdown/Markdown';
import {
  App,
  AppInfo,
  AppStatusEnum,
  GetAppDocument,
  InstalledAppsDocument,
  useInstallAppMutation,
  useStartAppMutation,
  useStopAppMutation,
  useUninstallAppMutation,
  useUpdateAppConfigMutation,
  useUpdateAppMutation,
} from '../../../generated/graphql';
import UpdateModal from '../components/UpdateModal';
import { IFormValues } from '../components/InstallForm';
import AppStatus from '../../../components/AppTile/AppStatus';

interface IProps {
  app?: Pick<App, 'status' | 'config' | 'version' | 'updateInfo' | 'exposed' | 'domain'>;
  info: AppInfo;
}

const AppDetails: React.FC<IProps> = ({ app, info }) => {
  const toast = useToast();
  const installDisclosure = useDisclosure();
  const uninstallDisclosure = useDisclosure();
  const stopDisclosure = useDisclosure();
  const updateDisclosure = useDisclosure();
  const updateSettingsDisclosure = useDisclosure();

  // Mutations
  const [update] = useUpdateAppMutation({ refetchQueries: [{ query: GetAppDocument, variables: { appId: info.id } }] });
  const [install] = useInstallAppMutation({ refetchQueries: [{ query: GetAppDocument, variables: { appId: info.id } }, { query: InstalledAppsDocument }] });
  const [uninstall] = useUninstallAppMutation({ refetchQueries: [{ query: GetAppDocument, variables: { appId: info.id } }, { query: InstalledAppsDocument }] });
  const [stop] = useStopAppMutation({ refetchQueries: [{ query: GetAppDocument, variables: { appId: info.id } }] });
  const [start] = useStartAppMutation({ refetchQueries: [{ query: GetAppDocument, variables: { appId: info.id } }] });
  const [updateConfig] = useUpdateAppConfigMutation({ refetchQueries: [{ query: GetAppDocument, variables: { appId: info.id } }] });

  const updateAvailable = Number(app?.updateInfo?.current || 0) < Number(app?.updateInfo?.latest);

  const { internalIp } = useSystemStore();

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };

  const handleInstallSubmit = async (values: IFormValues) => {
    installDisclosure.onClose();
    const { exposed, domain, ...form } = values;
    try {
      await install({
        variables: { input: { form, id: info.id, exposed: exposed || false, domain: domain || '' } },
        optimisticResponse: { installApp: { id: info.id, status: AppStatusEnum.Installing, __typename: 'App' } },
      });
    } catch (error) {
      handleError(error);
    }
  };

  const handleUnistallSubmit = async () => {
    uninstallDisclosure.onClose();
    try {
      await uninstall({ variables: { id: info.id }, optimisticResponse: { uninstallApp: { id: info.id, status: AppStatusEnum.Uninstalling, __typename: 'App' } } });
    } catch (error) {
      handleError(error);
    }
  };

  const handleStopSubmit = async () => {
    stopDisclosure.onClose();
    try {
      await stop({ variables: { id: info.id }, optimisticResponse: { stopApp: { id: info.id, status: AppStatusEnum.Stopping, __typename: 'App' } } });
    } catch (error) {
      handleError(error);
    }
  };

  const handleStartSubmit = async () => {
    try {
      await start({ variables: { id: info.id }, optimisticResponse: { startApp: { id: info.id, status: AppStatusEnum.Starting, __typename: 'App' } } });
    } catch (e: unknown) {
      handleError(e);
    }
  };

  const handleUpdateSettingsSubmit = async (values: IFormValues) => {
    try {
      const { exposed, domain, ...form } = values;
      await updateConfig({ variables: { input: { form, id: info.id, exposed: exposed || false, domain: domain || '' } } });
      toast({
        title: 'Success',
        description: 'App config updated successfully. Restart the app to apply the changes.',
        position: 'top',
        status: 'success',
        isClosable: true,
      });
      updateSettingsDisclosure.onClose();
    } catch (error) {
      handleError(error);
    }
  };

  const handleUpdateSubmit = async () => {
    updateDisclosure.onClose();
    try {
      await update({ variables: { id: info.id }, optimisticResponse: { updateApp: { id: info.id, status: AppStatusEnum.Updating, __typename: 'App' } } });
      toast({
        title: 'Success',
        description: 'App updated successfully',
        position: 'top',
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      handleError(error);
    }
  };

  const handleOpen = () => {
    const { https } = info;
    const protocol = https ? 'https' : 'http';

    if (typeof window !== 'undefined') {
      window.open(`${protocol}://${internalIp}:${info.port}${info.url_suffix || ''}`, '_blank', 'noreferrer');
    }
  };

  const version = [info?.version || 'unknown', app?.version ? `(${app.version})` : ''].join(' ');
  const newVersion = [app?.updateInfo?.dockerVersion ? `${app?.updateInfo?.dockerVersion}` : '', `(${app?.updateInfo?.latest})`].join(' ');

  return (
    <div className="card">
      <InstallModal onSubmit={handleInstallSubmit} isOpen={installDisclosure.isOpen} onClose={installDisclosure.onClose} app={info} />
      <div className="card-header d-flex flex-column flex-md-row">
        <AppLogo id={info.id} size={100} alt={info.name} />
        <div className="w-100 d-flex flex-column ms-md-3 align-items-center align-items-md-start">
          <div className="">
            <span className="mt-1 me-1">Version: </span>
            <span className="badge bg-gray mt-2">{info?.version}</span>
          </div>
          <span>{info.short_desc}</span>
          {app && app?.status !== AppStatusEnum.Missing && <AppStatus status={app.status} />}
          <AppActions
            updateAvailable={updateAvailable}
            onUpdate={updateDisclosure.onOpen}
            onUpdateSettings={updateSettingsDisclosure.onOpen}
            onOpen={handleOpen}
            onStart={handleStartSubmit}
            onStop={stopDisclosure.onOpen}
            onCancel={stopDisclosure.onOpen}
            onUninstall={uninstallDisclosure.onOpen}
            onInstall={installDisclosure.onOpen}
            app={info}
            status={app?.status}
          />
        </div>
      </div>
      <div className="card">
        <div style={{ marginTop: -1, marginBottom: -3 }} className="card-header">
          <ul className="nav nav-tabs card-header-tabs" data-bs-toggle="tabs" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" href="#tabs-description" data-bs-toggle="tab" role="tab" aria-selected="true">
                Description
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#tabs-links" data-bs-toggle="tab" role="tab" aria-selected="true">
                Links
              </a>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <div className="tab-content">
            <div className="tab-pane active" id="tabs-description" role="tabpanel">
              <Markdown className="mt-3">{info.description}</Markdown>
            </div>
            <div className="tab-pane" id="tabs-links" role="tabpanel"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <SlideFade in className="flex flex-1" offsetY="20px">
  //     <div className="flex flex-1 p-4 mt-3 rounded-lg flex-col">
  //       <Flex className="flex-col md:flex-row">
  //         <AppLogo id={info.id} size={180} className="self-center md:self-auto" alt={info.name} />
  //         <div className="flex flex-col justify-between flex-1 ml-0 md:ml-4">
  //           <div className="mt-3 items-center self-center flex flex-col md:items-start md:self-start md:mt-0">
  //             <h1 className="font-bold text-2xl">{info.name}</h1>
  //             {app?.domain && app.exposed && (
  //               <a target="_blank" rel="noreferrer" className="text-blue-500 text-md" href={`https://${app.domain}`}>
  //                 <Flex className="items-center">
  //                   {app.domain}
  //                   <FiExternalLink className="ml-1" />
  //                 </Flex>
  //               </a>
  //             )}

  //             <h2 className="text-center md:text-left">{info.short_desc}</h2>
  //             <h3 className="text-center md:text-left text-sm">
  //               version: <b>{version}</b>
  //             </h3>
  //             {info.source && (
  //               <a target="_blank" rel="noreferrer" className="text-blue-500 text-xs" href={info.source}>
  //                 <Flex className="mt-2 items-center">
  //                   Source
  //                   <FiExternalLink className="ml-1" />
  //                 </Flex>
  //               </a>
  //             )}
  //             <p className="text-xs text-gray-600">By {info.author}</p>
  //           </div>

  //           <div className="flex flex-1">
  //             <AppActions
  //               updateAvailable={updateAvailable}
  //               onUpdate={updateDisclosure.onOpen}
  //               onUpdateSettings={updateSettingsDisclosure.onOpen}
  //               onOpen={handleOpen}
  //               onStart={handleStartSubmit}
  //               onStop={stopDisclosure.onOpen}
  //               onCancel={stopDisclosure.onOpen}
  //               onUninstall={uninstallDisclosure.onOpen}
  //               onInstall={installDisclosure.onOpen}
  //               app={info}
  //               status={app?.status}
  //             />
  //           </div>
  //         </div>
  //       </Flex>
  //       <Divider className="mt-5" />
  //       <Markdown className="mt-3">{info.description}</Markdown>
  //       <InstallModal onSubmit={handleInstallSubmit} isOpen={installDisclosure.isOpen} onClose={installDisclosure.onClose} app={info} />
  //       <UninstallModal onConfirm={handleUnistallSubmit} isOpen={uninstallDisclosure.isOpen} onClose={uninstallDisclosure.onClose} app={info} />
  //       <StopModal onConfirm={handleStopSubmit} isOpen={stopDisclosure.isOpen} onClose={stopDisclosure.onClose} app={info} />
  //       <UpdateSettingsModal
  //         onSubmit={handleUpdateSettingsSubmit}
  //         isOpen={updateSettingsDisclosure.isOpen}
  //         onClose={updateSettingsDisclosure.onClose}
  //         app={info}
  //         config={app?.config}
  //         exposed={app?.exposed}
  //         domain={app?.domain || ''}
  //       />
  //       <UpdateModal onConfirm={handleUpdateSubmit} isOpen={updateDisclosure.isOpen} onClose={updateDisclosure.onClose} app={info} newVersion={newVersion} />
  //     </div>
  //   </SlideFade>
  // );
};

export default AppDetails;
