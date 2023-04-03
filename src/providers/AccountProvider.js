import { createContext, useContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const AccountContext = createContext(null);

export default function AccountProvider({ children }) {
    const [user, setUser] = useState({});
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, setUser);
    }, []);

    const value = { user, auth, setUser };

    return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
    return useContext(AccountContext);
}
