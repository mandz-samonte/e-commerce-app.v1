import React, { useCallback, useEffect, useRef, useState } from "react";
import usePropertySetterCallback from "./usePropertySetterCallback";
import _ from "lodash";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { forEach } from "lodash";

function useStateWithCallback(prop) {
    const callbackRef = useRef(null);
    const [state, setState] = useState(prop);

    useEffect(() => {
        if (callbackRef.current) {
            callbackRef.current(state);
            callbackRef.current = null;
        }
    }, [state]);

    return [
        state,
        useCallback((newValue, callback) => {
            callbackRef.current = callback;

            return setState(newValue);
        }, []),
    ];
}

export default function useForm({ initialState = null, validation = null, onSubmit = null } = null) {
    const [data, setData] = useStateWithCallback(initialState);
    const [errors, setErrors] = useState({});

    const setProperty = usePropertySetterCallback(data, setData);
    const setErrorProperty = usePropertySetterCallback(errors, setErrors);

    const removeErrorProperty = useCallback((property) => {
        setErrors((prevErrors) => (prevErrors?.[property] ? _.omit(prevErrors, property) : prevErrors));
    }, []);

    const validateAll = () =>
        new Promise((resolve, reject) => {
            for (const [key, value] of Object.entries(validation)) {
                validateInput(key, data[key], data);
            }
            setTimeout(() => {
                setErrors((prevErrors) => {
                    resolve(prevErrors);
                    return prevErrors;
                });
            }, 300);
        });

    const validateInput = useCallback(
        (property, value, newData) => {
            let validate = validation?.[property];

            if (Boolean(validate?.isRequired) && isEmpty(value)) {
                setErrorProperty(
                    `${property}.message`,
                    typeof validate.isRequired === "string" ? validate.isRequired : `Field is required`
                );
                return;
            } else if (Boolean(validate?.isEmail) && !isEmail(value)) {
                setErrorProperty(
                    `${property}.message`,
                    typeof validate.isEmail === "string" ? validate.isEmail : `Value must be an Email`
                );
            } else if (Boolean(validate?.isNumber) && isNaN(value)) {
                setErrorProperty(
                    `${property}.message`,
                    typeof validate.isNumber === "string" ? validate.isNumber : `Value must be a number`
                );
            } else if (validate?.custom && validate?.custom(newData)) {
                setErrorProperty(`${property}.message`, validate?.custom(newData));
            } else {
                removeErrorProperty(property);
            }
        },
        [validation]
    );

    const setForm = useCallback(
        (property, value) => {
            setProperty(property, value, (newData) => validateInput(property, value, newData));
        },
        [data]
    );

    const resetForm = useCallback(() => {
        setData(initialState);
    }, []);

    return [
        data,
        setForm,
        useCallback(
            async (e) => {
                e.preventDefault();
                let waitedErrors = await validateAll();
                if (_.isEmpty(waitedErrors)) onSubmit(e, data);
            },
            [data, errors, onSubmit]
        ),
        errors,
        resetForm,
    ];
}
