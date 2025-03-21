import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import axios from 'axios';
// import config from '~/config';
const PUBLIC_API_URL = 'http://localhost:5252';
const sizes = [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43];
const colors = [
  { name: "Black", class: "is--black" },
  { name: "Blue", class: "is--blue" },
  { name: "Brown", class: "is--brown" },
  { name: "Green", class: "is--green" },
  { name: "Grey", class: "is--grey" },
  { name: "Multi-colour", class: "is--multi-colour" },
  { name: "Orange", class: "is--orange" },
  { name: "Pink", class: "is--pink" },
  { name: "Purple", class: "is--purple" },
  { name: "Red", class: "is--red" },
  { name: "White", class: "is--white" },
  { name: "Yellow", class: "is--yellow" },
];

const cx = classNames.bind(styles);

function Sidebar({ setSelectedBrands, setSelectCategory, setSizes, setColor, setIsPromoted }) {
  const [collapsed1, setCollapsed1] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const [collapsed3, setCollapsed3] = useState(true);
  const [collapsed4, setCollapsed4] = useState(true);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedRanges, setSelectedRanges] = useState([]);
  const [sizeCurr, setSizeCurr] = useState([]);

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    const [min, max] = value.split("-").map(Number);


    setSelectedRanges((prev) =>
      checked
        ? [...prev, { min, max }]
        : prev.filter((range) => range.min !== min || range.max !== max)
    );
  };

  const minPrice =
    selectedRanges.length > 0
      ? Math.min(...selectedRanges.map((r) => r.min))
      : null;
  const maxPrice =
    selectedRanges.length > 0
      ? Math.max(...selectedRanges.map((r) => (r.max ? r.max : r.min))) // Handle upper bound properly
      : null;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {

    axios
      .get(`${PUBLIC_API_URL}/open-api/v1/brand/get-all`)
      .then((res) => {
        setBrands(res.data.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${PUBLIC_API_URL}/open-api/v1/category/get-all`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSelectBrand = (event) => {
    const { value, checked } = event.target;
    const brandId = Number(value); // Convert ID to number

    setSelectedBrands((prev) =>
      checked ? [...prev, brandId] : prev.filter((id) => id !== brandId)
    );
  };

  const handleSelectCategory = (event) => {
    const { value, checked } = event.target;
    const category_id = Number(value); // Convert ID to number

    setSelectCategory((prev) =>
      checked ? [...prev, category_id] : prev.filter((id) => id !== category_id)
    );
  };

  const toggleSize = (size) => {
    setSizeCurr((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );/*  */
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };


  return (
    <aside className={cx('wrapper')}>
      <h2 className={cx('title')}>Thương hiệu</h2>
      <li className={cx("wrapper-li")}>
        <ul>
          {brands.map((brand) => (
            <li key={brand.id} className={cx("items")}>
              <label>
                <input
                  type="checkbox"
                  value={brand.id}
                  onChange={handleSelectBrand}
                />
                {brand.name}
              </label>
            </li>
          ))}
        </ul>
      </li>
      <h2 className={cx('title')}>Danh mục</h2>
      <li className={cx('wrapper-li')}>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className={cx("items")}>
              <label>
                <input
                  type="checkbox"
                  value={category.id}
                  onChange={handleSelectCategory}
                />
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </li>

      <div className={cx('Collapsible')} >
        <span className={cx('Collapsible_trigger')}>
          <div className={cx('trigger-content')}>
            <div className={cx('trigger-content_label')}>Giá</div>
            <div onClick={() => setCollapsed1(!collapsed1)}>
              {collapsed1 ? (
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
        <div style={{ display: collapsed1 ? 'block' : 'none' }} className={cx('filter-item_block')}>
          <button className={cx('filter-item')} >
            <input className={cx('pseudo-checkbox')} type="checkbox" value="1000000-1000000" onChange={handleFilterChange} />
            <span className={cx('filter-item_item-label')}>dưới 1,000,000đ</span>
          </button>
          <button className={cx('filter-item')}>
            <input className={cx('pseudo-checkbox')} type="checkbox" value="1000000-2000000" onChange={handleFilterChange} />
            <span className={cx('filter-item_item-label')}>1,000,000đ - 2,000,000đ</span>
          </button>{' '}
          <button className={cx('filter-item')}>
            <input className={cx('pseudo-checkbox')} type="checkbox" value="2000000-4000000" onChange={handleFilterChange} />
            <span className={cx('filter-item_item-label')}>2,000,000đ - 4,000,000đ</span>
          </button>
          <button className={cx('filter-item')}>
            <input className={cx('pseudo-checkbox')} type="checkbox" value="4000000-9999999" onChange={handleFilterChange} />
            <span className={cx('filter-item_item-label')}>Trên 4,000,000đ</span>
          </button>
        </div>
      </div>

      {/* Size */}
      <div className={cx('Collapsible', !collapsed2 ? '-is-collapsed' : '')} >
        <span className={cx('Collapsible_trigger')}>
          <div className={cx('trigger-content')}>
            <div className={cx('trigger-content_label')}>Size</div>
            <div onClick={() => setCollapsed2(!collapsed2)}>
              {collapsed2 ? (
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
        {/* ------------------------------------------------------- */}
        <div style={{ display: collapsed2 ? 'block' : 'none' }} className={cx('filter-item_block')}>
          {sizes.map((size) => (
            <button
              className={cx('filter-item-size', sizeCurr.includes(size) && 'active')}
              key={size}
              onClick={() => toggleSize(size)}
            >
              <span className={cx("filter-item_item-label")}>{size}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Colour */}
      <div className={cx('Collapsible', !collapsed3 ? '-is-collapsed' : '')} >
        <span className={cx('Collapsible_trigger')}>
          <div className={cx('trigger-content')}>
            <div className={cx('trigger-content_label')}>Màu</div>
            <div onClick={() => setCollapsed3(!collapsed3)}>
              {collapsed3 ? (
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
        <div style={{ display: collapsed3 ? 'block' : 'none' }} className={cx('filter-item_block')}>
          <div className={cx('Collapsible_contentOuter', 'filter-group_outer')}>
            <div className={cx('Collapsible_contentIner', 'filter-group_content', 'for--colors')}>
              <div className={cx('filter-group_items-group')}>
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={cx("filter-item-colour")}
                    onClick={() => setColor(color.name)}
                  >
                    <div className={cx("filter-item_color-patch", color.class)}></div>
                    <span className={cx("filter-item_item-label")}>{color.name}</span>
                  </button>
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('Collapsible', !collapsed4 ? '-is-collapsed' : '')} >
        <div className={cx('Collapsible')} >
          <span className={cx('Collapsible_trigger')}>
            <div className={cx('trigger-content')}>
              <div className={cx('trigger-content_label')}>Giá</div>
              <div onClick={() => setCollapsed4(!collapsed4)}>
                {collapsed4 ? (
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
          <div style={{ display: collapsed4 ? 'block' : 'none' }} className={cx('filter-item_block')}>
            <button className={cx('filter-item')} >
              <input className={cx('pseudo-checkbox')} type="checkbox" onChange={(e) => setIsPromoted(e.target.checked)} />
              <span className={cx('filter-item_item-label')}>Có khuyến mại</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
