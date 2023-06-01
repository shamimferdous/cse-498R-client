import { MinusCircleOutlined, PlusOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Space, message } from "antd";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import axios from "../../config/axios";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        id: 5,
        name: "Mobile 1 5W-30",
        sku: "MB1XXYYZZ1",
        attr: '[{"name":"Grade","value":"5W-35"},{"name":"Qty","value":"5 Litre"}]',
        dynamic_p_id: "54868e21-bf83-4581-9d5c-fa483dac14b7",
        created_at: "2023-06-01T18:36:46.802631Z",
        modified_at: "2023-06-01T18:49:59.561450Z",
        user: 4,
    });

    const handleUpdateProduct = async (values) => {
        if (!values.attr || values.attr.length === 0) return message.error("Please add at least one attribute!");
        try {
            // convert attr to string
            values.attr = JSON.stringify(values.attr);

            // request to create product
            setLoading(true);
            await axios.patch(`/products/${id}`, values, {
                withCredentials: true,
            });
            message.success("Product updated successfully!");
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
                    <h3 className="mb-0">Edit Product - {id}</h3>
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
                <Form
                    layout="vertical"
                    requiredMark={false}
                    onFinish={handleUpdateProduct}
                    autoComplete="off"
                    initialValues={{
                        name: product.name,
                        sku: product.sku,
                        attr: JSON.parse(product.attr),
                    }}
                >
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
                                    Update Product
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Layout>
    );
};

export default EditProduct;
