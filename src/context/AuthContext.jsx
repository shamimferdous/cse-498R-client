import { createContext, useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import axios from "../config/axios";

export const AuthContext = createContext({
    user: null,
    setUser: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {},
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/users/authenticate`, {
                    withCredentials: true,
                });

                setIsAuthenticated(true);
                setUser(response.data);
            } catch (error) {
                // temporary
                setIsAuthenticated(true);
                setUser({
                    id: 1,
                    name: "John Doe",
                    email: "john@gmail.com",
                });
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const value = {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
    };

    return (
        <div>
            {loading ? (
                <Loader height={"100vh"} />
            ) : (
                <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
            )}
        </div>
    );
};

export default AuthProvider;
