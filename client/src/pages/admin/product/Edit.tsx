import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "src/components/ProductForm";
import { useFlash } from "src/contexts/flash";
import { ProductFormParams } from "src/types/Product";


function EditProduct() {
  const nav = useNavigate();
  const { setFlash, setSeverity, setMessage } = useFlash();
  const { id } = useParams();
  const [product, setProduct] = useState<ProductFormParams | undefined>();

  const getProduct = async (id: string) => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  const onSubmit = async (values: ProductFormParams) => {
    try {
      await axios.put(`/products/${id}`, values);
      setSeverity('success');
      setMessage('Update thành công');
      setFlash(true)
      nav("/admin/products/list");
    } catch (error) {
      setSeverity('error');
      setMessage('Có lỗi khi update');
      setFlash(true)
    }
  };

  return (
    <>
      <Container>
        <Stack gap={2}>
          <Typography variant="h3" textAlign={"center"}>
            Edit Product
          </Typography>
          <ProductForm onSubmit={onSubmit} initialValues={product} />
        </Stack>
      </Container>
    </>
  );
}

export default EditProduct;
