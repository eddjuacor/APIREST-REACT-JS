/* eslint-disable react/prop-types */
import { createContext, useState } from "react";


export const ContextApi = createContext([ {}, () => {} ]);

const ApiProvider = ({children}) => {
    const [auth, guardarAuth] = useState({
        token: '',
        auth: false
    })

    return(
        <ContextApi.Provider value={[auth, guardarAuth]}>
            {children}
        </ContextApi.Provider>
    )
}

export default ApiProvider