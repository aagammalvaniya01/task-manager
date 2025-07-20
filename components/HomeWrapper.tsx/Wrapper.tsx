"use client";

import { ROUTES } from '@/app/services/routes';
import { useGlobalContext } from "@/app/context/GlobalContext";
import { Box, Button, Container, Link, Typography } from '@mui/material'
import React from 'react'

const HomeWrapper = () => {
  const { isLoggedIn } = useGlobalContext();

    return (
        <div>
            <Box sx={{
                background: '#F7F8F8'
            }}

            >
                <Container maxWidth="md" sx={{
                    minHeight: 'calc(100vh - 65px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'nowrap'

                }}>
                    <Box gap={6} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Typography fontSize={40} textAlign={'center'} mb={2} color='#00030A' fontWeight={700} variant="h1">
                                Test Demo - Simple To-Do App for Task Management
                            </Typography>
                            <Typography fontWeight={500} color='#727B8C' variant="subtitle2" textAlign={'center'} maxWidth={400}>
                                Test Demo is a simple application featuring a To-Do App for managing tasks efficiently. Users can add, edit, delete, and track their daily activities with ease.
                            </Typography>
                        </Box>
                        <Box>
                            <Link href={isLoggedIn ? ROUTES.DASHBOARD : ROUTES.LOGIN}>
                                <Button variant='contained' sx={{
                                    borderRadius: 4
                                }}>
                                    {isLoggedIn ? 'Explore Dashboard' :
                                        'Login'}
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </div>
    )
}

export default HomeWrapper