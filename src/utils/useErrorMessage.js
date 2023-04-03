import React, { useEffect } from "react";
import { useState } from "react";
import en from "./validation_en";

export default function useErrorMessage() {
    const [errorMessage, setErrorMessage] = useState();
    const [errorCode, setErrorCode] = useState();

    useEffect(() => {
        setErrorMessage(en[errorCode] || "");
    }, [errorCode]);

    return [errorMessage, setErrorCode];
}
