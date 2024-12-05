import { DateTime } from "luxon";

/**
 * Format JSdate or string as full date
 * @param {date} date - can be JS date or string
 * @param {string} locale - locale code
 * @returns {string} - formatted date
 */
function dateFull(date, locale = "en") {
  const jsDate = new Date(date);
  const dt = DateTime.fromJSDate(jsDate);
  return dt.setLocale(locale).toLocaleString(DateTime.DATE_FULL);
}

/**
 * Formats a date to ISO string
 * @param {*} date - can be JS date or string
 * @returns {string} - formatted date
 */
function dateISO(date) {
  const jsDate = new Date(date);
  const dt = DateTime.fromJSDate(jsDate);
  return dt.toISODate();
}

export { dateFull, dateISO };
