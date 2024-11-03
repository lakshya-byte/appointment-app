import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear()
    return age
  };

  const formatDate=(dateString)=> {

    const [day, month, year] = dateString.split("_");
  
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    const monthName = months[parseInt(month, 10) - 1];
  
    const shortYear = year.slice(-2);
  
    return `${parseInt(day)} ${monthName} ${shortYear}`;
  }
  
  const value = {calculateAge, formatDate};


  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
