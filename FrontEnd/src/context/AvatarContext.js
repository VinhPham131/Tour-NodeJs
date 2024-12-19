import React, { createContext, useState, useContext } from "react";

// Tạo Context
export const AvatarContext = createContext();

// Provider để bọc toàn bộ ứng dụng
export const AvatarProvider = ({ children }) => {
    const [avatar, setAvatar] = useState(null);

    return (
        <AvatarContext.Provider value={{ avatar, setAvatar }}>
            {children}
        </AvatarContext.Provider>
    );
};

// Custom Hook để sử dụng AvatarContext dễ dàng hơn
export const useAvatar = () => {
    return useContext(AvatarContext);
};
