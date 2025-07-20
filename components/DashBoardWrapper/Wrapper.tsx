"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  CardHeader,
  Chip,
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/services/routes";
import taskData from "../../data/tasks.json";
import DeleteTaskModal from "./DeleteTaskModal";

const DashBoardWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [deleteModalId, setDeleteModalId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/todos");
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };
  const handleShowDeleteModal = (id: number) => {
    setShowDeleteModal(true);
    setDeleteModalId(id);
  };
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ my: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">Dashboard</Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => router.push(ROUTES.ADD_TASK)}
            >
              Add Task
            </Button>
          </Box>
          <Box
            sx={{
              mt: 4,
            }}
          >
            {isLoading ? (
              <Grid container spacing={4}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={166}
                      sx={{
                        borderRadius: "8px",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid container spacing={4}>
                {todos.map((task: any) => (
                  <Grid item xs={12} sm={6} md={4} key={task.id}>
                    <Card sx={{ height: "100%" }}>
                      <CardHeader
                        action={
                          <Chip
                            size="small"
                            label={task.completed ? "Completed" : "To Do"}
                            color={task.completed ? "success" : "default"}
                            sx={{ textTransform: "capitalize", mt: "10px" }}
                          />
                        }
                        title={
                          <Typography fontWeight={700} fontSize={24}>
                            {`TODOS Practice ${task.id}`}
                          </Typography>
                        }
                      />
                      <CardContent>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {task.todo}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => router.push(`/tasks/${task.id}/edit`)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          onClick={() => handleShowDeleteModal(task.id)}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
          <DeleteTaskModal
            handleClose={handleDeleteModalClose}
            open={showDeleteModal}
            deleteModalId={deleteModalId}
            fetchTodos={fetchTodos}
          />
        </Box>
      </Container>
    </>
  );
};

export default DashBoardWrapper;
