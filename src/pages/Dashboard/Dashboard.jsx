import React from 'react';
import DashBoardInfo from '../../components/Info/DashBoardInfo';
import SearchVehicle from '../SearchVehicles/SearchVehicles';

const Dashboard = () => {
    // const {state} = useAppContext();
    // console.log(state)
  return (
    <>
    <SearchVehicle/>
        <DashBoardInfo/>

    </>
  );
};

export default Dashboard;

