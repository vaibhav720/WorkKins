import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Navbar from '../../components/Navbar';
import Grid from '@mui/material/Grid';
import Cards from '../../components/Cards';
import SpeedDialTooltipOpen from '../../components/SppedDail';


export default function News() {
  return (
    <React.Fragment>
        <Navbar/>

      <CssBaseline />
      
      <br/>
      <br/>
      <Container maxWidth="lg">
      <SpeedDialTooltipOpen/>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Cards/>
        </Grid>
        <Grid item xs={4}>
        <Cards/>
        </Grid>
        <Grid item xs={4}>
        <Cards/>
        </Grid>
        <Grid item xs={4}>
        <Cards/>
        </Grid>
        <Grid item xs={4}>
        <Cards/>
        </Grid>
        <Grid item xs={4}>
        <Cards/>
        </Grid>
      </Grid>
    </Box>
      </Container>
    </React.Fragment>
  );
}
