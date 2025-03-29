import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Tag, Modal, Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { Typography } from '@mui/material';
import { message } from 'antd';

const PUBLIC_API_URL = 'http://localhost:5252';

const History = () => {
  const [bills, setBills] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const showProductDetails = (products) => {
    setSelectedProducts(products);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchBill();
  }, []);

  const fetchBill = () => {
    const req = {
      page: 1,
      size: 1000,
    };
    axios
      .post(`${PUBLIC_API_URL}/api/v1/bill/get-all`, req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        setBills(res.data.data.data);
      })
      .catch((err) => console.log(err));
  };

  const statusColors = {
    0: 'blue',
    1: 'green',
    2: 'orange',
    3: 'purple',
    4: 'red',
  };

  const statusLabels = {
    0: 'Đang chờ xác nhận',
    1: 'Đã xác nhận',
    2: 'Đang vận chuyển',
    3: 'Đã nhận được hàng',
    4: 'Đã hủy',
  };

  const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => total + product.price * product.amount, 0);
  };

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Ngày mua hàng',
      dataIndex: 'created_date',
      key: 'created_date',
    },
    {
      title: 'Trạng thái đơn hàng',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={statusColors[status]}>{statusLabels[status]}</Tag>,
    },
    {
      title: 'Tổng tiền hàng',
      dataIndex: 'total',
      key: 'total',
      render: (_, record) => <p>{calculateTotalPrice(record.products).toLocaleString()} VND</p>,
    },
    {
      title: 'Địa chỉ nhận hàng',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            variant="outlined"
            icon={<EyeOutlined />}
            onClick={() => showProductDetails(record.products)}
          >
            Xem chi tiết
          </Button>
          {record.status === 2 && (
            <Button variant="solid" icon={<CheckCircleOutlined />} style={{ color: 'green', marginLeft: '8px' }} onClick={() => handleUpdateStatus(record.id, 3)}>
              Đã nhận được hàng
            </Button>
          )}
          {record.status === 0 && (
            <Button
              variant="solid"
              icon={<EyeOutlined />}
              style={{ color: 'red', marginLeft: '8px' }}
              onClick={() => handleUpdateStatus(record.id, 4)}
            >
              Hủy đơn hàng
            </Button>
          )}
        </>
      ),
    },
  ];

  const handleUpdateStatus = (id, status) => {
      axios
        .put(
          `${PUBLIC_API_URL}/api/v1/bill/update-status/${id}?status=${status}`,
          { status },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          },
        )
        .then((res) => {
          message.success('Thực hiện thành công');
          window.location.reload();
          fetchBill();
        })
        .catch((err) => console.log(err));
    };

  return (
    <>
      <Typography variant="h2" sx={{ marginBottom: 4, textAlign: 'center' }}>
        Đơn hàng đã đặt
      </Typography>
      <Table columns={columns} dataSource={bills} rowKey="id" />
      <Modal title="Product Details" open={isModalVisible} onCancel={handleCancel} footer={null} width={800}>
        <Table
          dataSource={selectedProducts}
          columns={[
            { title: 'Mã sản phẩm', dataIndex: 'product_id', key: 'product_id' },
            {
              title: 'Tên sản phẩm',
              dataIndex: 'name',
              key: 'name',

              render: (_, record) => <p>{record.product.name}</p>,
            },
            {
              title: 'Ảnh sản phẩm',
              dataIndex: 'thumbnail_img',
              key: 'thumbnail_img',
              render: (_, record) => (
                <img src={record.product.thumbnail_img} alt="Ảnh sản phẩm" style={{ width: 50 }} />
              ),
            },
            { title: 'Kích cỡ', dataIndex: 'size', key: 'size' },
            { title: 'Giá', dataIndex: 'price', key: 'price' },
            { title: 'Số lượng', dataIndex: 'amount', key: 'amount' },
          ]}
          rowKey="product_id"
          pagination={false}
          size="large"
        />
      </Modal>
    </>
  );
};

export default History;
