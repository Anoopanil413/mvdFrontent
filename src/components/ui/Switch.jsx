
import PropTypes from 'prop-types';

export const Switch = ({ className = '', ...props }) => {
  return (
    <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
      <input type="checkbox" className="sr-only peer" {...props} />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-sky-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
    </label>
  );
};

Switch.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object,
};

