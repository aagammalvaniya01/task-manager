"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Container,
  Typography,
  Link,
} from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/services/routes";
import usersData from "../../data/users.json";

const taskSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
  due_date: Yup.date().required("Due date is required"),
  user_id: Yup.string().required("User is required"),
});

const AddTaskWrapper = ({}) => {
  const router = useRouter();

  const handleTaskSubmit = async (values: any) => {
    console.log("New Task:", values);
    const payload = {
      todo: values.title,
      completed: false,
      userId: values.user_id,
    };
    const response = await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.status === 201) {
      toast.success(data.message);
      router.push(ROUTES.DASHBOARD);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <Box
      sx={{
        background: "#F7F8F8",
      }}
    >
      <Box ml={{ xs: 2, md: 6 }} pt={{ xs: 2, md: 4 }}>
        <Link href={ROUTES.DASHBOARD}>
          <Button variant="outlined" size="small">
            Back To Dashboard
          </Button>
        </Link>
      </Box>
      <Container
        maxWidth="md"
        sx={{
          minHeight: "calc(100vh - 65px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "nowrap",
        }}
      >
        <Box
          my={4}
          sx={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
          p={4}
          minWidth={{ base: "100%", md: 650 }}
        >
          <Typography
            mb={2}
            fontWeight={700}
            variant="h1"
            color="#00030A"
            textAlign={"center"}
            fontSize={32}
          >
            Create new Task
          </Typography>
          <Formik
            initialValues={{
              title: "",
              description: "",
              status: "",
              due_date: "",
              user_id: "",
            }}
            validationSchema={taskSchema}
            onSubmit={handleTaskSubmit}
          >
            {({}) => (
              <Form>
                <Stack spacing={2}>
                  <Field
                    name="title"
                    as={TextField}
                    label="Title"
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="error"
                  />

                  <Field
                    name="description"
                    as={TextField}
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error"
                  />

                  <FormControl fullWidth>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Field
                      name="status"
                      as={Select}
                      labelId="status-label"
                      displayEmpty
                    >
                      <MenuItem value="todo">To Do</MenuItem>
                      <MenuItem value="in-progress">In Progress</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Field>
                  </FormControl>
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="error"
                  />

                  <Field
                    name="due_date"
                    as={TextField}
                    type="date"
                    label="Due Date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <ErrorMessage
                    name="due_date"
                    component="div"
                    className="error"
                  />

                  <FormControl fullWidth>
                    <InputLabel>User</InputLabel>
                    <Field name="user_id" as={Select}>
                      {usersData.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.email}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                  <ErrorMessage
                    name="user_id"
                    component="div"
                    className="error"
                  />

                  <Button type="submit" fullWidth variant="contained">
                    Create Task
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
};

export default AddTaskWrapper;
