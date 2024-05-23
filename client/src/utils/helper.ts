export const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();
  let monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
    monthDifference += 12; // Adjusts to 12 months when month difference is 0 and today's date is less than the birth date
  }

  // Special case for less than a year but in the same month.
  if (
    age === 0 &&
    monthDifference === 0 &&
    today.getDate() < birthDate.getDate()
  ) {
    monthDifference = 11; // It's still 11 months when the current day is less than the day of birth.
  }

  return `${age !== 0 ? age + ' Years ' : ''}  ${
    monthDifference !== 0 ? monthDifference + ' Months ' : ''
  } `;
};

export const formatEnum = (string: string): string => {
  return string
    .split('_')
    .map(
      (word: string) => word[0].toUpperCase() + word.substring(1).toLowerCase()
    )
    .join(' ');
};

export const convertToEnum = (string: string): string => {
  return string.toUpperCase().replace(/ /g, '_');
};
