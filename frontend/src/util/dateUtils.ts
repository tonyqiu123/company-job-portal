export function formatDate(dateString: string): string {
  const options = { month: 'long', day: 'numeric', year: 'numeric' } as Intl.DateTimeFormatOptions;
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

export function isValidISODateTime(dateTimeString: string): boolean {
  const regex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+Z/;
  return regex.test(dateTimeString);
}
