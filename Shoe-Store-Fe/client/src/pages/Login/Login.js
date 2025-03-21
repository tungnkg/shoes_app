import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Mythumb from '~/assets/images/thumb.png';
import Mylogo from '~/assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';

const cx = classNames.bind(styles);
const PUBLIC_API_URL = 'http://localhost:5252';

function Login() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login =  (req) => {
    setLoading(true);
     axios.post(`${PUBLIC_API_URL}/auth/login`, req)
      .then((res) => {
          console.log(res)
          localStorage.setItem('access_token', res.data.data.access_token);
            localStorage.setItem('refresh_token', res.data.data.refresh_token);
            localStorage.setItem('user', JSON.stringify(res.data.data.user_info));
          if (res.data.data.user_info.roles[0].name === 'ADMIN') {
            message.success('Đăng nhập thành công');
            setTimeout(() => navigate('/customermanagement'), 1000);
          } else if (res.data.data.user_info.roles[0].name === 'ROLE_USER') {
            message.success('Đăng nhập thành công');
            setTimeout(() => navigate('/'), 1000);
          }
      })
      .catch((err) => message.error(err.response.data.message));
      setLoading(false);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const validateForm = () => {
    let isValid = true;

    if (!username) {
      setUsernameError('Vui lòng nhập tên đăng nhập');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const request = {
        username,
        password
      }
      login(request);
      
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('first-Color')}></div>
      <div className={cx('container')}>
        <div className={cx('box-container')}>
          <div className={cx('left-side')}>
            <form className={cx('form')} onSubmit={handleSubmit}>
              <h1 className={cx('form-title')}>Đăng nhập</h1>
              <div className={cx('input-container')}>
                <input
                  placeholder="Vui lòng nhập tên đăng nhập"
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
                {usernameError && <p className={cx('error-message')}>{usernameError}</p>}
              </div>
              <div className={cx('input-container')}>
                <div className={cx('password-wrapper')}>
                  <input
                    placeholder="Vui lòng nhập mật khẩu"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                  ></input>
                  <span
                    className={cx('toggle-password')}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeFilled size="large" /> : <EyeInvisibleFilled  size="large" />}
                  </span>
                </div>
                {passwordError && <p className={cx('error-message')}>{passwordError}</p>}
              </div>
              <button className={cx('submit')} type="submit" onClick={handleSubmit}>
                Đăng nhập
              </button>

              <p className={cx('signup-link')}>
                Chưa có tài khoản?
                <Link to={config.routes.register}>Đăng ký</Link>
              </p>
              <p className={cx('forget-password')}>Quên mật khẩu?</p>
            </form>
          </div>
          <div className={cx('right-side')}>
            <div className={cx('wrapper-img')}>
              <img src={Mythumb} atl="mythumb" className={cx('thumb-img')} />
              <Link to={config.routes.home}>
                <img src={Mylogo} atl="mylogo" className={cx('logo-img')} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
