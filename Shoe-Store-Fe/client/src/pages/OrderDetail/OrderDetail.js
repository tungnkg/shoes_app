import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './OrderDetail.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd'; // or '@mui/material/Button' for Material-UI
import config from '~/config';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { Select } from 'antd';
import { message } from 'antd';
import { CarOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, SmileOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);
const PUBLIC_API_URL = 'http://localhost:5252';

const billStatus = [
  {
    value: 0,
    label: 'Chờ xác nhận',
  },
  {
    value: 1,
    label: 'Xác nhận đơn hàng',
  },
  {
    value: 2,
    label: 'Đang được vận chuyển',
  },
  {
    value: 4,
    label: 'Hủy đơn hàng',
  },
];

const statusIcons = {
  0: <ClockCircleOutlined style={{ color: 'orange', marginRight: '8px' }} />, // Chờ xác nhận
  1: <CheckCircleOutlined style={{ color: 'green', marginRight: '8px' }} />, // Đã xác nhận
  2: <CarOutlined style={{ color: 'blue', marginRight: '8px' }} />, // Đang vận chuyển
  3: <SmileOutlined style={{ color: 'purple', marginRight: '8px' }} />, // Đã nhận được hàng
  4: <CloseCircleOutlined style={{ color: 'red', marginRight: '8px' }} />, // Đã hủy
};

const OrderDetail = () => {
  const [bill, setBill] = useState({});
  const id = useParams()?.id;
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    fetchBill();
  }, []);

  const fetchBill = () => {
    axios
      .get(`${PUBLIC_API_URL}/api/v1/bill/get-bill-info/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        setBill(res.data.data);
        setStatus(res.data.data.status);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateStatus = () => {
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
        message.success('Xác nhận đơn hàng thành công');
        window.location.href = config.routes.ordermanagement;
        fetchBill();
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className={cx('wrapper')}>
      <div className={cx('order-details')}>
        <div className={cx('select-container')}>
          <Select
            value={status}
            onChange={(value) => setStatus(value)} // Update the status state
            style={{ width: 200 }}
            placeholder="Chọn trạng thái đơn hàng"
          >
            
            {billStatus.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {statusIcons[item.value]}
                {item.label}
              </Select.Option>
            ))}
          </Select>
          <Button type="primary" onClick={handleUpdateStatus} style={{ marginLeft: '10px' }}>
            Cập nhật trạng thái
          </Button>
        </div>
        <h2 className={cx('title')}>Chi tiết đơn hàng</h2>
        <div className={cx('info')}>
          <p>
            <strong>Mã đơn hàng:</strong> {bill?.id}
          </p>
          <p>
            <strong>Tên khách hàng:</strong> {bill?.user_name}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {bill?.phone_number}
          </p>
          <p>
            <strong>Address:</strong> {bill?.address}
          </p>
          <p>
            <strong>Tiền thanh toán:</strong> {bill?.total?.toLocaleString()} VND
          </p>
          <p>
            <strong>Ngày đặt hàng:</strong> {bill?.created_date}
          </p>
          <p>
            <strong>Hình thức thanh toán:</strong>{' '}
            {bill?.is_online_transaction ? 'Thanh toán trực tuyến' : 'Thanh toán khi nhận hàng'}
          </p>
        </div>

        <h3 className={cx('subtitle')}>Sản phẩm</h3>
        <div className={cx('products')}>
          {bill?.products?.map((item, index) => (
            <div key={index} className={cx('product-item')}>
              <img
                src={item.product.thumbnail_img}
                width={150}
                alt={item.product.name}
                className={cx('product-image')}
              />
              <div className={cx('product-info')}>
                <p className={cx('product-name')}>{item?.product?.name}</p>
                <p className={cx('product-code')}>Code: {item?.product?.code}</p>
                <p>Size: {item.size}</p>
                <p>Price: {item.price.toLocaleString()} VND</p>
                <p>Quantity: {item.amount}</p>
              </div>
            </div>
          ))}
        </div>

        <Button
          type="primary"
          className={cx('back-btn')}
          onClick={() => navigate(config.routes.ordermanagement)}
          style={{ marginTop: '20px' }}
        >
          Quay lại
        </Button>
      </div>
    </section>
  );
};

export default OrderDetail;
