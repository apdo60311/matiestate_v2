/**
 * Checks if a value is empty (undefined, null, empty object/array, or whitespace string)
 * @param value - The value to check
 * @returns True if the value is considered empty
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === undefined || value === null) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};

/**
 * Calculates the difference in days between two dates, ignoring time and timezone
 * @param date1Str - First date string (ISO format recommended)
 * @param date2Str - Second date string (ISO format recommended)
 * @returns Number of full days between dates
 * @throws Error if invalid date strings are provided
 */
export const getDaysDifference = (
  date1Str: string,
  date2Str: string
): number => {
  const parseDate = (dateStr: string): Date => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime()))
      throw new Error(`Invalid date string: ${dateStr}`);
    return date;
  };

  const date1 = parseDate(date1Str);
  const date2 = parseDate(date2Str);

  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
};

interface ValueWithAmount {
  amount: number;
  [key: string]: any;
}

/**
 * Reducer function that sums the 'amount' property while preserving other properties from the last item
 * @param accumulator - Accumulating object
 * @param currentValue - Current item being processed
 * @returns New object with combined amount and last item's properties
 */
export const totalAmountReducer = (
  accumulator: ValueWithAmount,
  currentValue: ValueWithAmount
): ValueWithAmount => ({
  ...currentValue,
  amount: accumulator.amount + currentValue.amount,
});

interface ValueWithCreditAmount {
  credit_amount?: number;
  [key: string]: any;
}

/**
 * Reducer function that sums the 'credit_amount' property while preserving other properties from the last item
 * @param accumulator - Accumulating object
 * @param currentValue - Current item being processed
 * @returns New object with combined credit_amount and last item's properties
 */
export const totalcreditReducer = (
  accumulator: ValueWithCreditAmount,
  currentValue: ValueWithCreditAmount
): ValueWithCreditAmount => ({
  ...currentValue,
  credit_amount:
    (accumulator.credit_amount ?? 0) + (currentValue.credit_amount ?? 0),
});

/**
 * Groups array items by a specified key
 * @param xs - Array to group
 * @param key - Property to group by
 * @returns Object with keys mapping to arrays of grouped items
 */
const groupBy = <T extends Record<string, any>>(
  xs: T[],
  key: keyof T
): { [key: string]: T[] } => {
  return xs.reduce((rv: { [key: string]: T[] }, x: T) => {
    const groupKey = x[key];
    rv[groupKey as string] = rv[groupKey as string] || [];
    rv[groupKey].push(x);
    return rv;
  }, {});
};

interface CollectionItem {
  contract_id: string;
  [key: string]: any;
}

/**
 * Groups and reduces items with the same contract_id using a custom reducer
 * @param collection - Array of items to process
 * @param reducer - Reducer function to apply to each group
 * @returns Array of reduced items
 */
export const sumSameContractId = <T extends CollectionItem>(
  collection: T[],
  reducer: (accumulator: T, currentValue: T) => T
): T[] => {
  const groups = groupBy(collection, "contract_id");
  return Object.values(groups).map((group) => group.reduce(reducer));
};

/**
 * Creates a new Date object with added days
 * @param date - Base date object
 * @param days - Number of days to add (can be negative)
 * @returns New Date object with adjusted days
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
};
