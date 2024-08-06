import { Container, Grid } from "@mui/material";

import { useEffect, useState } from "react";
import ProductCard from "src/components/ProductCard";
import axiso from "src/config/axios";
import { Product } from "src/types/Product";

function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axiso.get("http://localhost:3000/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <Container>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
}

export default Homepage;
