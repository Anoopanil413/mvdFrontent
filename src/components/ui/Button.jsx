import PropTypes from 'prop-types';

export const Button = ({ className = '', variant = 'default', type = 'button', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variantStyles = {
    default: "bg-sky-500 text-white hover:bg-sky-600",
    ghost: "hover:bg-sky-100 hover:text-sky-500",
  };
  
  Button.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'ghost']),
    type: PropTypes.string,
  };

  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles['default']} ${className}`;

  return (
    <button type={type} className={combinedClassName} {...props} />
  );
};

