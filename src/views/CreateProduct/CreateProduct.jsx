import { MinusCircleOutlined, PlusOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Space, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import axios from "../../config/axios";

const CreateProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreateProduct = async (values) => {
        if (!values.attr || values.attr.length === 0) return message.error("Please add at least one attribute!");
        try {
            // convert attr to string
            values.attr = JSON.stringify(values.attr);

            // request to create product
            setLoading(true);
            await axios.post("/products", values, {
                withCredentials: true,
            });
            message.success("Product created successfully!");
            navigate("/");
        } catch (error) {
            message.error(error.response.data || "Something went wrong!");
        } finally {
            setLoading(false);
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
                    <h3 className="mb-0">Create Product</h3>
                    <Link to="/">
                        <Button type="primary" icon={<RollbackOutlined />}>
                            Back to Products
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
                <Form layout="vertical" requiredMark={false} onFinish={handleCreateProduct} autoComplete="off">
                    <Row gutter={[20, 0]}>
                        <Col lg={12} xs={24}>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input product name!",
                                    },
                                ]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </Col>

                        <Col lg={12} xs={24}>
                            <Form.Item
                                label="SKU"
                                name="sku"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input product SKU!",
                                    },
                                ]}
                            >
                                <Input size="large" />
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
                                                <MinusCircleOutlined className="fs-2" onClick={() => remove(name)} />
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
                                    loading={loading}
                                    disabled={loading}
                                >
                                    Create Product
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Layout>
    );
};

export default CreateProduct;
