"use client";

import React from 'react'
import RegisterForm from './FormWrapper';
import { Box, Container, Typography } from "@mui/material";

const RegisterWrapper = () => {

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
            minWidth={{base: '100%', md: 650}}
          >
            <Box>
              <Typography mb={1} fontWeight={700} variant="h1" color='#00030A' textAlign={'center'} fontSize={40}>
                Register
              </Typography>
              <Typography color='#00030A' textAlign={'center'} variant="body1" mb={3}>
                Create An Account For Access Dashboard
              </Typography>
              <RegisterForm />
            </Box>
          </Box>
        </Container>
      </Box>

    </>
  )
}

export default RegisterWrapper