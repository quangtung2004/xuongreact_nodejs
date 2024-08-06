import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Flash from "src/components/Flash";
import Header from "src/components/Header";
import Loading from "src/components/Loading";
import { useFlash } from "src/contexts/flash";
// import { useFlash } from "src/contexts/flash";
import { useLoading } from "src/contexts/loading";
import { useProductCart } from "src/hooks/useProductCart";

function ClientLayout() {
  const { loading } = useLoading();
  const { flash } = useFlash();
  const { getCartUser } = useProductCart();

  useEffect(() => {
    getCartUser();
  }, []);

  return (
    <>
      <Flash isShow={flash}/>
      <Loading isShow={loading} />
      <Header />
      <Outlet />
    </>
  );
}

export default ClientLayout;
