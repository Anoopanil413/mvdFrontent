
import PropTypes from 'prop-types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function VehicleSearch({ userName }) {
    return (
        <div className="p-4 space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-lg">Good Afternoon {userName}</h2>
                <p className="text-sm text-muted-foreground">
                    *We will help you find out the vehicle blocking your way.
                </p>
            </div>
            
            <div className="space-y-4">
                <Input 
                    placeholder="TYPE VEHICLE NUMBER" 
                    className="text-center uppercase"
                />
                
                <Button 
                    className="w-full bg-sky-500 hover:bg-sky-600"
                >
                    FIND VEHICLE OWNER
                </Button>
            </div>
        </div>
    )
}

VehicleSearch.propTypes = {
    userName: PropTypes.string.isRequired,
};

