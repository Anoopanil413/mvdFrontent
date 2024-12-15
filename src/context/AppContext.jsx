import  { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  user: {  },
  vehicleOwnerLIst: [],
};




const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'CLEAR_USER':
      return { ...state, user: initialState.user };
    case 'ADD_VEHICLE':
      return { ...state, vehicles: [...state.vehicles, action.payload] };
    case 'UPDATE_VEHICLE':
      return {
        ...state,
        vehicles: state.vehicles.map(vehicle =>
          vehicle.id === action.payload.id ? { ...vehicle, ...action.payload } : vehicle
        ),
      };
      case 'SET_VEHICLE_OWNER_LIST':
        return { ...state, vehicleOwnerLIst: action.payload };
      case 'CLEAR_VEHICLE_OWNER_LIST':
        return { ...state, vehicleOwnerLIst: initialState.vehicleOwnerLIst };
    case 'REMOVE_VEHICLE':
      return {
        ...state,
        vehicles: state.vehicles.filter(vehicle => vehicle.id !== action.payload.id),
      };
    case 'CLEAR_VEHICLES':
      return { ...state, vehicles: initialState.vehicles };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setUser = (userData) => dispatch({ type: 'SET_USER', payload: userData });
  const clearUser = () => dispatch({ type: 'CLEAR_USER' });

  const addVehicle = (vehicle) => dispatch({ type: 'ADD_VEHICLE', payload: vehicle });
  const updateVehicle = (vehicle) => dispatch({ type: 'UPDATE_VEHICLE', payload: vehicle });
  const removeVehicle = (vehicleId) => dispatch({ type: 'REMOVE_VEHICLE', payload: { id: vehicleId } });
  const clearVehicles = () => dispatch({ type: 'CLEAR_VEHICLES' });
  const setVehicleOwnerList = (ownerList) => dispatch({ type: 'SET_VEHICLE_OWNER_LIST', payload: ownerList });
  const clearVehicleOwnerList = () => dispatch({ type: 'CLEAR_VEHICLE_OWNER_LIST' });


  return (
    <AppContext.Provider
      value={{
        state,
        setUser,
        clearUser,
        addVehicle,
        updateVehicle,
        removeVehicle,
        clearVehicles,
        setVehicleOwnerList
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};