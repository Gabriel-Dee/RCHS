import React, { createContext, useContext, useState } from 'react';
import { ChildAttendance } from '@/types/types';

interface ChildDataContextType {
  selectedChild: ChildAttendance | null;
  setSelectedChild: (child: ChildAttendance) => void;
}

const ChildDataContext = createContext<ChildDataContextType | undefined>(undefined);

export const ChildDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedChild, setSelectedChild] = useState<ChildAttendance | null>(null);

  return (
    <ChildDataContext.Provider value={{ selectedChild, setSelectedChild }}>
      {children}
    </ChildDataContext.Provider>
  );
};

export const useChildData = () => {
  const context = useContext(ChildDataContext);
  if (!context) {
    throw new Error('useChildData must be used within a ChildDataProvider');
  }
  return context;
};
