import React from "react";
import classNames from 'classnames/bind';
import styles from './OrderDetail.module.scss';
const cx = classNames.bind(styles);
const OrderDetail = () => {
  const order = {
    id: 4,
    created_date: "2025-03-25 11:41:40",
    status: 0,
    address: "27 Ngõ 111 Nguyễn Xiển, phường Hạ Đình, Quận Thanh Xuân, Tp Hà Nội",
    phone_number: "0347204560",
    total: 32615000,
    is_online_transaction: false,
    user_name: "tungdz",
    products: [
      {
        product_id: 4,
        size: 41,
        price: 15258000,
        amount: 2,
        product: {
          name: "Nike Vaporfly 4",
          code: "IB8167-999",
          description:
            "The Vaporfly 4 is a mile-eating machine that just got lighter.",
          thumbnail_img:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/82d512f1-14cf-4418-afc0-40a001b1bb4a/ZOOMX+VAPORFLY+NEXT%25+4+PRM.png",
        },
      },
      {
        product_id: 3,
        size: 42,
        price: 12358000,
        amount: 2,
        product: {
          name: "Nike Pegasus Premium",
          code: "HQ2592-100",
          description:
            "The Pegasus Premium supercharges responsive cushioning with a triple stack.",
          thumbnail_img:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/22d82643-0bed-457a-b859-2a55303dcb29/NIKE+PEGASUS+PREMIUM.png",
        },
      },
    ],
  };

  return (
  <section className={cx('wrapper')}>
    <div className="">
      <div className="">
        <h2 className="">Order Details</h2>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Date:</strong> {order.created_date}</p>
        <p><strong>Customer:</strong> {order.user_name}</p>
        <p><strong>Phone:</strong> {order.phone_number}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Total:</strong> {order.total.toLocaleString()} VND</p>
        <p><strong>Payment Method:</strong> {order.is_online_transaction ? "Online" : "Cash on Delivery"}</p>

        <h3 className="">Products</h3>
        <div className="">
          {order.products.map((item, index) => (
            <div key={index} className="">
              <img
                src={item.product.thumbnail_img}
                width={300}
                alt={item.product.name}
                className=""
              />
              <div>
                <p className="font-bold">{item.product.name}</p>
                <p className="text-sm text-gray-600">Code: {item.product.code}</p>
                <p>Size: {item.size}</p>
                <p>Price: {item.price.toLocaleString()} VND</p>
                <p>Quantity: {item.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
};

export default OrderDetail;
