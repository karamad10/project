/* eslint-disable camelcase */
const { requiredFields } = require('./constants');

const validateInput = houseObj => {
  const errors = [];
  const {
    link,
    market_date,
    location_country,
    location_city,
    location_address,
    size_living_area,
    size_rooms,
    price_value,
    location_coordinates_lat,
    location_coordinates_lng,
    description,
    title,
    images,
    sold
  } = houseObj;

  function validateDate(date) {
    const selectedDate = new Date(date);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (selectedDate < now) {
      return true;
    } else {
      return true;
    }
  }

  function validURL(x) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&amp;a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i'
    );
    return pattern.test(x);
  }

  const validUrl = validURL(link);
  const validDate = validateDate(market_date);

  if (typeof houseObj !== 'object') {
    errors.push('Houses must be an object');
  }
  if (Object.entries(houseObj).length === 0 && houseObj.constructor === Object) {
    errors.push('invalid empty object');
  } else {
    const imgValidation = images.split(',');
    imgValidation.forEach((img, i) => {
      if (!validURL(img) === true) {
        errors.push(`image number ${i + 1} is not valid`);
      }
    });

    if (!validUrl || validUrl.length < 150) {
      errors.push(' Invalid URL ');
    }
    if (!validDate) {
      errors.push('Date must be in the past');
    }
    if (!isNaN(location_country) || !isNaN(location_city)) {
      errors.push('invalid Location');
    }
    if (location_address.length < 10 || location_address.length > 25) {
      errors.push('address should be 10-25 characters');
    }
    if (isNaN(size_living_area) || size_living_area > 1000 || size_living_area < 0) {
      errors.push('size should be be between 0 and 1000');
    }
    if (isNaN(size_rooms) || size_rooms > 20 || size_rooms <= 0) {
      errors.push('rooms should be be between 0 and 20');
    }
    if (price_value <= 0) {
      errors.push('invalid price');
    }
    if (isNaN(location_coordinates_lat) || isNaN(location_coordinates_lng)) {
      errors.push('lat/lng should be a number');
    }
    if (description.length < 10) {
      errors.push('description should be at least 10 characters');
    }
    if (title.length < 30 && title.length < 5) {
      errors.push('title should be 5-30 characters');
    }
    if (sold < 0 || sold > 1) {
      errors.push('sold is either 1 or 0');
    }
    {
      requiredFields.forEach(field => {
        if (typeof houseObj[field] === 'undefined' || '') {
          errors.push(`${field} is required !`);
        }
      });
    }
  }
  return {
    valid: errors.length === 0,
    errors,
    rawData: houseObj
  };
};

const sqlDataFields = houseObj => {
  return requiredFields.map(field => houseObj[field]);
};

module.exports = { validateInput, sqlDataFields };
