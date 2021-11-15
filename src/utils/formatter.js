import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatToMoney(value) {
  const stringToNumber = Number(value);
  return stringToNumber.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatDateWord(word) {
  return word[0].toUpperCase() + word.slice(1, word.length);
}

export function formatDate(date) {
  const datePattern = new Date(date);
  return format(datePattern, "dd/MM/yyyy");
}

export function formatWeekDay(date) {
  return format(date, "eee", {
    locale: ptBR,
  });
}
