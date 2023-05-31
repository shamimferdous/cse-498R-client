import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Loader from "../../components/Loader/Loader";

const Batches = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Mobile 1 5W-30",
            sku: "MB1XXYYZZ1",
            attr: '"[\\n  {\\n    \\"name\\": \\"Grade\\",\\n    \\"value\\": \\"5W-30\\"\\n  },\\n  {\\n    \\"name\\": \\"Qty\\",\\n    \\"value\\": \\"4 Ltr\\"\\n  },\\n  ]"',
            dynamic_p_id: "68f019ce-89c8-4ecc-ae64-b26dcf2077b0",
            created_at: "2023-05-29T19:06:45.047996Z",
            modified_at: "2023-05-29T19:06:45.048523Z",
            user: 3,
        },
    ]);

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
                            render: () => (
                                <div className="d-flex gap-3">
                                    <Button type="primary">See Details</Button>
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
