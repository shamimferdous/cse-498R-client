import { Button, Card, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Loader from "../../components/Loader/Loader";
import axios from "../../config/axios";

const Batches = () => {
    const [loading, setLoading] = useState(true);
    const [batches, setBatches] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/products/batches", { withCredentials: true });
                setBatches(res.data);
            } catch (error) {
                setBatches([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <Layout>
            <Card
                bodyStyle={{
                    padding: 0,
                }}
            >
                <div className="d-flex justify-content-between align-items-center px-4 py-3">
                    <h3 className="mb-0">Batches</h3>
                </div>
            </Card>
            <div className="mt-4" />
            {loading ? (
                <Card>
                    <Loader height={"60vh"} />
                </Card>
            ) : (
                <Table
                    dataSource={batches}
                    bordered
                    columns={[
                        {
                            title: "ID",
                            dataIndex: "id",
                            key: "id",
                        },
                        {
                            title: "Product",
                            dataIndex: "product",
                            key: "product",
                            render: (product) => product.name,
                        },
                        {
                            title: "Production Date",
                            dataIndex: "production_date",
                            key: "production_date",
                            render: (production_date) => dayjs(production_date).format("DD MMMM YYYY"),
                        },
                        {
                            title: "Quantity",
                            dataIndex: "qty",
                            key: "qty",
                        },
                        {
                            title: "QR Preview",
                            dataIndex: "product_units",
                            key: "product_units",
                            render: (product_units) => (
                                <div className="d-flex align-items-center gap-3">
                                    {product_units.slice(0, 3).map((unit) => (
                                        <img src={unit.qr_url} alt="qr_url" height={30} />
                                    ))}
                                    {product_units.length > 3 && (
                                        <div
                                            className="bg-secondary text-white rounded-2 px-3 d-flex justify-content-center align-items-center"
                                            style={{
                                                width: "auto",
                                                height: 30,
                                            }}
                                        >
                                            {" "}
                                            +{product_units.length - 3}{" "} More
                                        </div>
                                    )}
                                </div>
                            ),
                        },
                        {
                            title: "Actions",
                            dataIndex: "actions",
                            key: "actions",
                            render: (_, record) => (
                                <div className="d-flex gap-3">
                                    <Link to={`/batches/${record.id}`}>
                                        <Button type="primary">See Details</Button>
                                    </Link>
                                </div>
                            ),
                        },
                    ]}
                    rowKey={(record) => record.id}
                />
            )}
        </Layout>
    );
};

export default Batches;
