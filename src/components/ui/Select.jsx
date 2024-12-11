import { ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';

export const Select = ({ className = '', options, ...props }) => {
  return (
    <div className="relative">
      <select
        className={`flex h-10 w-full appearance-none rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
    </div>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

