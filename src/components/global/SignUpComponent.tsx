import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Space,
  Typography,
  message,
} from "antd";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase.init";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignUpComponent = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    if (user) {
      form.resetFields();
      message.success("User create successful");
      navigate("/");
    }
    if (error) {
      console.log(error);
      message.error("Something went wrong. try again");
    }
  });

  return (
    <div
      // className="auth-page"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: `url(${IMAGES.LightBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card
        style={{
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 0 20px #0815420d",
          borderRadius: 10,
        }}
      >
        {/* <img
          style={{ maxWidth: 180, margin: '20px auto', display: 'block' }}
          src={IMAGES.Logo}
          alt=""
        /> */}
        <Typography.Title
          level={2}
          style={{ textAlign: "center", marginBottom: 30 }}
        >
          Register
        </Typography.Title>
        <Form
          name="normal_Register"
          className="Register-form"
          initialValues={{ remember: true }}
          form={form}
          onFinish={(values) =>
            createUserWithEmailAndPassword(values?.email, values?.password)
          }
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid Email" },
            ]}
          >
            <Input
              type="email"
              size="large"
              prefix={<AiOutlineMail className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              size="large"
              prefix={<AiOutlineLock className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Space style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              {/* <a href="/">Forgot password</a> */}
            </Space>
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              size="large"
              style={{ display: "block", width: "100%" }}
              type="primary"
              htmlType="submit"
            >
              Sign in
            </Button>
          </Form.Item>
          {/* Or <a href="/">register now!</a> */}
        </Form>
      </Card>
    </div>
  );
};

export default SignUpComponent;
