import { ReactNode } from 'react';
import './index';

export const LocaleProvider = ({ 
  children 
}: { 
  children: ReactNode 
}) => {
  return (
    <>
      {children}
    </>
  );
};