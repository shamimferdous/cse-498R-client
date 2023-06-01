import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Table, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Loader from "../../components/Loader/Loader";
import axios from "../../config/axios";

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(0);

    // get all products
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/products", {
                    withCredentials: true,
                });
                setProducts(response.data);
            } catch (error) {
                setProducts([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh]);

    // delete product
    const handleDeleteProduct = (id) => {
        Modal.confirm({
            title: "Do you Want to delete these items?",
            icon: <ExclamationCircleFilled />,
            content: "You will not be able to recover this product!",
            async onOk() {
                try {
                    await axios.delete(`/products/${id}`, {
                        withCredentials: true,
                    });
                    message.success("Product deleted successfully!");
                    setRefresh((prev) => prev + 1);
                } catch (error) {
                    message.error("Could not delete product! Please try again.");
                }
            },
            okText: "Yes, Delete",
        });
    };

    return (
        <Layout>
            <Card
                bodyStyle={{
                    padding: 0,
                }}
            >
                <div className="d-flex justify-content-between align-items-center px-4 py-3">
                    <h3 className="mb-0">Products</h3>
                    <Link to="/create-product">
                        <Button type="primary" icon={<PlusOutlined />}>
                            Create Product
                        </Button>
                    </Link>
                </div>
            </Card>
            <div className="mt-4" />
            {loading ? (
                <Card>
                    <Loader height={"60vh"} />
                </Card>
            ) : (
                <Table
                    dataSource={products}
                    bordered
                    columns={[
                        {
                            title: "Date",
                            dataIndex: "created_at",
                            key: "created_at",
                            render: (date) => dayjs(date).format("DD MMMM YYYY - hh:mm A"),
                        },
                        {
                            title: "ID",
                            dataIndex: "dynamic_p_id",
                            key: "dynamic_p_id",
                        },
                        {
                            title: "Name",
                            dataIndex: "name",
                            key: "name",
                        },
                        {
                            title: "SKU",
                            dataIndex: "sku",
                            key: "sku",
                        },
                        {
                            title: "Actions",
                            dataIndex: "actions",
                            key: "actions",
                            render: (_, record) => (
                                <div className="d-flex gap-3">
                                    <Link to={`/edit-product/${record.id}`}>
                                        <Button type="primary">Edit</Button>
                                    </Link>
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={() => {
                                            handleDeleteProduct(record.id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                    <Link to={`/create-batch/${record.id}`}>
                                        <Button type="dashed">Create Batch</Button>
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

export default Products;
