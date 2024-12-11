
import PropTypes from 'prop-types';

export const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 ${className}`}
      {...props}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
};

