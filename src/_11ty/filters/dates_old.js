import { DateTime } from "luxon";

/**
 * Date ISO
 * @param {Date} jsDate - either a JSDate or a Date string
 * @returns {string} - ISO Date: 2024-11-03
 */
function dateISO(jsDate) {
  jsDate = new Date(jsDate);
  let dt = DateTime.fromJSDate(jsDate);
  return dt.toISODate();
}

/**
 * Date Full
 * @param {Date} jsDate - either a JSDate or a Date string
 * @param {locale} locale - a locale for displaying the date in many languages
 * @returns {string} - full date: November 3, 2024
 */
function dateFull(jsDate, locale = "en") {
  jsDate = new Date(jsDate);
  let dt = DateTime.fromJSDate(jsDate);
  return dt.setLocale(locale).toLocaleString(DateTime.DATE_FULL);
}

export { dateISO, dateFull };
