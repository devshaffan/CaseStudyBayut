import { useContext, useEffect } from "react";
import { ErrorContext } from "../contexts/Error/Context";

export default function ErrorPage({ msg = "Some technical difficulties...", children }) {

    const [error, setError] = useContext(ErrorContext);
    return <>
        {error.state ? <div style={{ fontSize: "30px", margin: "auto", paddingLeft: "40vw", paddingTop: "30vh" }}>
            {error.msg ? error.msg : msg}
        </div> : children}

    </>
}