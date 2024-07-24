import React from "react"
import Button from '@mui/material/Button';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function Login(props){

    return (
        <Grid2 container spacing = {4} alignItems={"center"} justifyContent={'center'}>
            <Grid2 item>
                <Button sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                    minWidth: 300,
                }}>Continue with Spotify</Button>
            </Grid2>
            
            <Grid2 item>
                <Button sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                    minWidth: 300,
                }}>Continue with Youtube Music</Button>
            </Grid2>
        </Grid2>
    )

}