export function convertUnixToDateFormat(unixDate: number) {
  return new Date(unixDate * 1000).toLocaleString('en-GB', {
    timeStyle: 'short',
    dateStyle: 'medium',
  });
}
