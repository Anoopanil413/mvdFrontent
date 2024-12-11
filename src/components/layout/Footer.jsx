import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PropTypes from 'prop-types';

function Footer({ notifications }) {
    return (
        <footer className="fixed bottom-0 w-full">
            <div className="relative">
                <img 
                    src="/cityscape.svg" 
                    alt="Cityscape" 
                    className="w-full h-24 object-cover opacity-20"
                />
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute bottom-4 right-4 rounded-full bg-sky-500 text-white hover:bg-sky-600"
                >
                    <Bell className="h-6 w-6" />
                    {notifications && notifications > 0 && (
                        <Badge 
                            variant="destructive" 
                            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                        >
                            {notifications}
                        </Badge>
                    )}
                </Button>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    notifications: PropTypes.number,
};

export default Footer;