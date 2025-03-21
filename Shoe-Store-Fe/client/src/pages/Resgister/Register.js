import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Mythumb from '~/assets/images/thumb.png';
import Mylogo from '~/assets/images/logo.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { message, Spin } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
const PUBLIC_API_URL = 'http://localhost:5252';


function Register() {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const req = {
        page: 1,
        size: 1000
      }
      const response = await axios.post(`${PUBLIC_API_URL}/open-api/v1/users/get-all`, req);
      setUser(response.data.data.data);
    } catch (err) {
      console.error('Error fetching user: ', err);
    }
  };

  const handleRegisterUser = (user) => {
    setLoading(true);
    axios
      .post(`${PUBLIC_API_URL}/auth/register`, user)
      .then((res) => {
        if (res.status === 200) {
          message.success("Đăng ký thành công");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          message.error("Đăng ký thất bại");
        }
        fetchUser();
      })
      .catch((err) => message.error(err.response.data.message));
      setLoading(false);
  };

  const validateForm = () => {
    let isValid = true;

    // Check if email is empty or already exists
    if (!email) {
      setEmailError('Vui lòng nhập email');
      isValid = false;
    } else if (user.some((u) => u.email === email)) {
      setEmailError('Email đã tồn tại. Vui lòng nhập email khác');
      isValid = false;
    }

    // Check if username is empty or already exists
    if (!username) {
      setUsernameError('Vui lòng nhập username');
      isValid = false;
    } else if (user.some((u) => u.username === username)) {
      setUsernameError('Username đã tồn tại. Vui lòng nhập username khác');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu');
      isValid = false;
    }

    if (!firstName) {
      setFirstNameError('Vui lòng nhập first name');
      isValid = false;
    }

    if (!lastName) {
      setLastNameError('Vui lòng nhập last name');
      isValid = false;
    }

    if (!phone_number) {
      setPhoneNumberError('Vui lòng nhập số điện thoại');
      isValid = false;
    }

    if (!address) {
      setAddressError('Vui lòng nhập địa chỉ');
      isValid = false;
    }


    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const userData = {
        email,
        username,
        password,
        first_name: firstName,
        last_name: lastName,
        phone_number,
        address,
      };
      handleRegisterUser(userData);
    }
  };


  return (
    <div className={cx('wrapper')}>
      <div className={cx('first-Color')}></div>
      <div className={cx('container')}>
        <div className={cx('box-container')}>
          <div className={cx('left-side')}>
            <form className={cx('form')} onSubmit={handleSubmit}>
              <h1 className={cx('form-title')}>Đăng ký</h1>
              <div className={cx('input-container')}>
                <input
                  placeholder="Vui lòng nhập email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                ></input>
                {emailError && <p className={cx('error-message')}>{emailError}</p>}
              </div>
              <div className={cx('input-container')}>
                <input
                  placeholder="Vui lòng nhập username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError('');
                  }}
                ></input>
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
                    {showPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                  </span>
                </div>
                {passwordError && <p className={cx('error-message')}>{passwordError}</p>}
              </div>
              <div className={cx('split-content')}>
                <div className={cx('w-content')}>
                  <input
                    placeholder="First name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setFirstNameError('');
                    }}
                  ></input>
                  {firstNameError && <p className={cx('error-message')}>{firstNameError}</p>}
                </div>
                <div className={cx('w-content')}>
                  <input
                    placeholder="Last name"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setLastNameError('');
                    }}
                  ></input>
                  {lastNameError && <p className={cx('error-message')}>{lastNameError}</p>}
                </div>
              </div>

              <div className={cx('input-container')}>
                <input
                  placeholder="Vui lòng nhập số điện thoại"
                  type="text"
                  required
                  value={phone_number}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setPhoneNumberError('');
                  }}
                ></input>
                {passwordError && <p className={cx('error-message')}>{phoneNumberError}</p>}
              </div>
              <div className={cx('input-container')}>
                <input
                  placeholder="Vui lòng nhập số địa chỉ"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setAddressError('');
                  }}
                ></input>
                {passwordError && <p className={cx('error-message')}>{addressError}</p>}
              </div>
              <button className={cx('submit')} type="submit" onClick={handleSubmit}>
                {loading ? <Spin size="large" /> : "Đăng ký"}
              </button>
              <a href="/Login">Đăng nhập ?</a>
            </form>
          </div>
          <div className={cx('right-side')}>
            <div className={cx('wrapper-img')}>
              <a href="/Login">
                <img src={Mythumb} atl="mythumb" className={cx('thumb-img')} />
                <img src={Mylogo} atl="mylogo" className={cx('logo-img')} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
