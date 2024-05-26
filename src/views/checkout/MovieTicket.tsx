import { convertToVietnamese } from '@/util/language';
import { Button, Card, Col, Row, Table, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;
function formatNumber(numString: string): string {
  const num = parseInt(numString, 10);
  return num.toLocaleString('en-US').replace(/,/g, ' ');
}

// Usage
const MovieTicket = ({ children, data }: { children: any; data: any }) => {
  const columns = [
    {
      title: 'Đã đặt',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
    },
  ];
  return (
    <Card title='MOVIEON'>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Paragraph>{data?.seats[0]?.calendar?.theater?.cinema?.name}</Paragraph>
          <Paragraph>{data?.seats[0]?.calendar?.theater?.cinema?.address}</Paragraph>
        </Col>
        <Col span={24}>
          <Title level={3}>VÉ XEM PHIM</Title>
        </Col>
        <Col span={24}>
          <Paragraph>Khách hàng: {data?.customerName}</Paragraph>
        </Col>
        <Col span={24}>
          <Paragraph>
            <Title level={4}>{data?.movie?.title}</Title>
          </Paragraph>
        </Col>
        <Col span={24}>
          <Paragraph>Suất chiếu: {data?.showtime}</Paragraph>
          <Paragraph>Phòng chiếu: {data?.seats[0]?.calendar?.theater?.name}</Paragraph>
          {/* <Paragraph>Ghế: VIP - 01/VIP - 02</Paragraph> */}
          <Paragraph>Ghế: {data?.seats?.map((seat: any) => seat.seatNumber).join(', ')}</Paragraph>
        </Col>
        <Table
          style={{ width: '100%' }}
          columns={columns}
          pagination={false}
          dataSource={[
            ...(data?.seats?.map((seat: any) => ({
              key: seat._id,
              name: seat.seatType,
              count: 1,
              price: formatNumber((seat.price * 1000).toString()),
            })) ?? []),
            ...(data?.popcorn?.map((combo: any) => ({
              key: combo._id,
              name: combo.name,
              count: combo.count,
              price: formatNumber((combo.price * 1000).toString()),
            })) ?? []),
          ]}
        ></Table>
        <Col span={24}>
          <Paragraph>
            <Title level={5}>Tổng tiền:</Title>
          </Paragraph>
        </Col>
        <Col span={24}>
          <Paragraph>
            <Title level={5}>{formatNumber(data?.price)} VND</Title>(
            {convertToVietnamese(data?.price)})
          </Paragraph>
        </Col>
        <Col span={24}>
          <Paragraph>
            <Title level={5}>Mã vé: {data?.ticket_number}</Title>
          </Paragraph>
        </Col>
        <Col span={24}>
          <Paragraph>
            <Title level={5}>Mã vé (QR):</Title>
            <div
              className=''
              style={{
                // center
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {children}
            </div>
          </Paragraph>
        </Col>
      </Row>
    </Card>
  );
};

export default MovieTicket;
