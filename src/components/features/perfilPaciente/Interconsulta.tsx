import { Box, Grid, Paper } from '@mui/material';
import {
    InterconsultasPorEspecialidad,
    TendenciaInterconsultas,
    HistorialInterconsultas
} from './interconsulta/index'; export default function Interconsulta() {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Paper sx={{ p: 0, height: 400 }}>
                        <InterconsultasPorEspecialidad />
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, lg: 6 }}>
                    <Paper sx={{ p: 0, height: 400 }}>
                        <TendenciaInterconsultas />
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 0}}>
                        <HistorialInterconsultas />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}