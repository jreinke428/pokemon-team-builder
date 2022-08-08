import { AppBar , Box , Typography } from "@mui/material";

export default function Header(){
    return(
        <Box sx={{flexGrox: 1}}>
            <AppBar position='static'>
                <Typography variant='h6' sx={{m: 2}}>Pokemon Team Builder</Typography>
            </AppBar>
        </Box>
    );
}