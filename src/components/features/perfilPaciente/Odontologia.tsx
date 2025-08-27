import { Grid, Box } from '@mui/material';
import {
  FactoresRiesgoEvolucion,
  CondicionesDentalesEvolucion,
  TratamientosComparativo,
  DiagnosticosTabla,
  EvolucionPiezaDental,
  EvolucionOdontograma
} from './odontologia/index';
import { mockDatosOdontologicos } from '../../../mock/odontologia.mock';
import { datosOdontogramaMock } from '../../../mock/odontograma.mock';

export default function Odontologia() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <FactoresRiesgoEvolucion datos={mockDatosOdontologicos} />
        </Grid>
        
        <Grid size={{ xs: 12, lg: 12 }}>
          <CondicionesDentalesEvolucion datos={mockDatosOdontologicos} />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <TratamientosComparativo datos={mockDatosOdontologicos} />
        </Grid>
        
        <Grid size={{ xs: 12, lg: 6 }}>
          <EvolucionPiezaDental datos={mockDatosOdontologicos} />
        </Grid>

        <Grid size={{ xs: 12, lg: 12 }}>
          <DiagnosticosTabla datos={mockDatosOdontologicos} />
        </Grid>

              <Grid size={{ xs: 12, lg: 12 }}>
          <EvolucionOdontograma datos={datosOdontogramaMock} />
        </Grid>
      </Grid>

    </Box>
  );
}