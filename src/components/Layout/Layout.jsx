import { Card } from "antd";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 mt-4">
                    <Card
                        bodyStyle={{
                            padding: 0,
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                            borderRadius: 5,
                        }}
                        bordered={false}
                    >
                        <div className="d-flex justify-content-between align-items-center px-4 py-3">
                            <img src="/logo.png" alt="logo" height={35} />
                            <ul className="list-inline mb-0 d-flex gap-3">
                                <li className="list-inline-item">
                                    <Link to="/" className="text-decoration-none fw-bold">
                                        Products
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="/batches" className="text-decoration-none fw-bold">
                                        Batches
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <span role="button" className="fw-bold">
                                        Logout
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </Card>
                </div>
                <div className="col-12 mt-4">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
