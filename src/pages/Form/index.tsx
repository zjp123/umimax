import React, { useState } from 'react';
import {
  MinusCircleOutlined,
  PlusOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const onFinish = (values: any) => {
  console.log('Received values of form:', values);
};

// 修复SortableItem组件的参数传递
// @ts-ignore
// @eslint-disable-next-line
const SortableItem = ({ id, name, fieldKey, ...restField }: any) => {
  console.log(fieldKey);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
        <MenuOutlined
          style={{ cursor: 'grab', color: '#999' }}
          {...attributes}
          {...listeners}
        />
        <Form.Item
          name={[name, 'first']}
          rules={[{ required: true, message: 'Missing first name' }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name={[name, 'last']}
          rules={[{ required: true, message: 'Missing last name' }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <MinusCircleOutlined onClick={() => restField.remove(name)} />
      </Space>
    </div>
  );
};

const FormApp: React.FC = () => {
  const [form] = Form.useForm();
  const [items, setItems] = useState<any[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  // 处理拖拽结束事件
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.key === active.id);
      const newIndex = items.findIndex((item) => item.key === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newItems = arrayMove(items, oldIndex, newIndex);
        setItems(newItems);

        const users = form.getFieldValue('users') || [];
        const newUsers = arrayMove(users, oldIndex, newIndex);
        form.setFieldsValue({ users: newUsers });
      }
    }
  };

  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      autoComplete="off"
    >
      <Form.List name="users">
        {(fields, { add, remove }) => {
          // 直接在这里更新 items，而不使用 useEffect
          if (JSON.stringify(fields) !== JSON.stringify(items)) {
            setItems(fields);
          }

          return (
            <>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={items.map((item) => item.key)}
                  strategy={verticalListSortingStrategy}
                >
                  {items.map((field) => (
                    <SortableItem
                      key={field.key}
                      id={field.key}
                      name={field.name}
                      fieldKey={field.key}
                      remove={remove}
                    />
                  ))}
                </SortableContext>
              </DndContext>
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormApp;
