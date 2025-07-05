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
                img: initialData.img,
            });
        } else {
            form.resetFields();
        }
    }, [initialData, form]);

    // Modal submit tugmasi bosilganda
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onFinish(values);
            form.resetFields();
        } catch (error) {
            console.log('Validation Failed:', error);
        }
    };

    return (
        <Modal
            title={initialData ? 'Edit Stack' : 'Add New Stack'}
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
                    <Input placeholder="e.g., NestJS" />
                </Form.Item>

                <Form.Item
                    label="Image URL"
                    name="img"
                    rules={[{ required: true, message: 'Please enter the image URL' }]}
                >
                    <Input placeholder="https://..." />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default StackModal;
