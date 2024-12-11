import { Car } from 'lucide-react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '../ui/Card';

function VehicleCard({ type, name, registrationNumber }) {
    return (
        <Card className="bg-sky-50">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-sky-500 flex items-center justify-center">
                        <Car className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-medium">{name}</h3>
                        <p className="text-sm text-muted-foreground">{type}</p>
                    </div>
                </div>
                <p className="text-lg font-semibold text-sky-500">{registrationNumber}</p>
            </CardContent>
        </Card>
    );
}
VehicleCard.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    registrationNumber: PropTypes.string.isRequired,
};

export default VehicleCard;
