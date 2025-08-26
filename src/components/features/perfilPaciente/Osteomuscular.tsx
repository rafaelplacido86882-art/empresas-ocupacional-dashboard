import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { osteouscularMockData } from '../../../mock/osteomuscular.mock';
import {
    SintomasEvolucion,
    RangosArticularesAnalisis,
    DiagnosticosOsteoTabla,
    AptitudCapacidadFisica,
    EvaluacionFisicaDetalle
} from './osteomuscular/index';

export default function Osteomuscular() {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <SintomasEvolucion datos={osteouscularMockData} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <RangosArticularesAnalisis datos={osteouscularMockData} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <AptitudCapacidadFisica datos={osteouscularMockData} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <DiagnosticosOsteoTabla datos={osteouscularMockData} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <EvaluacionFisicaDetalle datos={osteouscularMockData} />
                </Grid>
            </Grid>
        </Box>
    )
}