import { MinusCircleOutlined, PlusOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Form, Input, Row, Space, message } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Loader from "../../components/Loader/Loader";
import axios from "../../config/axios";
import dayjs from "dayjs";

const CreateBatch = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState({
        get: true,
        create: false,
    });

    // get product by id
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/products/${id}`, {
                    withCredentials: true,
                });
                setProduct(response.data);
            } catch (error) {
                message.error("Something went wrong!");
                navigate("/");
            } finally {
                setLoading({ ...loading, get: false });
            }
        })();
    }, []);

    // handle create batch
    const handleCreateBatch = async (values) => {
        try {
            values.attr = JSON.stringify(values.attr);
            values.production_date = values.production_date.format("YYYY-MM-DD");
            setLoading({ ...loading, create: true });
            const res = await axios.post(
                `/products/batches`,
                {
                    product: values.id,
                    ...values,
                },
                { withCredentials: true }
            );
            message.success("Batch created successfully!");
            navigate(`/batches/${res.data.id}`);
        } catch (error) {
            message.error("Cannot create batch right now! Please try again later.");
        } finally {
            setLoading({ ...loading, create: false });
        }
    };

    return (
        <Layout>
            <Card
                bodyStyle={{
                    padding: 0,
                }}
            >
                <div className="d-flex justify-content-between align-items-center px-4 py-3">
                    <h3 className="mb-0">Create Batch {loading.get ? "..." : `- ${product.name}`}</h3>
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
                {loading.get ? (
                    <Loader height="60vh" />
                ) : (
                    <Form
                        layout="vertical"
                        requiredMark={false}
                        onFinish={handleCreateBatch}
                        autoComplete="off"
                        initialValues={{
                            ...product,
                            production_date: dayjs(),
                            attr: JSON.parse(product.attr),
                        }}
                    >
                        <Row gutter={[20, 0]}>
                            <Col lg={3} xs={6}>
                                <Form.Item
                                    label="ID"
                                    name="id"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input product!",
                                        },
                                    ]}
                                >
                                    <Input size="large" disabled />
                                </Form.Item>
                            </Col>

                            <Col lg={5} xs={18}>
                                <Form.Item label="Product Name" name="name">
                                    <Input size="large" disabled />
                                </Form.Item>
                            </Col>

                            <Col lg={10} xs={24}>
                                <Form.Item
                                    name="production_date"
                                    label="Production Date"
                                    rules={[
                                        {
                                            type: "object",
                                            required: true,
                                            message: "Please select date!",
                                        },
                                    ]}
                                >
                                    <DatePicker className="w-100" size="large" />
                                </Form.Item>
                            </Col>
                            <Col lg={6} xs={24}>
                                <Form.Item
                                    label="Quantity"
                                    name="qty"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input quantity!",
                                        },
                                    ]}
                                >
                                    <Input size="large" placeholder="5" />
                                </Form.Item>
                            </Col>

                            <Col lg={12} xs={24}>
                                <div className="mb-2 ms-1">Attributes</div>
                                <Form.List name="attr">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space
                                                    key={key}
                                                    style={{
                                                        display: "flex",
                                                        marginBottom: 8,
                                                    }}
                                                    align="baseline"
                                                >
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, "name"]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Missing name",
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder="Attribute Name" size="large" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, "value"]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Missing value",
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder="Attribute Value" size="large" />
                                                    </Form.Item>
                                                    <MinusCircleOutlined
                                                        className="fs-2"
                                                        onClick={() => remove(name)}
                                                    />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    size="large"
                                                    onClick={() => add()}
                                                    block
                                                    icon={<PlusOutlined />}
                                                >
                                                    Add field
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Col>
                            <Col lg={12} xs={0}></Col>
                            <Col lg={6} xs={24}>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        block
                                        loading={loading.create}
                                        disabled={loading.create}
                                    >
                                        Create Batch
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Card>
        </Layout>
    );
};

export default CreateBatch;
