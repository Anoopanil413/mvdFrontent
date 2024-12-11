
import PropTypes from 'prop-types';

export const Label = ({ className = '', ...props }) => {
  return (
    <label
      className={`text-sm font-medium leading-none ${className}`}
      {...props}
    />
  );
};

Label.propTypes = {
  className: PropTypes.string,
};

