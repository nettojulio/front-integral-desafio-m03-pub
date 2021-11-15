import weekDayMap from "./weekDayMap";

export function orderColumnAsc(a, b, by) {
  if (by === "date") {
    return new Date(a.date) - new Date(b.date);
  }

  if (by === "weekDay") {
    return weekDayMap[a.week_day] - weekDayMap[b.week_day];
  }

  if (by === "value") {
    return a.value - b.value;
  }
}

export function orderColumnDesc(a, b, by) {
  if (by === "date") {
    return new Date(b.date) - new Date(a.date);
  }

  if (by === "weekDay") {
    return weekDayMap[b.week_day] - weekDayMap[a.week_day];
  }

  if (by === "value") {
    return b.value - a.value;
  }
}

export function getOnlySelectedWeekDay(weekDays) {
  const allSelectedDays = weekDays.filter((day) => day.selected);
  const daysName = [];

  for (const day of allSelectedDays) {
    daysName.push(day.name.toLowerCase());
  }
  return daysName;
}

export function getOnlySelectedCategories(categories) {
  const allSelectedCategories = categories.filter(
    (category) => category.selected
  );
  const categoriesName = [];

  for (const category of allSelectedCategories) {
    categoriesName.push(category.name.toLowerCase());
  }
  return categoriesName;
}

export function mergeNewAndOldCategories(
  currentTransactions,
  categoriesInFilter
) {
  const previousCategories = [];
  const categoryInCurrentTransactions = [];
  const categoriesFiltersWithoutRemovedItems = [...categoriesInFilter];
  const categoriesWithoutDuplicatedItems = [
    ...categoriesFiltersWithoutRemovedItems,
  ];

  for (const category of categoriesInFilter) {
    previousCategories.push(category.name);
  }

  for (const transaction of currentTransactions) {
    categoryInCurrentTransactions.push(transaction.category);
  }

  for (const category of previousCategories) {
    const categoryStillExists =
      categoryInCurrentTransactions.includes(category);

    if (!categoryStillExists) {
      const index = previousCategories.findIndex(
        (categoryInAnalisys) => categoryInAnalisys === category
      );

      previousCategories.splice(index, 1);
    }
  }

  for (const category of categoriesInFilter) {
    const categoryStillExists = previousCategories.includes(category.name);

    if (!categoryStillExists) {
      const index = categoriesFiltersWithoutRemovedItems.findIndex(
        (categoryInAnalisys) => categoryInAnalisys === category
      );

      categoriesFiltersWithoutRemovedItems.splice(index, 1);
    }
  }

  for (const transaction of currentTransactions) {
    if (previousCategories.indexOf(transaction.category) === -1) {
      previousCategories.push(transaction.category);
      categoriesWithoutDuplicatedItems.push({
        name: transaction.category,
        selected: false,
      });
    }
  }
  return categoriesWithoutDuplicatedItems;
}
