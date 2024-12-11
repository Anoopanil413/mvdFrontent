import { ArrowLeft, Menu } from 'lucide-react';
import PropTypes from 'prop-types';
import { Button } from '../ui/Button';

export function Header({ title, showBack = false, showMenu = false, onMenuClick }) {
    return (
        <header className="flex items-center justify-between p-4 bg-white">
            {showBack ? (
                    <Button variant="ghost" size="icon" className="rounded-full bg-sky-500 text-white hover:bg-sky-600">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
            ) : showMenu ? (
                <Button variant="ghost" size="icon" className="rounded-full bg-sky-500 text-white hover:bg-sky-600" onClick={onMenuClick}>
                    <Menu className="h-6 w-6" />
                </Button>
            ) : (
                <div className="w-10" />
            )}
            <h1 className="text-xl font-medium text-sky-500">{title}</h1>
            <div className="w-10" />
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    showBack: PropTypes.bool,
    showMenu: PropTypes.bool,
    onMenuClick: PropTypes.func,
};   