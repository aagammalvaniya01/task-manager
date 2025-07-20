"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import FormWrapper from "./FormWrapper";
import usersData from "../../data/users.json";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/services/routes";
import Link from "next/link";

const LoginWrapper = () => {
  const [users, setUsers] = useState(usersData);
  const router = useRouter();

  const handleSuccessfulLogin = () => {
    router.push(ROUTES.DASHBOARD);
  };
  return (
    <>
      <Box
        sx={{
          background: "#F7F8F8",
        }}
      >
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
            sx={{
              background: "#fff",
              borderRadius: "16px",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
            p={6}
            minWidth={{ base: "100%", md: 650 }}
          >
            <Box>
              <Typography
                mb={1}
                fontWeight={700}
                variant="h1"
                color="#00030A"
                textAlign={"center"}
                fontSize={40}
              >
                Log In
              </Typography>
              <Typography color="#00030A" variant="body1" mb={3}>
                Please Login For Access Dashboard
              </Typography>
              <FormWrapper users={users} onSuccess={handleSuccessfulLogin} />
            </Box>
            <Box mt={1.5} display={"flex"} gap={0.5} alignItems={"center"}>
              <Typography color="#727B8C">Not Account ?</Typography>
              <Link href={ROUTES.REGISTER}>
                <Typography color="#155FF6">Register</Typography>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LoginWrapper;
