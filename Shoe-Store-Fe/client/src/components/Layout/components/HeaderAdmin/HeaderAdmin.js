import classNames from 'classnames/bind';
import styles from './HeaderAdmin.module.scss';
import logo from '~/assets/images/logo.png';

import { Link } from 'react-router-dom';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { message } from 'antd';

const cx = classNames.bind(styles);


function HeaderAdmin() {

  const handleLogout = () => {
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
  }
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={config.routes.home} className={cx('logo-link')}>
          <img src={logo} alt="DaShoe" className={cx('logo')} />
        </Link>

        <div className={cx('site-user')}>
          <div className={cx('profile-user')}>
            <p className={cx('name-user')}>Admin</p>
            <p className={cx('avatar-user')}>
              <FontAwesomeIcon icon={faUser} />
            </p>
          </div>
          <Link to={config.routes.login} className={cx('logout')} title='Đăng xuất' onClick={handleLogout} >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderAdmin;
