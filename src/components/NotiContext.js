import { createContext, useContext, useReducer } from 'react'

const notiReducer = (state, action) => {
    switch (action.type) {
        case 'set_noti':
            return action.payload

        case 'clear_noti':
            return null

        default:
            throw Error('Unknown action: ' + action.type)
    }
}

const NotiContext = createContext()

export const NotiContextProvider = props => {
    const [noti, notiDispatch] = useReducer(notiReducer, null)

    return <NotiContext.Provider value={[noti, notiDispatch]}>
        {props.children}
    </NotiContext.Provider>
}

export const setNotiAction = payload => {
    return { type: 'set_noti', payload }
}

export const clearNotiAction = () => {
    return { type: 'clear_noti' }
}

export const useNotiValue = () => {
    const notiAndDispatch = useContext(NotiContext)
    return notiAndDispatch[0]
}

export const useNotiDispatch = () => {
    const notiAndDispatch = useContext(NotiContext)
    return notiAndDispatch[1]
}

export default NotiContext