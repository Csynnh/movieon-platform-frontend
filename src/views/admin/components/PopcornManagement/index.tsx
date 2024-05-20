import useCinemasData from "@/api/listCinemasData";
import { Cinema, ComboFormType } from "@/api/type";
import PlusIcon from "@/asset/icon/PlusIcon";
import CinemasSelection from "@/components/showtime/CinemasSelection";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, UploadProps, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Dragger from "antd/es/upload/Dragger";
import AWS from "aws-sdk";
import { useEffect, useState } from "react";
import PopcornComponent from "./PopcornComponent";
import "./styles.scss";
import { addCombo } from "@/api/addCombo";
import useCombos from "@/api/listCombos";
import PopcornSchema from "./PopcornSchema";
import Loading from "@/components/loading/Loading";
import { s } from "vite/dist/node/types.d-aGj9QkWt";
AWS?.config?.update({
  region: import.meta.env.VITE_AWS_REGION,
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();

const PopcornManagement = () => {
  const [listCinemaWithAction, setListCinemaWithAction] = useState<Cinema[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<ComboFormType>();
  const cinemaData: Cinema[] = useCinemasData();
  const [cinemaSelected, setCinemaSelected] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const handleSelectCinema = (event: any) => {
    event.detail?.value && setCinemaSelected(event.detail?.value?._id);
  };
  const { data, isLoading, isFetching, refetch } = useCombos();
  useEffect(() => {
    if (cinemaData) {
      setListCinemaWithAction(cinemaData);
      setCinemaSelected(cinemaData[0]?._id);
    }
  }, [cinemaData]);

  const hanldeCreatePopcorn = async (values: ComboFormType) => {
    form.resetFields();
    setUploadedImage("");
    setLoading(true);
    const data: ComboFormType = {
      ...values,
      image: uploadedImage,
    };
    const res = await addCombo(data);
    if (res?.name) {
      message.success("Thêm bắp nước thành công");
    } else {
      message.error("Thêm bắp nước thất bại");
    }
    setIsModalVisible(false);
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
      setIsModalVisible(true);
    }
  };
  const onCloseModal = () => {
    form.resetFields();
    setUploadedImage("");
    setIsModalVisible(false);
  };
  return (
    <div className="dashboard-right popcorn-header">
      <div className="dashboard-container">
        <CinemasSelection
          cinemas={listCinemaWithAction}
          handleSelect={handleSelectCinema}
          value={cinemaSelected}
        ></CinemasSelection>
        <Button
          className="popcorn-add-btn"
          onClick={() => setIsModalVisible(true)}
        >
          Thêm bắp nước
          <PlusIcon />
        </Button>
      </div>
      <Loading
        spinning={isLoading || isFetching}
        style={{
          minHeight: "150px",
        }}
      >
        <div className={`dashboard-popcorn-warrper `}>
          {data?.map((item) => (
            <PopcornComponent
              key={item.name}
              data={item}
              onEdit={handleEditPopcorn}
            />
          ))}
        </div>
      </Loading>
      {/* Modal create a new popcorn */}
      <PopcornSchema
        form={form}
        open={isModalVisible}
        loading={loading}
        onOk={() => form.submit()}
        onCancel={() => onCloseModal()}
        onFinish={hanldeCreatePopcorn}
        onUpload={setUploadedImage}
        imageURL={uploadedImage}
      />
    </div>
  );
};

export default PopcornManagement;
