import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "src/components/Loading";
import { useFlash } from "src/contexts/flash";
import { useProductCart } from "src/hooks/useProductCart";
import { Product } from "src/types/Product";

function ProductDetail() {
  const { addToCart } = useProductCart();
  const { setFlash, setMessage, setSeverity } = useFlash();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  const getProduct = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  const handleAddToCart = (product: Product) => {
    try {
      if (quantity <= 0) return;
      addToCart({ product, quantity });
      setSeverity("success");
      setMessage("Thêm giỏ hàng thành công");
      setFlash(true);
    } catch (error) {
      setSeverity("success");
      setMessage("Có lỗi khi thêm giỏ hàng");
      setFlash(true);
    }
  };
  return (
    <>
      <Loading isShow={loading} />
      <Container>
        {product && (
          <Stack direction={"row"} gap={3}>
            <img src={product.image} alt="" width={"500px"} />
            <Stack gap={3}>
              <Typography component="h1" fontSize={"26px"}>
                {product.title}
              </Typography>
              <Typography fontWeight={"bold"} color={"Highlight"}>
                ${product.price}
              </Typography>
              <Typography fontSize={"20px"}>
                Category: {product.category.name}
              </Typography>
              <Stack direction={"row"} gap={2} alignItems={"center"}>
                <Typography>Quantity: </Typography>
                <IconButton
                  onClick={() => setQuantity(quantity === 0 ? 0 : quantity - 1)}
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <IconButton onClick={() => setQuantity(quantity + 1)}>
                  <AddIcon />
                </IconButton>
              </Stack>
              <Typography>{product.description}</Typography>
              <Button
                variant="outlined"
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </Stack>
          </Stack>
        )}
      </Container>
    </>
  );
}

export default ProductDetail;
