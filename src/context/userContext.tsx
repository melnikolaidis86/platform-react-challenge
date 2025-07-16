import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type UserContextType = {
    userId: string | null;
};

const UserContext = createContext<UserContextType>({ userId: null });

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        let id = localStorage.getItem("user_id");
        if (!id) {
            id = uuidv4();
            localStorage.setItem("user_id", id);
        }
        setUserId(id);
    }, []);

    return <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
