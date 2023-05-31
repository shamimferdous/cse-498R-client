import { Button, Carousel, Checkbox, Col, Form, Input, Row } from "antd";
import styles from "./Login.module.scss";
import { useState } from "react";

const Login = () => {
    const [loading, setLoading] = useState({
        login: false,
        register: false,
    });
    const [activeView, setActiveView] = useState("login");

    const slider_data = [
        {
            image: "https://images.pexels.com/photos/12935051/pexels-photo-12935051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Change The Quality Of Your Life",
            subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Omnis eveniet ex laborum impedit.",
        },
        {
            image: "https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Easy To Navigate & Earn Rewards",
            subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Omnis eveniet ex laborum impedit.",
        },
        {
            image: "https://images.pexels.com/photos/12935064/pexels-photo-12935064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "New Scheduling & Routing",
            subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Omnis eveniet ex laborum impedit.",
        },
    ];

    const handleLogin = (values) => {
        console.log("Success:", values);
    };

    const handleRegister = (values) => {
        console.log("Success:", values);
    };

    return (
        <section className={styles.login}>
            <div className={styles.login_box}>
                <Row>
                    <Col md={12} sm={24} xs={24}>
                        <div className={styles.login_left}>
                            <img className={styles.logo} src={"/logo.png"} alt="logo" />
                            {activeView === "login" && (
                                <>
                                    <h1 className="mt-4 mb-2 align-self-baseline">Login</h1>
                                    <p className="align-self-baseline mb-3 text-muted">
                                        Welcome back, please put your email and password to login to your account.
                                    </p>
                                    <Form
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={handleLogin}
                                        layout="vertical"
                                        style={{ width: "100%" }}
                                        requiredMark={false}
                                        className="align-self-baseline"
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            name="email"
                                            label="Email"
                                            rules={[
                                                {
                                                    type: "email",
                                                    message: "The input is not valid email.",
                                                },
                                                {
                                                    required: true,
                                                    message: "Please input your email.",
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input placeholder="johndoe@gmail.com" size="large" />
                                        </Form.Item>

                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your password.",
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input.Password placeholder="5PVG$S8a!p9a" size="large" />
                                        </Form.Item>

                                        <Form.Item name="remember" valuePropName="checked" className="mb-3">
                                            <Checkbox defaultChecked>Remember me</Checkbox>
                                        </Form.Item>

                                        <Form.Item>
                                            <Button
                                                disabled={loading.login}
                                                loading={loading.login}
                                                block
                                                type="primary"
                                                htmlType="submit"
                                                size="large"
                                            >
                                                Log In
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                    <div>
                                        Don't have an account?{" "}
                                        <span
                                            className={styles.register_link}
                                            onClick={() => setActiveView("register")}
                                        >
                                            Register
                                        </span>
                                    </div>
                                </>
                            )}

                            {activeView === "register" && (
                                <>
                                    <h1 className="mt-4 mb-2 align-self-baseline">Register</h1>
                                    <p className="align-self-baseline mb-3 text-muted">
                                        Register your account to get started.
                                    </p>
                                    <Form
                                        onFinish={handleRegister}
                                        layout="vertical"
                                        style={{ width: "100%" }}
                                        requiredMark={false}
                                        className="align-self-baseline"
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            name="first_name"
                                            label="First Name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your first name.",
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input placeholder="John" size="large" />
                                        </Form.Item>

                                        <Form.Item
                                            name="last_name"
                                            label="Last Name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your last name.",
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input placeholder="Doe" size="large" />
                                        </Form.Item>
                                        <Form.Item
                                            name="email"
                                            label="Email"
                                            rules={[
                                                {
                                                    type: "email",
                                                    message: "The input is not valid email.",
                                                },
                                                {
                                                    required: true,
                                                    message: "Please input your email.",
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input placeholder="johndoe@gmail.com" size="large" />
                                        </Form.Item>

                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your password.",
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input.Password placeholder="5PVG$S8a!p9a" size="large" />
                                        </Form.Item>

                                        <Form.Item className="pt-2">
                                            <Button
                                                disabled={loading.register}
                                                loading={loading.register}
                                                block
                                                type="primary"
                                                htmlType="submit"
                                                size="large"
                                            >
                                                Register
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                    <div>
                                        Already have an account?{" "}
                                        <span className={styles.register_link} onClick={() => setActiveView("login")}>
                                            Login
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </Col>
                    <Col md={12} sm={0} xs={0}>
                        <div className={styles.login_right}>
                            <Carousel autoplay>
                                {slider_data.map((slider, index) => (
                                    <div className={styles.slider_item} key={index}>
                                        <img className={styles.slider_image} src={slider.image} alt={index} />
                                        <h2 className={styles.slider_title}>{slider.title}</h2>
                                        <p className={styles.slider_subtitle}> {slider.subtitle} </p>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default Login;
