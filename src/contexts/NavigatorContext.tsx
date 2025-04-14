import React, {
    ReactNode,
    createContext,
    useContext,
    useRef,
    RefObject,
} from "react";

interface INavigatorContextContext {
    targetRef: RefObject<HTMLDivElement>;
    scrollToSection: () => void;
}

const MyContext = createContext<INavigatorContextContext | undefined>(undefined);

const MyNavigatorContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const targetRef = useRef<HTMLDivElement>(null);

    const scrollToSection = () => {
        targetRef.current?.scrollIntoView({
            behavior: 'smooth',
        } as ScrollIntoViewOptions);
    };

    return (
        <MyContext.Provider value={{ targetRef, scrollToSection }}>
            {children}
        </MyContext.Provider>
    );
};

const useMyNavigatorContextContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyNavigatorContextContext must be used within a provider");
    }
    return context;
};

export { MyNavigatorContextProvider, useMyNavigatorContextContext };
