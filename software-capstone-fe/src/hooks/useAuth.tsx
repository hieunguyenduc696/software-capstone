import React, { createContext, useContext } from "react";
import { TUserProfileResponse } from "types/models";

type TAuthContextProp = {
  userProfile: TUserProfileResponse | null;
};

const AuthContext = createContext<TAuthContextProp>({
  userProfile: null,
});

type TProps = {
  children?: React.ReactNode;
};

export const AuthProvider: React.FC<TProps> = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        userProfile: null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
