import { FC } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  styled,
} from "@mui/material";
import { Product } from "src/types/Product";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: Product;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        alt={product.title}
        height="200"
        width="100%"
        image={product.image}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="primary">
            {product.price.toLocaleString()}đ
          </Typography>
          <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
            <Button size="small" variant="contained">
              Detail
            </Button>
          </Link>
        </Box>
      </CardContent>
      
    </StyledCard>
  );
};

export default ProductCard;

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: '20px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));
