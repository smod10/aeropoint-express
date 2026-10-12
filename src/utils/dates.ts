// showPicker can throw when the browser doesn't consider the call user-initiated.
export const openDatePicker = (input: HTMLInputElement | null) => {
  setTimeout(() => {
    try {
      input?.showPicker();
    } catch {
      input?.focus();
    }
  }, 0);
};

export const addDays = (isoDate: string, days: number) => {
  const date = new Date(`${isoDate}T00:00:00`);
  date.setDate(date.getDate() + days);
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};
