// src/components/StackModal.tsx
import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import type { Stack } from '../features/STACKS/stackApi';

interface StackModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: Omit<Stack, 'id'>) => void;
  initialData?: Stack;
}

const StackModal: React.FC<StackModalProps> = ({
  open,
  onCancel,
  onFinish,
  initialData,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        name: initialData.name,
        image: initialData.image,
      });
    } else {
      form.resetFields();
    }
  }, [initialData]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onFinish(values);
      form.resetFields();
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  return (
    <Modal
      title={initialData ? 'Edit Stack' : 'Add Stack'}
      open={open}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      onOk={handleOk}
      okText={initialData ? 'Update' : 'Create'}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Technology Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the tech name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="image"
          rules={[{ required: true, message: 'Please enter the image URL' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StackModal;
