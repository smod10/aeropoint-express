import { getCountryCallingCode, type CountryCode } from 'libphonenumber-js';
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';

export interface CountryOption {
  code: string;
  name: string;
  dialCode: string | null;
}

countries.registerLocale(en);
const regions = Object.keys(countries.getAlpha2Codes());

export const allCountries: CountryOption[] = regions
  .map((code) => {
    const name = countries.getName(code, 'en') ?? code;
    if (!name || name === code) {
      return null;
    }

    let dialCode: string | null = null;
    try {
      dialCode = `+${getCountryCallingCode(code as CountryCode)}`;
    } catch {
      dialCode = null;
    }

    return {
      code,
      name,
      dialCode,
    };
  })
  .filter((country): country is CountryOption => Boolean(country))
  .sort((a, b) => a.name.localeCompare(b.name));

export const dialingCountries = allCountries.filter((country) => country.dialCode);

export const countryNames = allCountries.map((country) => country.name);

export const dialingCodes = Array.from(
  new Set(
    dialingCountries
      .map((country) => country.dialCode)
      .filter((dialCode): dialCode is string => Boolean(dialCode)),
  ),
).sort((a, b) => Number(a.replace('+', '')) - Number(b.replace('+', '')));