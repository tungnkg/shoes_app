import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSliders } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Sidebar from '~/components/Layout/components/Sidebar/Sidebar';
import config from '~/config';
import axios from 'axios';

const cx = classNames.bind(styles);

const PUBLIC_API_URL = 'http://localhost:5252';


function Product() {
  const [visible, setVisible] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectCategory] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState(null);
  const [is_promoted, setIsPromoted] = useState(false);

  useEffect(() => {
    fetchProducts();
    console.log(selectedBrands + "  " + selectedCategory + "  " + sizes + "  " + color + " " + is_promoted);
  }, [selectedBrands, selectedCategory, sizes, color, is_promoted]);

  const fetchProducts = () => {
    
    axios
      .get(`${PUBLIC_API_URL}/open-api/v1/product/get-all`)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err));
  };


  const toggleSideBar = () => {
    setVisible(!visible);
  };

  return (
    <div className={cx('experience-wrapper')}>
      <div className={cx('sidebar')} style={{ display: visible ? 'block' : 'none', transition: 'margin-left 0.4s ease-in-out' }}>
        <Sidebar setSelectedBrands={setSelectedBrands} setSelectCategory={setSelectCategory} setSizes={setSizes} setColor={setColor} 
                setIsPromoted={setIsPromoted}
        />
      </div>

      <div
        className={cx('product-grid', 'sub-product-grid')}
        style={{ marginLeft: visible ? '356px' : '0px', transition: 'margin-left 0.3s ease-in-out' }}
      >
        <header className={cx('wall-header')}>
          <div className={cx('wall-header_content')}>
            <nav className={cx('wall-header_nav')}>
              <button className={cx('filters-btn')} onClick={toggleSideBar}>
                {visible ? (
                  <span className={cx('filters-btn_filter_text')}>Hide Filters</span>
                ) : (
                  <span className={cx('filters-btn_filter_text')}>Show Filters</span>
                )}
                <FontAwesomeIcon className={cx('icon-filter-ds')} icon={faSliders} />
              </button>
            </nav>
          </div>
        </header>
        <div className={cx('wall-header-offset')}></div>
        <main>
          <section>
            <div className={cx('product-grid_items')}>
              {products.map((product) => {
                return (
                  <Link to={`${config.routes.productItem}/${product.id}` } className={cx('product-card', 'product-grid_card')}>
                    <div className={cx('product-card_body')}>
                      <figure>
                        <div className={cx('wall-image-loader')}>
                          <img
                            alt="Nike Air Max SYSTM Men's Shoes"
                            className={cx('product-card_hero-image')}
                            src={product.thumbnail_img}
                          ></img>
                        </div>
                        <div className={cx('product-card_info')}>
                          <p className={cx('product-card_info-title')}>{product.name}</p>
                          <p className={cx('product-card_info-body')}>Danh mục: {product.categories.map(i => i.name).join(' , ')}</p>
                        </div>
                        <div className={cx('product-card_footer')}>
                          <div className={cx('product-card_price')}>
                            <span className={cx('product-card_price-title')}>Giá sản phẩm: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</span>
                          </div>
                          <button className={cx('product-card_btn')}>
                            <FontAwesomeIcon className={cx('product-card_btn-shopping')} icon={faCartShopping} />
                          </button>
                        </div>
                      </figure>
                    </div>
                  </Link>
                )

              })}


            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Product;
