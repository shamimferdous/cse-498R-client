import { createContext } from "react";
import Loader from "../components/Loader/Loader";

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
                // if access token is present, request, either throw error
                if (!window.localStorage.getItem("access_token")) {
                    throw new Error("No access token");
                }

                let response = await axios.get(`/users/authenticate`, {
                    withCredentials: true,
                });

                setIsAuthenticated(true);
                setUser(response.data);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
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
