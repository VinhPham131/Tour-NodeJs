import React, { createContext, useState, useContext } from "react";

export const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
    const [avatar, setAvatar] = useState(null);

    return (
        <AvatarContext.Provider value={{ avatar, setAvatar }}>
            {children}
        </AvatarContext.Provider>
    );
};

export const useAvatar = () => {
    return useContext(AvatarContext);
};
