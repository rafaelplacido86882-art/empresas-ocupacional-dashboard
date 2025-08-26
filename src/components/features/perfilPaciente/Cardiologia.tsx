import { Grid, Box } from '@mui/material';
import { cardiologiaMockData } from '../../../mock/cardiologia.mock';
import {
    PresionArterialEvolucion,
    DiagnosticosCardiologiaTabla,
    AntecedentesCardiovasculares,
    ElectrocardiogramaEvolucion,
    SintomasExamenFisico,
    ResumenCardiovascular
} from './cardiologia/index';

export default function Cardiologia() {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <ResumenCardiovascular datos={cardiologiaMockData} />
                </Grid>

                <Grid size={{ xs: 12, lg: 6 }}>
                    <PresionArterialEvolucion datos={cardiologiaMockData} />
                </Grid>

                <Grid size={{ xs: 12, lg: 6 }}>
                    <ElectrocardiogramaEvolucion datos={cardiologiaMockData} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <AntecedentesCardiovasculares datos={cardiologiaMockData} />
                </Grid>

                <Grid size={{ xs: 12, lg: 6 }}>
                    <SintomasExamenFisico datos={cardiologiaMockData} />
                </Grid>

                <Grid size={{ xs: 12, lg: 6 }}>
                    <DiagnosticosCardiologiaTabla datos={cardiologiaMockData} />
                </Grid>
            </Grid>
        </Box>
    );
}
