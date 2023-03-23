export default function numberFormat(number) {
  return Intl.NumberFormat('ru-RU').format(number);
}
