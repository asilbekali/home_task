import React, { useState } from 'react';
import { Button, Card, Typography, Space, Image, Spin, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import StackModal from '../components/StackModal';
import {
    useCreateStackMutation,
    useUpdateStackMutation,
    useDeleteStackMutation,
    useGetStacksQuery,
    type Stack,
} from '../features/STACKS/stackApi';
import Marquee from 'react-fast-marquee';

const HomePage: React.FC = () => {
    const { data = [], isLoading } = useGetStacksQuery();
    const [createStack] = useCreateStackMutation();
    const [updateStack] = useUpdateStackMutation();
    const [deleteStack] = useDeleteStackMutation();

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedStack, setSelectedStack] = useState<Stack | null>(null);

    const handleAddClick = () => {
        setSelectedStack(null);
        setModalOpen(true);
    };

    const handleEditClick = (stack: Stack) => {
        setSelectedStack(stack);
        setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteStack(id).unwrap();
            message.success('Stack deleted successfully');
        } catch (error) {
            message.error('Failed to delete stack');
        }
    };

    const handleSubmit = async (values: Omit<Stack, 'id'>) => {
        try {
            if (selectedStack) {
                await updateStack({ id: selectedStack.id, ...values }).unwrap();
                message.success('Stack updated successfully');
            } else {
                await createStack(values).unwrap();
                message.success('Stack created successfully');
            }
            setModalOpen(false);
        } catch (error) {
            message.error('Operation failed');
        }
    };

    return (
        <div style={{ padding: '40px' }}>
            <Typography.Title level={2}>💻 My Tech Stacks</Typography.Title>

            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddClick}
                style={{ marginBottom: 20 }}
            >
                Add Stack
            </Button>

            {isLoading ? (
                <Spin />
            ) : (
                <Marquee gradient={false} speed={50} pauseOnHover>
                    <Space>
                        {data.map((stack: Stack) => (
                            <Card
                                key={stack.id}
                                hoverable
                                style={{ width: 220, marginRight: 20 }}
                                cover={
                                    <Image
                                        src={stack.img}
                                        alt={stack.name}
                                        height={140}
                                        preview={false}
                                    />
                                }
                            >
                                <Typography.Text strong>{stack.name}</Typography.Text>
                                <br />
                                <Button
                                    icon={<EditOutlined />}
                                    size="small"
                                    onClick={() => handleEditClick(stack)}
                                    style={{ marginTop: 10, marginRight: 10 }}
                                />
                                <Button
                                    icon={<DeleteOutlined />}
                                    danger
                                    size="small"
                                    onClick={() => handleDelete(stack.id)}
                                />
                            </Card>
                        ))}
                    </Space>
                </Marquee>
            )}

            <StackModal
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                onFinish={handleSubmit}
                initialData={selectedStack || undefined}
            />
        </div>
    );
};

export default HomePage;
