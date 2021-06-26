/**
 * @file
 * dynamicScope is for passing
 * objects inside mocked objects
 */

/**
 * Private state structure. Represents dynamic context.
 */
const dynamicState: { [key: string]: any } = {};

/**
 * Get value for a key in current dynamic context.
 * @param {string} name - key.
 */
function getDynamic(name: string) {
  return dynamicState[name];
}

/**
 * Set value for a key in current dynamic context.
 * @param {string} name - key.
 * @param {any} value - value.
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
