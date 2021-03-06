/* eslint-disable no-console */

/**
  adapted from:
  https://github.com/michaelcontento/redux-log-slow-reducers/blob/master/src/index.js
  returns the original reducers wrapped in a timing/logging procedure
*/


const logSlowReducers = (reducers, thresholdMs = 4) =>
    Object.keys(reducers).reduce( (obj, key) => {
        const reducer = reducers[key]

        return {
            ...obj,

            [key]: (state, action) => {
                const t0 = Date.now()
                const newState = reducer(state, action)
                const diffMs = Date.now() - t0

                if (diffMs > thresholdMs) {
                    console.warn(`Reducer \`${key}\` took ${diffMs}ms for \`${action.type}\`.`)
                }

                return newState
            },

        }
    }, {})


export default logSlowReducers
