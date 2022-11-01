import { Flex, Spinner, Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import Header from './Header';
import { useRefreshTokenQuery } from '../../generated/graphql';

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

  const renderContent = () => {
    if (loading) {
      return (
        <Flex className="justify-center flex-1">
          <Spinner />
        </Flex>
      );
    }

    return children;
  };

  const renderBreadcrumbs = () => {
    if (!breadcrumbs) {
      return null;
    }

    return breadcrumbs.map((breadcrumb, index) => {
      if (breadcrumb.current) {
        return (
          <span key={index}>
            <Link href={breadcrumb.href}>{breadcrumb.name}</Link>
          </span>
        );
      }

      return (
        <span key={index}>
          <Link href={breadcrumb.href}>{breadcrumb.name}</Link>
        </span>
      );
    });

    // return (
    //   <Breadcrumb spacing="8px" separator={<FiChevronRight color="gray.500" />}>
    //     {breadcrumbs?.map((breadcrumb, index) => {
    //       return (
    //         <BreadcrumbItem className="hover:underline" isCurrentPage={breadcrumb.current} key={index}>
    //           <Link href={breadcrumb.href}>{breadcrumb.name}</Link>
    //         </BreadcrumbItem>
    //       );
    //     })}
    //   </Breadcrumb>
    // );
  };

  return (
    <div className="page">
      <Head>
        <title>Tipi</title>
      </Head>
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
// <Flex height="100vh" direction="column">
//   <MenuDrawer isOpen={isOpen} onClose={onClose}>
//     <Menu />
//   </MenuDrawer>

//   <Flex flex={1}>
//     <Flex height="100vh" bg={menubg} className="sticky top-0 invisible md:visible w-0 md:w-64">
//       <Menu />
//     </Flex>
//     <Box bg={bg} className="flex-1 px-4 py-4 md:px-10 md:py-8">
//       {renderBreadcrumbs()}
//       {renderContent()}
//     </Box>
//   </Flex>
// </Flex>

export default Layout;
