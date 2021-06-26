/**
 * dynamicScope is for passing
 * objects inside mocked objects
 * @namespace dynamicScope
 */

/**
 * Private state structure. Represents dynamic context.
 * @memberof dynamicScope
 */
const dynamicState: { [key: string]: any } = {};

/**
 * Get value for a key in current dynamic context.
 * @param {string} name - key.
 * @memberof dynamicScope
 */
function getDynamic(name: string) {
  return dynamicState[name];
}

/**
 * Set value for a key in current dynamic context.
 * @param {string} name - key.
 * @param {any} value - value.
 * @memberof dynamicScope
 */
function setDynamic(name: string, value: unknown, body: () => unknown) {
  const previous = dynamicState[name];
  try {
    dynamicState[name] = value;
    return body();
  } finally {
    dynamicState[name] = previous;
  }
}

export { getDynamic, setDynamic };
