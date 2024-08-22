import { createContext, useContext, useState } from "react";

interface registerProps {
    email?: String;
    password?: String;
    name?: String;
    phoneNumber?: String;
    address?: String;
    lng?: Number;
    lat?: Number;
    pharmaPicture?: String;
}

interface RegType {
    regProps?: registerProps;
    updateProps?: (props: registerProps) => void;
}

const RegContext = createContext<RegType>({});

const useReg = () => {
    return useContext(RegContext);
};

export const RegProvider = ({ children }: any) => {
    const [regProps, setRegprops] = useState<registerProps>({});

    const updateProps = (props: registerProps) => {
        setRegprops({ ...regProps, ...props });
    };
    const value = {
        regProps,
        updateProps,
    };
    return <RegContext.Provider value={value}>{children}</RegContext.Provider>;
};
