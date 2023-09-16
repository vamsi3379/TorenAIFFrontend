import { createContext, useContext, useState } from 'react';

// Create a context
const ClassificationsContext = createContext();

// Create a custom hook to access the context
export const useClassificationsContext = () => {
  return useContext(ClassificationsContext);
};

// Create a context provider
export const ClassificationsProvider = ({ children }) => {
  const [selectedClassifications, setSelectedClassifications] = useState([]);

  const toggleClassification = (classification) => {
    if (selectedClassifications.includes(classification)) {
      setSelectedClassifications(selectedClassifications.filter((c) => c !== classification));
    } else {
      setSelectedClassifications([...selectedClassifications, classification]);
    }
  };

  return (
    <ClassificationsContext.Provider value={{ selectedClassifications, toggleClassification }}>
      {children}
    </ClassificationsContext.Provider>
  );
};