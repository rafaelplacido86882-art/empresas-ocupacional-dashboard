import { Grid, Box } from '@mui/material';
import {
    SegurosYHorarios,
    VacunasYAgentes,
    HabitosYPatologias,
    HistoriaClinicaYRiesgos
} from './antecedentes/index';
import AntecedentesReproductivosYFamiliares from './antecedentes/AntecedentesReproductivosYFamiliares';
import { antecedentesMockData } from '../../../mock/antecedentes.mock';

export default function Antecedentes() {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12}}>
                    <HabitosYPatologias data={antecedentesMockData} />
                </Grid>

                <Grid size={{ xs: 12}}>
                    <SegurosYHorarios data={antecedentesMockData} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <VacunasYAgentes data={antecedentesMockData} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <HistoriaClinicaYRiesgos data={antecedentesMockData} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <AntecedentesReproductivosYFamiliares data={antecedentesMockData} />
                </Grid>
            </Grid>
        </Box>
    );
}