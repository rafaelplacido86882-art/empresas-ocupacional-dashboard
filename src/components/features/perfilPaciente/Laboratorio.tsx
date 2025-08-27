import { Grid, Box } from "@mui/material";
import { laboratorioMockData } from "../../../mock/laboratorio.mock";
import {
  EvolucionLaboratorio,
} from "./laboratorio/index";

export default function Laboratorio() {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <EvolucionLaboratorio datos={laboratorioMockData} />
        </Grid>
      </Grid>
    </Box>
  );
}
