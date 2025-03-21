/* eslint-disable react-hooks/rules-of-hooks */
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import config from '~/config';
import styles from './Header.module.scss';
// import images from '~/assets/images';
import logo from '~/assets/images/logo.png';
import axios from 'axios';
import { message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    title: 'Hồ sơ',
    to: '/profile',
  },
  {
    title: 'Lịch sử mua hàng',
    to: '/history',
  },
  {
    title: 'Đăng xuất',
    to: '/login',
    onClick: () => {
      axios.post(`http://localhost:5252/api/v1/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((res) => {
            if(res.status === 200){
            message.success('Đăng xuất thành công');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            }else{
              message.error('Đăng xuất thất bại');
            }
      })
      .catch((err) => message.error(err.response.data.message));
    },
  },
];

function Header() {
  const currentUser = JSON.parse(localStorage.getItem('user')) || null;
  const [productResult, setProductResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProductResult([1, 2, 3]);
    }, 0);
  }, []);

  // function render Item trong MENU_ITEMS
  const renderItem = () => {
    return MENU_ITEMS.map((MENU_ITEMS, index) => (
      <Link className={cx('menu-items')} key={index} to={MENU_ITEMS.to} setTimeout={1000} onClick={MENU_ITEMS.onClick}>
        {MENU_ITEMS.title}
      </Link>
    ));
  };

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={config.routes.home} className={cx('logo-link')}>
          <img src={logo} alt="DaShoe" className={cx('logo')} />
        </Link>

        <ul className={cx('pre-desktop-menu')}>
            <Link to={config.routes.home} className={cx('pre-desktop-menu-item')}>
              <button className={cx('dropdown-toggle')}>HOME</button>
            </Link>
            <Link to={config.routes.product} className={cx('pre-desktop-menu-item')}>
              <button className={cx('dropdown-toggle')}>PRODUCTS</button>
            </Link>
          <li className={cx('pre-desktop-menu-item')}>
            <button className={cx('dropdown-toggle')}>BLOG</button>
          </li>
          <li className={cx('pre-desktop-menu-item')}>
            <button className={cx('dropdown-toggle')}>ABOUT</button>
          </li>
        </ul>
        <div className={cx('search-place')}>
         

            <div className={cx('action')}></div>
            {currentUser ? (

              <>
              <ShoppingCartOutlined style={{ fontSize: '24px' }} />

              <Tippy
                interactive
                // visible
                placement="bottom-end"
                render={(attrs) => (
                  <div className={cx('content')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                      <h2 className={cx('title-menu')}>Quản lý tài khoản</h2>
                      {renderItem()}
                    </PopperWrapper>
                  </div>
                )}
              >
                <button className={cx('user')}>
                  <FontAwesomeIcon icon={faUser} />
                </button>
              </Tippy>
              </>
              

              
            ) : (
              <button className={cx('login-btn')}>
                <Link to={config.routes.login}>Log in</Link>
              </button>
            )}
          </div>
        </div>
    </header>
  );
}

export default Header;
