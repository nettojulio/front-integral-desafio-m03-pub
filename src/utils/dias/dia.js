import { getDay } from "date-fns";

export function dayOfWeek(datar) {
    const day = getDay(new Date(datar));

    switch (day) {
        case 0:
            return "Domingo"
        case 1:
            return "Segunda"
        case 2:
            return "Terça"
        case 3:
            return "Quarta"
        case 4:
            return "Quinta"
        case 5:
            return "Sexta"
        case 6:
            return "Sábado"
        default:
            break;
    }
}