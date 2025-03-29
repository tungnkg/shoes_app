import classNames from 'classnames/bind';
import styles from './OrderManagement.module.scss';
import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { MDBIcon } from 'mdb-react-ui-kit';
import {
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const PUBLIC_API_URL = 'http://localhost:5252';

const cx = classNames.bind(styles);

const billStatus = ['Chờ xác nhận', 'Đã xác nhận', 'Đang vẫn chuyển', 'Đã nhận được hàng', 'Đã hủy'];

const statusIcons = {
  0: <ClockCircleOutlined style={{ color: 'orange', marginRight: '8px' }} />, // Chờ xác nhận
  1: <CheckCircleOutlined style={{ color: 'green', marginRight: '8px' }} />, // Đã xác nhận
  2: <CarOutlined style={{ color: 'blue', marginRight: '8px' }} />, // Đang vận chuyển
  3: <SmileOutlined style={{ color: 'purple', marginRight: '8px' }} />, // Đã nhận được hàng
  4: <CloseCircleOutlined style={{ color: 'red', marginRight: '8px' }} />, // Đã hủy
};

function OrderManagement() {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

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

  return (
    <section className={cx('wrapper')}>
      <div className={cx('table-site')}>
        <div className={cx('table')}>
          <div className={cx('table-grid')}>
            <div className={cx('row-site')}>
              <h5 className={cx('row-title')}>ID</h5>
            </div>
            <div className={cx('row-site')}>
              <h5 className={cx('row-title')}>Khách hàng</h5>
            </div>
            <div className={cx('row-site')}>
              <h5 className={cx('row-title')}>Địa chỉ</h5>
            </div>
            <div className={cx('row-site')}>
              <h5 className={cx('row-title')}>Số điện thoại</h5>
            </div>
            <div className={cx('row-site')}>
              <h5 className={cx('row-title')}>Total</h5>
            </div>
            <div className={cx('row-site')}>
              <h5 className={cx('row-title')}>Status</h5>
            </div>
            <div className={cx('row-site')}>
              <h5 className={cx('row-title')}>Ngày mua</h5>
            </div>
            <div className={cx('row-site')}>
              <h5 className={cx('row-title')}>Hành động</h5>
            </div>
          </div>
          {bills.map((inv) => {
            return (
              <div key={inv.id} className={cx('table-grid', 'item-grid')}>
                <div className={cx('item-site')}>
                  <p className={cx('item-content')}>{inv.id}</p>
                </div>
                <div className={cx('item-site')}>
                  <p className={cx('item-content')}>{inv.user_name}</p>
                </div>
                <div className={cx('item-site')}>
                  <p className={cx('item-content')}>{inv.address}</p>
                </div>
                <div className={cx('item-site')}>
                  <p className={cx('item-content')}>{inv.phone_number}</p>
                </div>
                <div className={cx('item-site')}>
                  <p className={cx('item-content')}>{inv.total}</p>
                </div>
                <div className={cx('item-site')}>
                  <p className={cx('item-content')}>
                    {statusIcons[inv.status]} {/* Add the icon */}
                    {billStatus[inv.status]}
                  </p>
                </div>
                <div className={cx('item-site')}>
                  <p className={cx('item-content')}>{inv.created_date}</p>
                </div>
                <div className={cx('item-site')}>
                  <div className={cx('wrapper-icon')}>
                    <EyeOutlined style={{ fontSize: 24 }} onClick={() => navigate(`/orderDetail/${inv.id}`)} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default OrderManagement;
