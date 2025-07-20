/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";
import { writeLocalStorage } from "../../app/services/local-storage";
import { useGlobalContext } from "@/app/context/GlobalContext";

interface loginFormProps {
  onSuccess?: any;
  users: {
    email: string;
    password: string;
  }[];
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

const LoginForm = ({ users, onSuccess }: loginFormProps) => {
  const { setIsLoggedIn } = useGlobalContext();
  const handleLogin = (email: string, password: string) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      onSuccess();
      writeLocalStorage("isLoggedIn", "true");
      setIsLoggedIn(true);
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", rememberMe: false }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleLogin(values.email, values.password)}
    >
      {({ setFieldValue, values, touched, setFieldTouched }) => (
        <Form>
          <Stack spacing={2}>
            <Field
              name="email"
              as={TextField}
              label="Email"
              fullWidth
              onChange={(e: any) => {
                setFieldValue("email", e.target.value);
                setFieldTouched("email", false);
              }}
              variant="outlined"
              helperText={touched.email && !values.email && <ErrorMessage name="email" />}
              error={touched.email &&  !values.email&& <ErrorMessage name="email" />}
            />

            <Field
              name="password"
              type="password"
              as={TextField}
              label="Password"
              fullWidth
              variant="outlined"
              onChange={(e: any) => {
                setFieldValue("password", e.target.value);
                setFieldTouched("password", false);
              }}
              helperText={touched.password &&  !values.password && <ErrorMessage name="password" />}
              error={touched.password && !values.password &&  <ErrorMessage name="password" />}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={values.rememberMe}
                  onChange={(e) =>
                    setFieldValue("rememberMe", e.target.checked, true)
                  }
                  sx={{
                    color: "#155FF6",
                    "&.Mui-checked": {
                      color: "#155FF6",
                    },
                  }}
                />
              }
              label="Keep me logged in"
            />

            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
