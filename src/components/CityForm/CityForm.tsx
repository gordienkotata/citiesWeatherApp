import React from 'react';
import { Input, Form, Button } from 'antd';

import css from './styles.css';

interface Props {
  onSubmit: (values: any) => void;
}

export const CityForm:React.FC<Props> = ({ onSubmit }) => {

    const [form] = Form.useForm();
  

    const onFinish = (values: any) => {
        onSubmit(values.city_name); 
    };

    return (
        <Form className={css.container} layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item label="Название города" name="city_name" rules={[{ required: true, message: 'это поле является обязательным' }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Add</Button>
            </Form.Item>
        </Form>
    );
};
