
/**
 * Functions related to date/time.
 * @namespace time
 */

/**
 * @returns {number} Current Unix UTC timestamp in seconds.
 * @memberof time
 */
export function getCurrentTimestamp() {
    const withMilliseconds = new Date().getTime();
    return Math.floor(withMilliseconds / 1000);
}
