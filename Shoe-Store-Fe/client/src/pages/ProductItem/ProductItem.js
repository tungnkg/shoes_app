/* eslint-disable react-hooks/exhaustive-deps */
import { faChevronDown, faChevronUp, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './productItem.module.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

const PUBLIC_API_URL = 'http://localhost:5252';


function ProductItem() {
  const access_token = localStorage.getItem('access_token') || null;
  const [collapsed, setCollapsed] = useState(true);
  const [product, setProduct] = useState(null);
  const [sizeSelect, setSizeSelect] = useState(null);
  const [sizeError, setSizeError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get(`${PUBLIC_API_URL}/open-api/products/${id}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const addToCart = () => {
    if(sizeSelect == null){
      setSizeError('Vui lòng chọn size sản phẩm');
    }else{
      const data = {
        product_id: Number(id),
        size: sizeSelect,
        amount: 1,
      };
      axios
        .post(`${PUBLIC_API_URL}/api/v1/cart/add`, data, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => {
          if(res.data.success){
            message.success('Thêm vào giỏ hàng thành công');
           window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
  };


  return (
    <div className={cx('product-container', 'css-1wpyz1n')}>
      <div className={cx('box-content-wrapper')}>
        <div className={cx('box-content')}>
          <div className={cx('content-image')}>
            {product &&
              product.images.map((image, index) => (
                <button className={cx('item-image')} key={index}>
                  <img alt="" src={image.attachment} className={cx('item-image-containt')}></img>
                </button>
              ))}
          </div>
        </div>
      </div>
      <div className={cx('side-wrapper')}>
        <div className={cx('box-side-container')}>
          {/* title */}
          <div className={cx('side-content-title')}>
            <div className={cx('pr2-sm', 'css-lou6bb2')}>
              <h1 className={cx('headline-2')}>{product && product.name}</h1>
              <h2 className={cx('headline-5')}>
                Danh mục: {product && product.categories.map((i) => i.name).join(' , ')}
              </h2>
              <div className={cx('mb3-sm')}>
                <div className={cx('headline-5', 'mt-2', 'mt-3')}>
                  <div className={cx('product-price_wrapper')}>
                    <div className={cx('product-price')}>
                      Giá sản phẩm:
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                        product && product.price,
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Size */}
          <div className={cx('mt8-lg')}>
            <div className={cx('add-to-cart-form', 'buying-tools')}>
              <div className={cx('size-box-sm', 'size-box-lg')}>
                <div className={cx('mt-5', 'mb3-sm', 'body-2', 'css-1pj6y87')}>
                  <div className={cx('pt8-sm', 'pt0-lg', 'headline-5', 'css-uflume')}>
                    <span className={cx('pr10-sm', 'ta-sm-1', 'sizeHeader')}>Select Size</span>
                  </div>
                  <div className={cx('mt2-sm', 'css-12whm6j')}>
                    {product &&
                      product.sizes
                        .map((i) => i.size)
                        .sort()
                        .map((size, index) => (
                          <div
                            key={index}
                            onClick={() => setSizeSelect(size)}
                          >
                            <input
                              type="radio"
                              className={cx('visually-hidden', 'size-option', { 'selected': size === sizeSelect })}
                              checked={size === sizeSelect}
                              onChange={() => setSizeSelect(size)}
                            />
                            <label className={cx('css-xf3ahg')}>{size}</label>
                          </div>
                        ))}
                  </div>
                  {sizeError && <p style={{color:'red'}} >{sizeError}</p>}
                </div>

                <div className={cx('btn-group')}>
                  <div className={cx('mt10-sm', 'mb6-sm', 'pr16-sm', 'pr10-lg', 'u-full-width', 'css-181b4yz')}>
                    <button className={cx('ncss-btn-primary-dark', 'btn-lg', 'buy-btn')} onClick={addToCart}>Thêm vào giỏ hàng</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* the information of product */}
          <span>
            <div className={cx('pt6-sm', 'pr16-sm', 'pr10-lg')}>
              <div className={cx('description-preview', 'body-2', 'css-1pbvugb')}>
                <p>
                  Looks Max, feels Max. The Air Max SYSTM brings back everything you love about your favourite '80s
                  vibes (without the parachute trousers). Tried-and-tested visible Nike Air cushioning pairs with a
                  sleek, sport-inspired upper. It's Air Max delivering again.
                </p>
              </div>
            </div>
          </span>
          {/* Reviews */}
          <div
            className={cx('Collapsible', !collapsed ? '-is-collapsed' : '')}
            onClick={() => setCollapsed(!collapsed)}
          >
            <span className={cx('Collapsible_trigger')}>
              <div className={cx('trigger-content')}>
                <div className={cx('trigger-content_label')}>Reviews</div>
                <div className={cx('star-rating')}>
                  <span className={cx('icon-star')}>
                    <FontAwesomeIcon icon={faStar} />
                  </span>{' '}
                  <span className={cx('icon-star')}>
                    <FontAwesomeIcon icon={faStar} />
                  </span>{' '}
                  <span className={cx('icon-star')}>
                    <FontAwesomeIcon icon={faStar} />
                  </span>{' '}
                  <span className={cx('icon-star')}>
                    <FontAwesomeIcon className={cx('regular-star')} icon={faStar} />
                  </span>{' '}
                  <span className={cx('icon-star')}>
                    <FontAwesomeIcon className={cx('regular-star')} icon={faStar} />
                  </span>{' '}
                </div>
                <div>
                  {collapsed ? (
                    <button className={cx('trigger-content_icon', '-is-up')}>
                      <FontAwesomeIcon icon={faChevronUp} />
                    </button>
                  ) : (
                    <button className={cx('trigger-content_icon', '-is-down')}>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  )}
                </div>
              </div>
            </span>
            <div style={{ display: collapsed ? 'block' : 'none' }} className={cx('filter-item_block')}>
              <div className={cx('css-1e0k2gt')}>
                <div className={cx('reviews-component', 'mb5-sm')}>
                  <div className={cx('product-review', 'mb10-sm')}>
                    <div className={cx('star-rating', 'stars', 'd-sm-ib')}>
                      <span className={cx('icon-star', 'size-star')}>
                        <FontAwesomeIcon icon={faStar} />
                      </span>{' '}
                      <span className={cx('icon-star', 'size-star')}>
                        <FontAwesomeIcon icon={faStar} />
                      </span>{' '}
                      <span className={cx('icon-star', 'size-star')}>
                        <FontAwesomeIcon icon={faStar} />
                      </span>{' '}
                      <span className={cx('icon-star', 'size-star')}>
                        <FontAwesomeIcon className={cx('regular-star')} icon={faStar} />
                      </span>{' '}
                      <span className={cx('icon-star', 'size-star')}>
                        <FontAwesomeIcon className={cx('regular-star')} icon={faStar} />
                      </span>{' '}
                    </div>
                    <p className={cx('d-sm-ib', 'p14-sm')}>3 stars</p>
                    <p className={cx('pt2-sm', 'd-lg-b')}>
                      <button className={cx('ncss-cta-primary-dark', 'btn-lg', 'underline', 'pr10-sm', 'pb0-sm')}>
                        Write a Review
                      </button>
                    </p>
                  </div>
                  <ul>
                    <li className={cx('review', 'mb10-sm')}>
                      <h4 className={cx('review-title', 'headline-5')}>ThanhNgoo</h4>
                      <div className={cx('star-rating', 'star', 'd-sm-ib', 'body-2')}>
                        <span className={cx('icon-star', 'size-star')}>
                          <FontAwesomeIcon icon={faStar} />
                        </span>{' '}
                        <span className={cx('icon-star', 'size-star')}>
                          <FontAwesomeIcon icon={faStar} />
                        </span>{' '}
                        <span className={cx('icon-star', 'size-star')}>
                          <FontAwesomeIcon icon={faStar} />
                        </span>{' '}
                        <span className={cx('icon-star', 'size-star')}>
                          <FontAwesomeIcon className={cx('regular-star')} icon={faStar} />
                        </span>{' '}
                        <span className={cx('icon-star', 'size-star')}>
                          <FontAwesomeIcon className={cx('regular-star')} icon={faStar} />
                        </span>{' '}
                      </div>
                      <p className={cx('p14-sm', 'd-sm-ib', 'text-color-secondary')}>thanhngoo123 - 4/15/2023</p>
                      <p className={cx('pb2-sm')}></p>
                      <div>
                        <p>
                          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,
                          graphic or web designs.
                        </p>
                      </div>
                    </li>
                  </ul>
                  <p className={cx('mt10-sm', 'mb10-sm')}>
                    <button className={cx('ncss-cta-primary-dark', 'btn-lg', 'css-1nglku6')}>
                      <label className={cx('css-15juft3')}>More Reviews</label>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
