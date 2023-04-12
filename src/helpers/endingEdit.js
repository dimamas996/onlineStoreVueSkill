export default function endingEdit(value) {
  let string = 'товар';
  if ([11, 12, 13, 14].includes(value % 100)) {
    string += 'ов';
  } else if (value % 10 === 1) {
    string += '';
  } else if ([2, 3, 4].includes(value % 10)) {
    string += 'а';
  } else {
    string += 'ов';
  }
  return string;
}
