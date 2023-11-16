import { Button, Form, Input } from "antd";
import { register } from "../../slices/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../slices/message";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isRegister } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const onFinish = async (values) => {
    const { username, email, password } = values;
    setLoading(true);
    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        navigate("/user");
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (isRegister) {
    return <Navigate to="/user" />;
  }
  return(
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
    onFinishFailed={onFinishFailed}
    autoComplete="off">
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: "Please input your username!",
        },
      ]}>
      <Input />
    </Form.Item>

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
      wrapperCol={{
        offset: 8,
        span: 16,
      }}>
      <Button type="primary" htmlType="submit">
        {loading ? "Loading..." : "Register"}
      </Button>
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
  )
};
export default Register;
