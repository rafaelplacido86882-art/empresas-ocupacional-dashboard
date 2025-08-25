import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { SintomasResumen } from './osteomuscular/SintomasResumen';
import { EvolucionArticulaciones } from './osteomuscular/EvolucionArticulaciones';
import { AptitudFisica } from './osteomuscular/AptitudFisica';
import { ExamenColumna } from './osteomuscular/ExamenColumna';
import { DiagnosticosRecomendaciones } from './osteomuscular/DiagnosticosRecomendaciones';
import { osteouscularMockData } from '../../../mock/osteomuscular.mock';

export default function Osteomuscular() {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <SintomasResumen data={osteouscularMockData} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <DiagnosticosRecomendaciones data={osteouscularMockData} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <AptitudFisica data={osteouscularMockData} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <ExamenColumna data={osteouscularMockData} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <EvolucionArticulaciones data={osteouscularMockData} />
                </Grid>
            </Grid>
        </Box>
    )
}