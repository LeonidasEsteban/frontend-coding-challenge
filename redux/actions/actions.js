import { TEST_ACTION } from '../types'

export const testAction = (message) => {
    return {
        type: TEST_ACTION,
        payload: message
    }
}
