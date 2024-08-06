import { Button, Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "src/components/elements/InputText";
import { MIN_PASSWORD } from "src/consts";
import { useFlash } from "src/contexts/flash";
import isEmail from "validator/lib/isEmail";

type RegisterFormParams = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const nav = useNavigate();
  const { setFlash, setMessage, setSeverity } = useFlash();
  const validate = (values: RegisterFormParams) => {
    const { username, email, password } = values;
    const errors: ValidationErrors = {};
    if (!username) errors.username = "Vui lòng nhập username";
    if (!email) errors.email = "Vui lòng nhập email";
    if (email && !isEmail(email)) errors.email = "Email chưa đúng định dạng";
    if (!password) errors.password = "Vui lòng nhập password";
    if (password && password.length < MIN_PASSWORD)
      errors.password = `Password tối thiểu là ${MIN_PASSWORD} ký tự`;
    return errors;
  };

  const onSubmit = async (data: RegisterFormParams) => {
    try {
      await axios.post("/auth/register", data);
      setSeverity("success");
      setMessage("Đăng nhập thành công");
      setFlash(true);
      nav("/login");

    } catch (error) {
      setSeverity("error");
      setMessage("Đăng kí thất bại");
      setFlash(true);
    }
  };

  return (
    <Container>
      <Typography variant="h2" textAlign={"center"} mb={2}>
        Register
      </Typography>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ values }) => {
          return (
            <Stack gap={2}>
              <Field
                name="username"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Username"}
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
              <Field
                name="email"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Email"}
                    messageError={meta.touched && meta.error}
                  />
                )}
              />
              <Field
                name="password"
                render={({ input, meta }) => (
                  <InputText
                    input={input}
                    label={"Password"}
                    messageError={meta.touched && meta.error}
                    type="password"
                  />
                )}
              />
              <Button variant="contained" onClick={() => onSubmit(values)}>
                Submit
              </Button>
              <Link to={"/login"}>
                <Button variant="contained">Đã có tài khoản</Button>
              </Link>
            </Stack>
          );
        }}
      />
    </Container>
  );
};

export default Register;
