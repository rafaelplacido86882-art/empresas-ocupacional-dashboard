import { Grid, Box } from '@mui/material';
import AntecedentesOftalmologicos from './oftalmologia/AntecedentesOftalmologicos';
import AgudezaVisualLentes from './oftalmologia/AgudezaVisualLentes';
import ExploracionClinica from './oftalmologia/ExploracionClinica';
import HallazgosOculares from './oftalmologia/HallazgosOculares';
import { mockDatosOftalmologicos } from '../../../mock/oftalmologia.mock';

export default function Oftalmologia() {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 6 }}>
                    <AntecedentesOftalmologicos datos={mockDatosOftalmologicos} />
                </Grid>

                <Grid size={{ xs: 12, lg: 6 }}>
                    <AgudezaVisualLentes datos={mockDatosOftalmologicos} />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <ExploracionClinica datos={mockDatosOftalmologicos} />
                </Grid>

                <Grid size={{ xs: 12, lg: 12 }}>
                    <HallazgosOculares datos={mockDatosOftalmologicos} />
                </Grid>
            </Grid>
        </Box>
    );
}
