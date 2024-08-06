import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  styled,
  Typography,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import Banner from "src/components/Banner";
import { useNavigate } from "react-router-dom";
import { useLoading } from "src/contexts/loading";
import axios from "axios";
import { Field, Form } from "react-final-form";
import { InputText } from "src/components/elements/InputText";
import { useCart } from "src/contexts/cart";
import { useMemo } from "react";
import { useUser } from "src/contexts/user";
import { useProductCart } from "src/hooks/useProductCart";
import { useFlash } from "src/contexts/flash";

type CheckoutFormParams = {
  name: string;
  phone: string;
  address: string;
  payment: string;
};

const Wrapper = styled(Stack)({
  paddingTop: 72,
});


const Checkout: React.FC = () => {
  const nav = useNavigate();
  const { setLoading } = useLoading();
  const { cart } = useCart();
  const { user } = useUser();
  const { getCartUser } = useProductCart();
  const { setFlash, setMessage, setSeverity } = useFlash();

  const totalPrice = useMemo(
    () =>
      cart
        ? cart.products.reduce(
            (total, { product, quantity }) => total + product.price * quantity,
            0
          )
        : 0,
    [cart]
  );

  const totalProducts = useMemo(
    () => cart ? cart.products.reduce((total, { quantity }) => total + quantity, 0) : 0,
    [cart]
  );

  const onSubmit = async (values: CheckoutFormParams) => {
    if (!user || !cart || !cart?.products.length) return;
    try {
      setLoading(true);
      await axios.post("/orders", {
        ...values,
        products: cart.products,
        user: user._id,
        totalPrice,
      });
      await getCartUser();
      setSeverity('success');
      setMessage('Đặt hàng thành công');
      setFlash(true);
      nav("/");
    } catch (error) {
      setSeverity('error');
      setMessage('Có lỗi khi đặt hàng');
      setFlash(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Banner page="Checkout" />
      <Container sx={{ mb: 10 }}>
        <Wrapper>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Box flex={3}>
              <Form
                onSubmit={onSubmit}
                initialValues={{
                  payment: "COD",
                }}
                render={({ values }) => (
                  <Stack gap={3}>
                    <Field
                      name="name"
                      render={({ input, meta }) => (
                        <InputText
                          input={input}
                          label={"Name"}
                          messageError={meta.touched && meta.error}
                        />
                      )}
                    />
                    <Field
                      name="phone"
                      render={({ input, meta }) => (
                        <InputText
                          input={input}
                          label={"Phone"}
                          messageError={meta.touched && meta.error}
                        />
                      )}
                    />
                    <Field
                      name="address"
                      render={({ input, meta }) => (
                        <InputText
                          input={input}
                          label={"Address"}
                          messageError={meta.touched && meta.error}
                        />
                      )}
                    />
                    <Field<string>
                      name="payment"
                      render={({ input }) => (
                        <FormControl>
                          <FormLabel>Payment</FormLabel>
                          <RadioGroup {...input}>
                            <FormControlLabel
                              value="COD"
                              control={<Radio />}
                              label="Thanh toán khi nhận hàng"
                            />
                            <FormControlLabel
                              value="BANK"
                              control={<Radio />}
                              label="Thanh toán online"
                            />
                          </RadioGroup>
                        </FormControl>
                      )}
                    />
                    <Button variant="contained" type="submit" onClick={() => onSubmit(values)}>
                      Submit
                    </Button>
                  </Stack>
                )}
              />
            </Box>
            <Box flex={2}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6">Order Summary</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography>Total Products: {totalProducts}</Typography>
                <Typography>Total Price: {totalPrice} VND</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Products</Typography>
                {cart?.products.map((item, index) => (
                  <Stack key={index} direction="row" alignItems="center" gap={2} sx={{ my: 1 }}>
                    <img src={item.product.image} alt={item.product.title} width="50" height="50" style={{ objectFit: "cover" }} />
                    <Typography>{item.product.title}</Typography>
                    <Typography>x{item.quantity}</Typography>
                  </Stack>
                ))}
              </Paper>
            </Box>
          </Stack>
        </Wrapper>
      </Container>
    </>
  );
};

export default Checkout;
