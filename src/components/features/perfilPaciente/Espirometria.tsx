import { Grid, Box } from '@mui/material';
import { espirometriaMockData } from '../../../mock/espirometria.mock';
import {
    ValoresEspirometricosEvolucion,
    DiagnosticosEspirometriaTabla,
    FactoresRiesgoAntecedentes,
    DatosFisicosEvolucion,
    ComparativoEspirometrico
} from './espirometria/index';

export default function Espirometria() {

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <ValoresEspirometricosEvolucion datos={espirometriaMockData} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <ComparativoEspirometrico datos={espirometriaMockData} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <DatosFisicosEvolucion datos={espirometriaMockData} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <FactoresRiesgoAntecedentes datos={espirometriaMockData} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <DiagnosticosEspirometriaTabla datos={espirometriaMockData} />
                </Grid>
            </Grid>
        </Box>
    )
}