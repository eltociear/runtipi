import Image from 'next/image';
import React from 'react';
import { getUrl } from '../../../core/helpers/url-helpers';

interface IProps {
  children: React.ReactNode;
}

const AuthFormLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <a className="navbar-brand navbar-brand-autodark">
            <Image alt="Tipi log" layout="intrinsic" src={getUrl('tipi.png')} height={50} width={50} />
          </a>
        </div>
        <div className="card card-md">
          <div className="card-body">{children}</div>
        </div>
      </div>
      {/* <Flex flex={1} height="100vh" overflowY="hidden">
        <SlideFade in className="flex flex-1 flex-col justify-center items-center" offsetY="20px">
          <img className="self-center mb-5 logo" src={getUrl('tipi.png')} width={512} height={512} />
          <Text className="text-xl md:text-2xl lg:text-5xl font-bold" size="3xl">
            {title}
          </Text>
          <Text className="md:text-lg lg:text-2xl text-center" color="gray.500">
            {description}
          </Text>
          {children}
        </SlideFade>
      </Flex> */}
    </div>
  );
};

export default AuthFormLayout;
