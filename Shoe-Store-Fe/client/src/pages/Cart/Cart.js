import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, IconButton, Button, Container, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import { Add, Remove, Delete, FavoriteBorder } from "@mui/icons-material";
import { PayCircleOutlined } from "@ant-design/icons";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { message } from "antd";

const PUBLIC_API_URL = 'http://localhost:5252';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);
  const [cart_id, setCartId] = useState(null);
  useEffect(() => {
    fetchCart();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchCart = () => {
    axios
      .get(`${PUBLIC_API_URL}/api/v1/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },  
      })
      .then((res) => {
        setCartItems(res.data.data.products);
        setCartId(res.data.data.id);
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveItem = (productId) => {
    axios
    .delete(`${PUBLIC_API_URL}/api/v1/cart/delete/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },  
    })
    .then((res) => {
      message.success('Xóa sản phẩm khỏi giỏ hàng thành công');
      fetchCart();
    })
    .catch((err) => console.log(err));
};

const handleUpdateAmoutItem = (data) => {
  axios
  .put(`${PUBLIC_API_URL}/api/v1/cart/update`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },  
  })
  .then((res) => {
    message.success('chỉnh sửa số lượng sản phẩm hàng thành công');
    fetchCart();
  })
  .catch((err) => console.log(err));
};

const buyNow = () => {
  const req = {
    cart_id,
    phone_number:phone,
    address,
    products: cartItems.map(item => ({
      product_id: item.product_id,  
      size: item.size,
      amount: item.amount,
    })),
  }
  axios
  .post(`${PUBLIC_API_URL}/api/v1/bill/buy-now`, req, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },  
  })
  .then((res) => {
    message.success('Mua hàng thành công');
    window.location.href = "/";
  })
  .catch((err) => console.log(err));

}

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.amount, 0);
  
  return (<>
    {cartItems?.length !== 0? (<Container sx={{ display: "flex", gap: 4, transform: "scale(1.5)", transformOrigin: "top left" }}>
      <Grid container spacing={3} sx={{ flex: 2 }}>
        {cartItems.map((item) => (
          <Grid item xs={12} key={item.product_id}>
            <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
              <CardMedia
                component="img"
                sx={{ width: 150, height: 150, borderRadius: 2 }}
                image={item.product.images[0].attachment}
                alt={item.product.name}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h5">{item.product.name}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {item.product.categories.map(item => item.name).join(', ')}
                </Typography>
                <Typography variant="body1">Color: {item.product.color}</Typography>
                <Typography variant="body1">Size: {item.size}</Typography>
                <Typography variant="h5" color="primary">
                  {item.price.toLocaleString()}₫
                </Typography>
              </CardContent>
              <IconButton onClick={() => handleUpdateAmoutItem({product_properties_id: item.product_properties_id, amount: item.amount - 1})}>
                <Remove fontSize="large" />
              </IconButton>
              <Typography variant="h6">{item.amount}</Typography>
              <IconButton onClick={() => handleUpdateAmoutItem({product_properties_id: item.product_properties_id, amount: item.amount + 1})}>
                <Add fontSize="large" />
              </IconButton>
              <IconButton onClick={() => handleRemoveItem(item.product_properties_id)}>
                <Delete color="error" fontSize="large" />
              </IconButton>
              <IconButton>
                <FavoriteBorder fontSize="large" />
              </IconButton>
              
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Right Side - Order Summary */}
      <Card sx={{ flex: 1, ml: 1, p: 3 }}>
        <Typography variant="h4">Thông tin thanh toán</Typography>

        <TextField
          fullWidth
          label="Địa chỉ giao hàng"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ my: 2 }}
        />
        <TextField
          fullWidth
          label="Số điện thoại"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ my: 2 }}
        />

        <Typography variant="h5">Tiền hàng của bạn: {totalAmount.toLocaleString()}₫</Typography>
        <Typography variant="h5">Phí vận chuyển: Miễn phí</Typography>
        <Typography variant="h5" color="primary">Số tiền cần thanh toán cuối cùng: {totalAmount.toLocaleString()}₫</Typography>
        <TextField
          label="Nhậpmã giảm giá (nếu có)"
          variant="outlined"
          fullWidth
          sx={{ my: 2 }}
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <Button variant="contained" color="primary" sx={{ mt: 3, width: "100%", p: 2 }} onClick={handleOpen}>
          <PayCircleOutlined style={{ fontSize: 32, marginRight: 10 }} /> Đặt hàng
        </Button>
      </Card>

      {/* Confirmation Modal */}
      <Dialog open={open} onClose={handleClose}  maxWidth="lg" fullWidth > 
        <DialogTitle>Xác nhận đặt hàng</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc chắn muốn đặt hàng không?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Hủy</Button>
          <Button onClick={buyNow} color="primary">Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </Container>): 
    <Typography variant="h2">Không có sản phẩm nào trong giỏ hàng, bạn vui lòng mua hàng r vào giỏ hàng</Typography>
    }
    </>
  );
};

export default Cart;
