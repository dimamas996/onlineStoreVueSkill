export default function isValidNumber(newValue) {
  return typeof newValue === 'number' && !Number.isNaN(newValue) && newValue >= 0;
}
