import React from 'react';
import { Form, Input, Button, Card } from 'antd';

const ImageForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <Card title="Image Upload Form" style={{ maxWidth: 500, margin: '0 auto', marginTop: '50px' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Image URL"
          name="img"
          rules={[{ required: true, message: 'Please input image URL!' }]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input name!' }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ImageForm;
