/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { ROUTES } from '@/app/services/routes';

const RegisterForm = () => {
    const router = useRouter();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                const data = await response.json();
                if (response.status === 201) {
                    toast.success(data.message);
                    router.push(ROUTES.DASHBOARD);
                } else {
                    toast.error(data.message);
                }
            }}
        >
            {({ isSubmitting, setFieldValue, touched, setFieldTouched }) => (
                <Form>
                    <Stack spacing={2}>
                        <Field
                            name="email"
                            as={TextField}
                            label="Email"
                            fullWidth
                            variant="outlined"
                            onChange={(e: any) => {
                                setFieldValue("email", e.target.value);
                                setFieldTouched("email", false)
                            }}
                            helperText={touched.email && <ErrorMessage name="email" />}
                            error={touched.email && (<ErrorMessage name="email" />)}
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
                                setFieldTouched("password", false)
                            }}
                            helperText={touched.email && <ErrorMessage name="password" />}
                            error={touched.email && (<ErrorMessage name="password" />)}
                        />
                        <Button type="submit" fullWidth variant="contained">
                            Register
                        </Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;
