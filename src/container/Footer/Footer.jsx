import { useState, useEffect } from "react";
import { Button, Form, Input, Row, Col, notification } from "antd";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

const { TextArea } = Input;

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const { name, email, message } = formData;

  const handleOnChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    client
      .create(contact)
      .then(() => {
        setLoading(false);
        form.resetFields();
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        notification.open({
          type: "success",
          duration: 5,
          message: "Success",
          description: "Message Sent",
        });
      })
      .catch((err) => {
        console.log(err);
        notification.open({
          type: "error",
          duration: 5,
          message: "Error",
          description: "Failed to send message",
        });
      });
  };

  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  return (
    <>
      <h2 className="head-text">Have coffee & chat with me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:ilocollinsdev231@gmail.com" className="p-text">
            ilocollinsdev231@gmail
          </a>
        </div>

        <div className="app__footer-card">
          <img src={images.resume} alt="resume icon" />
          <a
            target="_blank"
            rel="noreferrer"
            href="https://drive.google.com/file/d/1zb9dpWGcExm9SOdB793Q559RcxSUv5qH/view?usp=sharing"
            className="p-text"
          >
            View Resume
          </a>
        </div>
      </div>

      <Row style={{ width: "100%" }} justify="center">
        <Col xs={24} sm={24} xxl={16}>
          <Form form={form} onFinish={handleSubmit} {...formLayout}>
            <Form.Item
              label="Name"
              className="p-text"
              rules={[{ required: true }]}
              name="Your Name"
            >
              <Input
                value={name}
                name="name"
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              className="p-text"
              name="Your Email"
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input
                value={email}
                name="email"
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Item>
            <Form.Item
              label="Message"
              name="Your Message"
              className="p-text"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea
                name="message"
                rows={4}
                value={message}
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Item>

            <Col className="text-center">
              <Button
                type="primary"
                style={{
                  borderRadius: "5px",
                  fontWeight: 500,
                  padding: "0 2rem",
                  fontFamily: "var(--font-base)",
                  border: "none",
                }}
                htmlType="submit"
                loading={loading}
              >
                Send Message
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__primarybg"
);
