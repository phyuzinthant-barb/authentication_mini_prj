import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Form, Input, Row, Typography } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const onFinish = async (values) => {
    const { email, password } = values;
    setLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/user");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/user" />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
      }}>
      <Row justify="center">
        <Typography.Title level={2}>Login</Typography.Title>
      </Row>
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}>
            <Button type="primary" htmlType="submit">
              {loading ? "Loading..." : "Login"}
            </Button>
            <Link to="/register">
              <Button style={{ marginLeft: "10px" }}>Register</Button>
            </Link>
          </Form.Item>

          {message && (
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}>
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </Form.Item>
          )}
        </Form>
      </Row>
    </div>
  );
};

export default Login;
