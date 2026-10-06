import React, { type SelectHTMLAttributes } from 'react';
import { dialingCountries } from '../data/countries';

interface PhoneCountrySelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const PhoneCountrySelect: React.FC<PhoneCountrySelectProps> = ({ defaultValue, value, className = '', ...props }) => {
  const selectionProps = value === undefined ? { defaultValue: defaultValue ?? 'NG' } : { value };

  return (
    <select {...props} {...selectionProps} className={className}>
      {dialingCountries.map((country) => (
        <option key={country.code} value={country.code}>{country.dialCode} {country.code === 'US' ? 'United States' : country.name}</option>
      ))}
    </select>
  );
};

export default PhoneCountrySelect;