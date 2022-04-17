/**
 * @typedef { Object } ConvertValues
 * @property { String } label
 * @property { String } code
 * @property { String } category
 * @property { Number } offset
 * @property { Number } weight
 */

import { ConvertAppValues } from './values'

const ConvertApp = {
  /**
   * @type { ConvertValues[] }
   */
  values: ConvertAppValues,

  /**
   * @name format
   * @param { String } valFrom
   * @param { String } codeTo
   * @param { Number } val
   * @returns { Number|Boolean }
   */
  format (codeFrom = '', codeTo = '', val = 0) {
    if (!codeFrom || !codeTo) return false
    /** @type { ConvertValues } */
    const valFrom = this.values.find(item => item.code === codeFrom)

    /** @type { ConvertValues } */
    const valTo = this.values.find(item => item.code === codeTo)

    if (valFrom.category !== valTo.category) return false

    return valFrom.offset / valTo.offset * val
  }
}

export function useConvert () {
  /**
   * @returns { Object }
   */
  return ConvertApp
}
