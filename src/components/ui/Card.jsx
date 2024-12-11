
import PropTypes from 'prop-types';

export const Card = ({ className = '', ...props }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`} {...props} />
);

Card.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object
};

export const CardContent = ({ className = '', ...props }) => (
  <div className={`p-6 ${className}`} {...props} />
);

CardContent.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object
};

