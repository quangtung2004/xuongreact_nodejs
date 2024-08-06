import { Logout } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Badge,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "src/contexts/cart";
import { useFlash } from "src/contexts/flash";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const nav = useNavigate();
  const { setFlash, setMessage, setSeverity } = useFlash(); // Đảm bảo hook được sử dụng đúng cách

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Kiểm tra giá trị token
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setSeverity("success");
    setMessage("Đã đăng xuất");
    setFlash(true);
    setIsLoggedIn(false);
    nav("/");
  };

  const { cart } = useCart();

  const cartQuantity = useMemo(
    () =>
      cart
        ? cart.products.reduce((total, { quantity }) => total + quantity, 0)
        : 0,
    [cart]
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        color: "black",
        padding: "0 50px",
        marginBottom: "20px",
      }}
    >
      <Container>
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <img
              src="src/assets/bird-colorful-logo-gradient-vector_343694-1365.avif"
              alt=""
              style={{ height: 90 }}
            />
          </Typography>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/">
              <Stack>Home</Stack>
            </Link>
          </Typography>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="orders">
              <Stack>Đơn đặt hàng</Stack>
            </Link>
          </Typography>

          {/* Giỏ hàng */}
          <Stack gap="45px" direction="row">
            {isLoggedIn ? (
              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<Logout />}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <img src="/user.svg" alt="user" />
              </Link>
            )}
            <SearchIcon />
            <FavoriteBorderIcon />
            <Link to="/cart">
              <Badge badgeContent={cartQuantity} color="secondary">
                <img src="/cart.svg" alt="cart" />
              </Badge>
            </Link>
          </Stack>

          {/* Đăng nhập/Đăng xuất */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
