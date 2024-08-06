import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "src/components/ProductForm";
import { useFlash } from "src/contexts/flash";
import { ProductFormParams } from "src/types/Product";


function AddProduct() {
  const nav = useNavigate();

  const { setFlash, setMessage, setSeverity } = useFlash();

  const onSubmit = async (values: ProductFormParams) => {
    try {
      await axios.post("/products", values);
      setSeverity('success');
      setMessage('Thêm sản phẩm thành công');
      setFlash(true);
      nav("/admin/products/list");
    } catch (error) {
      setSeverity('error');
      setMessage('Có lỗi xảy ra khi thêm sản phẩm');
      setFlash(true);
    }
  };

  return (
    <>
      <Container>
        <Stack gap={2}>
          <Typography variant="h3" textAlign={"center"}>
            Add Product
          </Typography>
          <ProductForm onSubmit={onSubmit} initialValues={{ isShow: true }} />
        </Stack>
      </Container>
    </>
  );
}

export default AddProduct;
