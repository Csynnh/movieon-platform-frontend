import { addCombo } from '@/api/addCombo';
import useCinemasData from '@/api/listCinemasData';
import useCombos from '@/api/listCombos';
import { removeCombo } from '@/api/removeCombo';
import { Cinema, ComboFormType } from '@/api/type';
import PlusIcon from '@/asset/icon/PlusIcon';
import Loading from '@/components/loading/Loading';
import CinemasSelection from '@/components/showtime/CinemasSelection';
import { Button, Form, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import { RefetchOptions } from 'react-query';
import PopcornComponent from './PopcornComponent';
import PopcornSchema from './PopcornSchema';
import './styles.scss';
const PopcornManagement = () => {
  const [listCinemaWithAction, setListCinemaWithAction] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<ComboFormType>();
  const cinemaData: Cinema[] = useCinemasData();
  const [cinemaSelected, setCinemaSelected] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState<any>({
    open: false,
    action: '',
  });
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [selectedCombo, setSelectedCombo] = useState<ComboFormType | null>(null);
  const handleSelectCinema = (event: any) => {
    event && setCinemaSelected(event);
  };
  const { data, isLoading, isFetching, refetch } = useCombos(cinemaSelected);
  useEffect(() => {
    if (cinemaData) {
      setListCinemaWithAction(cinemaData);
      setCinemaSelected(cinemaData[0]?._id);
    }
  }, [cinemaData]);
  useEffect(() => {
    if (cinemaSelected) {
      console.log(cinemaSelected, '  a');
      refetch();
    }
  }, [cinemaSelected]);
  const hanldeSubmitForm = async (values: ComboFormType) => {
    form.resetFields();
    if (!cinemaSelected) {
      message.error('Vui lòng chọn rạp chiếu phim');
      return;
    }
    setLoading(true);
    const data: ComboFormType = {
      ...values,
      cinemaId: cinemaSelected,
      image: uploadedImage,
      _id: isModalVisible.action === 'edit' ? selectedCombo?._id : undefined,
    };
    const res = await addCombo(data);
    if (res?.name) {
      message.success('Thêm bắp nước thành công');
    } else {
      message.error('Thêm bắp nước thất bại');
    }
    setIsModalVisible({ open: false, action: '' });
    refetch();
    setLoading(false);
  };
  const handleEditPopcorn = (data?: ComboFormType) => {
    form.resetFields();

    if (data) {
      form.setFieldsValue({
        name: data?.name,
        price: data?.price,
        description: data?.description,
        discount: data?.discount,
      });
      setUploadedImage(data?.image);
      setSelectedCombo(data);
      setIsModalVisible({ open: true, action: 'edit' });
    }
  };
  const onCloseModal = () => {
    form.resetFields();
    setUploadedImage('');
    setIsModalVisible({ open: false, action: '' });
  };
  const handleDeletePopcorn = async () => {
    if (selectedCombo?._id) {
      setLoading(true);
      const res = await removeCombo(selectedCombo?._id);
      console.log('res', res);
      // if (res) {
      message.success('Xóa bắp nước thành công');
      // } else {
      //   message.error("Xóa bắp nước thất bại");
      // }
      refetch();
      setLoading(false);
      setIsModalVisible({ open: false, action: '' });
    }
  };
  return (
    <div className='dashboard-right popcorn-header'>
      <div className='dashboard-container'>
        <CinemasSelection
          cinemas={listCinemaWithAction}
          handleSelect={handleSelectCinema}
          value={cinemaSelected}
        ></CinemasSelection>
        <Button
          className='popcorn-add-btn'
          onClick={() => setIsModalVisible({ open: true, action: 'add' })}
        >
          Thêm bắp nước
          <PlusIcon />
        </Button>
      </div>
      <Loading
        spinning={isLoading || isFetching}
        style={{
          minHeight: '150px',
        }}
      >
        <div className={`dashboard-popcorn-warrper `}>
          {data?.map((item) => (
            <PopcornComponent
              key={item.name}
              data={item}
              onEdit={handleEditPopcorn}
              onDelete={(data) => {
                if (data) setSelectedCombo(data);
                setIsModalVisible({ open: false, action: 'remove' });
              }}
            />
          ))}
        </div>
      </Loading>
      {/* Modal create a new popcorn */}
      <PopcornSchema
        form={form}
        open={isModalVisible.open}
        loading={loading}
        onOk={() => form.submit()}
        onCancel={() => onCloseModal()}
        onFinish={hanldeSubmitForm}
        onUpload={setUploadedImage}
        imageURL={uploadedImage}
        uploadedImage={uploadedImage}
        action={isModalVisible.action}
      />
      <Modal
        title='Bạn chắc hông'
        open={isModalVisible?.action === 'remove'}
        onOk={handleDeletePopcorn}
        onCancel={() =>
          setIsModalVisible({
            open: false,
            action: '',
          })
        }
      >
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default PopcornManagement;
