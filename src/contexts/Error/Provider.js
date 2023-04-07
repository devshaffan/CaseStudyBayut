import { useState } from "react"
import { ErrorContext } from "./Context"

const ErrorProvider = ({ children }) => {
    const [error, setError] = useState({
        state: false,
        msg: ""
    })
    return (
        <ErrorContext.Provider value={[error, setError]}>
            {children}
        </ErrorContext.Provider>
    )
}
export default ErrorProvider