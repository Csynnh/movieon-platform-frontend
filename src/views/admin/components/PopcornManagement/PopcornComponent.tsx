import { ComboFormType } from '@/api/type';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
type PopcornComponentProps = {
  data?: ComboFormType;
  onEdit: (data?: ComboFormType) => void;
  onDelete: (data?: ComboFormType) => void;
};
const PopcornComponent = ({ data, onEdit, onDelete }: PopcornComponentProps) => {
  if (!data) return null;
  return (
    <div className={`popcornComponent`}>
      <Card
        cover={<img alt='example' src={data?.image} />}
        actions={[
          <Button onClick={() => onEdit(data)}>
            <EditOutlined className='popcornComponent-edit' key='edit' />
            <span className='popcornComponent-edit'>Chỉnh sửa</span>
          </Button>,
          <Button onClick={() => onDelete(data)}>
            <DeleteOutlined className='popcornComponent-delete' key='delete' />
            <span className='popcornComponent-delete'>Xóa</span>
          </Button>,
        ]}
        title={data?.name}
      >
        <div className='popcornComponent-wrap'>
          <p className='popcornComponent-title'>Giá:</p>{' '}
          <p className={`popcornComponent-value`}>
            {data?.price}
            <span className='popcornComponent-unit'>VND</span>
          </p>
        </div>
        <div className='popcornComponent-wrap'>
          <p className='popcornComponent-title'>Giảm giá:</p>{' '}
          <p className={`popcornComponent-value`}>
            {data?.discount}
            <span className='popcornComponent-unit'>%</span>
          </p>
        </div>
        <div className='popcornComponent-wrap'>
          <p className='popcornComponent-title'>Mô tả:</p>{' '}
          <p className={`popcornComponent-value`}>{data?.description}</p>
        </div>
      </Card>
    </div>
  );
};

export default PopcornComponent;
