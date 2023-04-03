import { useCallback, useEffect } from "react";
import _ from "lodash";

export default function usePropertySetterCallback(object, setObject) {
    return useCallback(
        (property, value = null, cb) => {
            setObject((prevObject) => {
                const objectClone = Array.isArray(prevObject) ? [...prevObject] : { ...prevObject };

                if (_.isString(property)) {
                    _.set(objectClone, property, value);
                } else if (_.isArray(property)) {
                    _.forEach(property, (p) => _.set(objectClone, p, value));
                } else {
                    _.forEach(property, (value, p) => _.set(objectClone, p, value));
                }

                return objectClone;
            }, cb);
            return true;
        },
        [object, setObject]
    );
}
