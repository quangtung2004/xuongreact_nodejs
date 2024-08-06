import {
  Button,
  Container,
  IconButton,
  Stack,
  styled,
  Typography,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import Banner from "src/components/Banner";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "src/contexts/cart";
import { useProductCart } from "src/hooks/useProductCart";
import { Link } from "react-router-dom";
import ConfirmDialog from "src/components/ConfirmDialog";

const labels = ["Product", "Price", "Quantity", "Subtotal", ""];

const Cart = () => {
  const { cart } = useCart();
  const { handleConfirm, handleDelete, confirm, setConfirm, updateQuantityInCart } = useProductCart();

  const totalPrice = cart?.products.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  ) || 0;

  const totalQuantity = cart?.products.reduce(
    (total, item) => total + item.quantity,
    0
  ) || 0;

  const handleQuantityChange = (productId: string, change: number) => {
    updateQuantityInCart(productId, change);
  };
  

  return (
    <>
      <Banner page="Cart" />
      <Container>
        <Stack direction="row"  spacing={3}>
          <Stack sx={{ padding: 2 }} flex={2} spacing={2}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <LabelWrapper
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-around"}
              >
                {labels.map((label, index) => (
                  <Typography fontWeight={500} key={index}>
                    {label}
                  </Typography>
                ))}
              </LabelWrapper>
              <Stack spacing={2} my={2}>
                {cart?.products.map((item, index) => (
                  <Stack
                    key={index}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    spacing={2}
                  >
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                      <img src={item.product.image} alt={item.product.title} width={"100px"} style={{ objectFit: "cover" }} />
                      <Typography fontWeight={500}>
                        {item.product.title.length > 20 ? item.product.title.substring(0, 20) + "..." : item.product.title}
                      </Typography>
                    </Stack>

                    <Typography fontWeight={500}>{item.product.price}đ</Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton onClick={() => handleQuantityChange(item.product._id, -1)} disabled={item.quantity <= 1}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography fontWeight={500}>{item.quantity}</Typography>
                      <IconButton onClick={() => handleQuantityChange(item.product._id, 1)}>
                        <AddIcon />
                      </IconButton>
                    </Stack>
                    <Typography fontWeight={500}>
                      {(item.product.price * item.quantity).toLocaleString()}đ
                    </Typography>
                    <IconButton onClick={() => handleConfirm(item.product._id)}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Stack>

          <Box flex={1} sx={{ padding: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">Order Summary</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography>Total Products: {totalQuantity}</Typography>
              <Typography>Total Price: {totalPrice.toLocaleString()}đ</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Products</Typography>
                {cart?.products.map((item, index) => (
                  <Stack key={index} direction="row" alignItems="center" gap={2} sx={{ my: 1 }}>
                    <img src={item.product.image} alt={item.product.title} width="50" height="50" style={{ objectFit: "cover" }} />
                    <Typography>{item.product.title}</Typography>
                    <Typography>x{item.quantity}</Typography>
                  </Stack>
                ))}
              <Stack direction="row" justifyContent="center" mt={2}>
                <Link to="/checkout">
                  <Button variant="contained" color="primary">
                    Proceed to Checkout
                  </Button>
                </Link>
              </Stack>
            </Paper>
          </Box>
        </Stack>
        <ConfirmDialog
          confirm={confirm}
          onConfirm={handleDelete}
          onClose={() => setConfirm(false)}
        />
      </Container>
    </>
  );
};

export default Cart;

const LabelWrapper = styled(Stack)(({ theme }) => ({
  background: "#F9F1E7",
  height: 55,
  padding: "0 16px",
}));
