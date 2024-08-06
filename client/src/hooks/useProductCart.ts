import axios from "axios";
import { useCart } from "src/contexts/cart";
import { useFlash } from "src/contexts/flash";
import { useUser } from "src/contexts/user";
import { Product } from "src/types/Product";
import { useState } from "react";

type AddToCart = {
  product: Product;
  quantity: number;
};

export const useProductCart = () => {
  const { user, setUser } = useUser();
  const { cart, setCart } = useCart();
  const { setFlash, setMessage, setSeverity } = useFlash();

  const [confirm, setConfirm] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);

  const getCartUser = async () => {
    const userStorage = localStorage.getItem("user") || "{}";
    const user = JSON.parse(userStorage);
    setUser(user);
    if (!user._id) return;
    const { data } = await axios.get(`/carts/user/${user._id}`);
    setCart(data);
  };

  const addToCart = async ({ product, quantity }: AddToCart) => {
    if (quantity <= 0 || !user) return;
    try {
      if (cart) {
        await axios.put(`/carts/${cart._id}`, {
          product,
          quantity,
          user: user._id,
        });
      } else {
        await axios.post("/carts", {
          product,
          quantity,
          user: user._id,
        });
      }
      const { data } = await axios.get(`/carts/user/${user._id}`);
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeToCart = async (productId: string) => {
    if (!user) return;
    try {
      await axios.delete(`/carts/user/${user._id}/product/${productId}`);
      setSeverity('success');
      setMessage('Xóa sản phẩm thành công');
      setFlash(true);
      getCartUser();
    } catch (error) {
      setSeverity('error');
      setMessage('Xóa sản phẩm lỗi');
      setFlash(true);
    }
  };

  const handleConfirm = (productId: string) => {
    setProductId(productId);
    setConfirm(true);
  };

  const handleDelete = () => {
    if (productId) {
      removeToCart(productId);
      setConfirm(false);
      setProductId(null);
    }
  };

  return { addToCart, handleConfirm, handleDelete, confirm, setConfirm, getCartUser };
};
