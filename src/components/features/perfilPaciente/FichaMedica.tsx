import React from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { SignosVitales, Antropometria, ExamenFisico, DiagnosticosAptitud } from './fichaMedica/index';
import { fichaMedicaMockData } from '../../../mock/fichaMedica.mock';

const FichaMedica: React.FC = () => {
    return (
        <Box >
            <Stack spacing={4}>
                <Grid container spacing={3}>
                    <Grid size={12}>
                        <SignosVitales data={fichaMedicaMockData} />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid size={12}>
                        <Antropometria data={fichaMedicaMockData} />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid size={12}>
                        <ExamenFisico data={fichaMedicaMockData} />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid size={12}>
                        <DiagnosticosAptitud data={fichaMedicaMockData} />
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
};

export default FichaMedica;