import { PrinterOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Row, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Loader from "../../components/Loader/Loader";
import axios from "../../config/axios";

const BatchListByProduct = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [batch, setBatch] = useState({});

    // get batch by id
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`/products/batches/${id}`, { withCredentials: true });
                setBatch(res.data);
            } catch (error) {
                message.error("Something went wrong!");
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
                    <h3 className="mb-0">Batches {loading ? "..." : `- ${batch.product.name}`}</h3>
                    <Link to="/batches">
                        <Button type="primary" icon={<RollbackOutlined />}>
                            Back to Batches
                        </Button>
                    </Link>
                </div>
            </Card>
            <div className="mt-4" />
            <Card
                bodyStyle={{
                    padding: 15,
                }}
            >
                {loading ? (
                    <Loader height="60vh" />
                ) : (
                    <Row gutter={[10, 10]}>
                        <Col span={6}>
                            <label htmlFor="id" className="fw-bold">
                                Batch Id:{" "}
                            </label>{" "}
                            <span>{batch.id}</span>
                        </Col>
                        <Col span={6}>
                            <label htmlFor="id" className="fw-bold">
                                Quantity:{" "}
                            </label>{" "}
                            <span>{batch.qty}</span>
                        </Col>
                        <Col span={12}>
                            <label htmlFor="id" className="fw-bold">
                                Production Date:{" "}
                            </label>{" "}
                            <span>{dayjs(batch.production_date).format("DD MMMM YYYY")}</span>
                        </Col>

                        <Divider
                            style={{
                                margin: 0,
                            }}
                            dashed
                        />

                        <Col span={24}>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="fw-bold">Generated Qr Codes</div>
                                <Button type="dashed" icon={<PrinterOutlined />}>
                                    Print Qr Codes
                                </Button>
                            </div>

                            <Row gutter={[20, 20]}>
                                {batch.product_units.map((unit, i) => (
                                    <Col lg={6} xs={24} key={i}>
                                        <Card
                                            bodyStyle={{
                                                padding: 15,
                                                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                                                borderRadius: 5,
                                            }}
                                            bordered={false}
                                        >
                                            <div>
                                                <span className="fw-bold">UID</span>: <span> {unit.id} </span>{" "}
                                            </div>
                                            <div>
                                                <div className="fw-bold">QR Code </div>
                                                <img src={unit.qr_url} alt="qr_url" height={220} loading="lazy" />
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                )}
            </Card>
        </Layout>
    );
};

export default BatchListByProduct;
