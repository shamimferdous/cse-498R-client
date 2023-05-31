import { Button, Card, Col, DatePicker, Form, Input, Row, Space } from "antd";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { RollbackOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const CreateBatch = () => {
    return (
        <Layout>
            <Card
                bodyStyle={{
                    padding: 0,
                }}
            >
                <div className="d-flex justify-content-between align-items-center px-4 py-3">
                    <h3 className="mb-0">Create Batch</h3>
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
                <Form
                    layout="vertical"
                    requiredMark={false}
                    onFinish={(values) => console.log(values)}
                    autoComplete="off"
                    initialValues={{
                        product: 1,
                    }}
                >
                    <Row gutter={[20, 0]}>
                        <Col lg={8} xs={24}>
                            <Form.Item
                                label="Product"
                                name="product"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input product name!",
                                    },
                                ]}
                            >
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
                                <DatePicker className="w-100" size="large"/>
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
                                <Button type="primary" htmlType="submit" size="large" block>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Layout>
    );
};

export default CreateBatch;
