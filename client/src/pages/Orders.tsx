import {
    Container,
    Stack,
    Box,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemText,
    Divider,
    Typography,
  } from "@mui/material";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { Order } from "src/types/Product"; // Đảm bảo rằng đường dẫn tới file types của bạn đúng
  
  const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
  
    const getAllOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/orders');
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getAllOrders();
    }, []);
  
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Order History
        </Typography>
        <Stack spacing={4}>
          {orders.map((order) => (
            <Box key={order._id}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6">Order ID: {order._id}</Typography>
                      <Typography>Date: {new Date(order.createdAt).toLocaleDateString()}</Typography>
                      <Typography>Name: {order.name}</Typography>
                      <Typography>Phone: {order.phone}</Typography>
                      <Typography>Address: {order.address}</Typography>
                      <Typography>Payment: {order.payment}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6">Total: ${order.totalPrice}</Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <List>
                    {order.products.map((item, index) => (
                      <ListItem key={index} alignItems="flex-start">
                        <Grid container spacing={2}>
                          <Grid item>
                            <img src={item.product.image}  style={{ width: 100, height: 100, objectFit: 'cover' }} />
                          </Grid>
                          <Grid item xs>
                            <ListItemText
                              primary={item.product.title}
                              secondary={`Quantity: ${item.quantity} - Price: $${item.product.price}`}
                            />
                          </Grid>
                        </Grid>
                      </ListItem>
                    ))}
                  </List>
                  
                </Box>
              </Paper>
            </Box>
          ))}
        </Stack>
      </Container>
    );
  };
  
  export default Orders;
  