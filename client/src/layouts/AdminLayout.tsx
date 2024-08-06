import { Stack } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Flash from "src/components/Flash";
import Loading from "src/components/Loading";
import Sidebar from "src/components/Sidebar";
import { useFlash } from "src/contexts/flash";
import { useLoading } from "src/contexts/loading";

function AdminLayout() {
  const { loading } = useLoading();

  const nav = useNavigate();

  const { flash } = useFlash();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      nav("/login");
      return;
    }
  }, [token, nav]);

  return (
    <>
      <Flash isShow={flash} />
      <Loading isShow={loading} />
      <Stack direction={"row"} gap={2}>
        <Sidebar />
        <Outlet />
      </Stack>
    </>
  );
}

export default AdminLayout;
