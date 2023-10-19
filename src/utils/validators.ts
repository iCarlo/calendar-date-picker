

export const validateInputDate = (date: string): string | null => {
  const regex = new RegExp("^([1-9][0-9]{3})-(0[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$");
  const validate = date.match(regex);

  if (date === "") {
    return null;
  }

  if (validate) {
    const dates = date.split("-");
    const year = parseInt(dates[0])
    const month = parseInt(dates[1])
    const day = parseInt(dates[2])

    const validYear = year > 1752;
    const validMonth = year === 1752 && month > 9;
    const validDay = year === 1752 && month === 9 && day >= 14;

    if (validYear || validMonth || validDay) {
      return null;
    } else {
      return "Invalid Gregorian Date (Earlier that Sept 14, 1752)"
    }
  }

  return "Invalid Format";
}