import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Stack,
  useTheme,
  LinearProgress
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';

interface DatosFisicosEvolucionProps {
  datos: any[];
}

export default function DatosFisicosEvolucion({ datos }: DatosFisicosEvolucionProps) {
  const theme = useTheme();

  const examenes = datos[0]?.examenes || [];
  const fechas = examenes.map((examen: any) => new Date(examen.fecha).getFullYear()).reverse();

  const extraerDatos = () => {
    return examenes.map((examen: any) => ({
      año: new Date(examen.fecha).getFullYear(),
      peso: parseFloat(examen.datos_fisicos.peso.split(' ')[0]),
      talla: parseFloat(examen.datos_fisicos.talla.split(' ')[0]),
      presion_sistolica: parseInt(examen.datos_fisicos.pre_art.split(' / ')[0]),
      presion_diastolica: parseInt(examen.datos_fisicos.pre_art.split(' / ')[1].split(' ')[0]),
      edad: examen.edad
    })).reverse();
  };

  const datosEvolucion = extraerDatos();

  const calcularIMC = (peso: number, talla: number) => {
    const tallaM = talla / 100;
    return peso / (tallaM * tallaM);
  };

  const clasificarIMC = (imc: number) => {
    if (imc < 18.5) return { categoria: 'Bajo peso', color: 'info' };
    if (imc < 25) return { categoria: 'Normal', color: 'success' };
    if (imc < 30) return { categoria: 'Sobrepeso', color: 'warning' };
    return { categoria: 'Obesidad', color: 'error' };
  };

  const clasificarPresion = (sistolica: number, diastolica: number) => {
    if (sistolica < 120 && diastolica < 80) return { categoria: 'Normal', color: 'success' };
    if (sistolica < 130 && diastolica < 80) return { categoria: 'Elevada', color: 'warning' };
    if (sistolica < 140 || diastolica < 90) return { categoria: 'Hipertensión 1', color: 'error' };
    return { categoria: 'Hipertensión 2', color: 'error' };
  };

  const seriesDatos = [
    {
      label: 'Peso (kg)',
      data: datosEvolucion.map((d: any) => d.peso),
      color: theme.palette.primary.main
    },
    {
      label: 'Presión Sistólica',
      data: datosEvolucion.map((d: any) => d.presion_sistolica),
      color: theme.palette.error.main
    },
    {
      label: 'Presión Diastólica',
      data: datosEvolucion.map((d: any) => d.presion_diastolica),
      color: theme.palette.warning.main
    }
  ];

  const imcEvolucion = datosEvolucion.map((d: any) => ({
    año: d.año,
    imc: calcularIMC(d.peso, d.talla)
  }));

  const ultimoExamen = datosEvolucion[datosEvolucion.length - 1];
  const estadisticasActuales = ultimoExamen ? {
    peso: ultimoExamen.peso,
    talla: ultimoExamen.talla,
    imc: calcularIMC(ultimoExamen.peso, ultimoExamen.talla),
    presionSistolica: ultimoExamen.presion_sistolica,
    presionDiastolica: ultimoExamen.presion_diastolica,
    edad: ultimoExamen.edad
  } : null;

  const tendencias = {
    peso: datosEvolucion.length > 1 ? 
      (ultimoExamen.peso - datosEvolucion[0].peso) : 0,
    presionSistolica: datosEvolucion.length > 1 ? 
      (ultimoExamen.presion_sistolica - datosEvolucion[0].presion_sistolica) : 0,
    presionDiastolica: datosEvolucion.length > 1 ? 
      (ultimoExamen.presion_diastolica - datosEvolucion[0].presion_diastolica) : 0
  };

  const getTendenciaColor = (cambio: number) => {
    if (Math.abs(cambio) < 2) return 'success';
    return cambio > 0 ? 'warning' : 'info';
  };

  const rangosSaludables = {
    peso: { min: 65, max: 85 },
    presionSistolica: { min: 90, max: 120 },
    presionDiastolica: { min: 60, max: 80 },
    imc: { min: 18.5, max: 25 }
  };

  const calcularPorcentajeRango = (valor: number, min: number, max: number) => {
    if (valor < min) return (valor / min) * 50;
    if (valor > max) return 50 + ((valor - max) / max) * 50;
    return 50 + ((valor - min) / (max - min)) * 25;
  };

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 8 }}>
        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Evolución de Parámetros Físicos
              </Typography>
              <Box sx={{ height: 350 }}>
                <LineChart
                  xAxis={[{
                    data: fechas,
                    label: 'Año',
                    tickInterval: fechas,
                  }]}
                  series={seriesDatos}
                  height={320}
                  margin={{ left: 80, right: 80, top: 40, bottom: 80 }}
                />
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Evolución del Índice de Masa Corporal (IMC)
              </Typography>
              <Box sx={{ height: 300 }}>
                <BarChart
                  xAxis={[{
                    scaleType: 'band',
                    data: imcEvolucion.map((d: any) => d.año),
                    label: 'Año'
                  }]}
                  series={[{
                    label: 'IMC',
                    data: imcEvolucion.map((d: any) => d.imc),
                    color: theme.palette.secondary.main
                  }]}
                  height={270}
                  margin={{ left: 60, right: 20, top: 20, bottom: 60 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, lg: 4 }}>
        <Stack spacing={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estado Físico Actual
              </Typography>
              {estadisticasActuales && (
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Peso
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h4" fontWeight="bold">
                        {estadisticasActuales.peso} kg
                      </Typography>
                      <Chip
                        label={`${tendencias.peso > 0 ? '+' : ''}${tendencias.peso.toFixed(1)} kg`}
                        size="small"
                        color={getTendenciaColor(tendencias.peso)}
                        variant="outlined"
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={calcularPorcentajeRango(estadisticasActuales.peso, rangosSaludables.peso.min, rangosSaludables.peso.max)}
                      sx={{ mt: 1, height: 6, borderRadius: 3 }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Talla
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {estadisticasActuales.talla} cm
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      IMC
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h4" fontWeight="bold">
                        {estadisticasActuales.imc.toFixed(1)}
                      </Typography>
                      <Chip
                        label={clasificarIMC(estadisticasActuales.imc).categoria}
                        size="small"
                        color={clasificarIMC(estadisticasActuales.imc).color as any}
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={calcularPorcentajeRango(estadisticasActuales.imc, rangosSaludables.imc.min, rangosSaludables.imc.max)}
                      sx={{ mt: 1, height: 6, borderRadius: 3 }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Presión Arterial
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {estadisticasActuales.presionSistolica}/{estadisticasActuales.presionDiastolica}
                    </Typography>
                    <Chip
                      label={clasificarPresion(estadisticasActuales.presionSistolica, estadisticasActuales.presionDiastolica).categoria}
                      size="small"
                      color={clasificarPresion(estadisticasActuales.presionSistolica, estadisticasActuales.presionDiastolica).color as any}
                      sx={{ mt: 0.5 }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Edad
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {estadisticasActuales.edad} años
                    </Typography>
                  </Box>
                </Stack>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tendencias
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Cambio en Peso
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" fontWeight="medium">
                      {tendencias.peso > 0 ? '+' : ''}{tendencias.peso.toFixed(1)} kg
                    </Typography>
                    <Chip
                      label={Math.abs(tendencias.peso) < 2 ? 'Estable' : tendencias.peso > 0 ? 'Aumento' : 'Reducción'}
                      size="small"
                      color={getTendenciaColor(tendencias.peso)}
                      variant="outlined"
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Cambio en Presión Sistólica
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" fontWeight="medium">
                      {tendencias.presionSistolica > 0 ? '+' : ''}{tendencias.presionSistolica} mmHg
                    </Typography>
                    <Chip
                      label={Math.abs(tendencias.presionSistolica) < 5 ? 'Estable' : tendencias.presionSistolica > 0 ? 'Aumento' : 'Reducción'}
                      size="small"
                      color={getTendenciaColor(tendencias.presionSistolica)}
                      variant="outlined"
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Cambio en Presión Diastólica
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" fontWeight="medium">
                      {tendencias.presionDiastolica > 0 ? '+' : ''}{tendencias.presionDiastolica} mmHg
                    </Typography>
                    <Chip
                      label={Math.abs(tendencias.presionDiastolica) < 5 ? 'Estable' : tendencias.presionDiastolica > 0 ? 'Aumento' : 'Reducción'}
                      size="small"
                      color={getTendenciaColor(tendencias.presionDiastolica)}
                      variant="outlined"
                    />
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rangos de Referencia
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="caption" fontWeight="medium" display="block">
                    IMC Normal: 18.5 - 25.0
                  </Typography>
                </Box>
                <Box sx={{ p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="caption" fontWeight="medium" display="block">
                    Presión Normal: &lt;120/80 mmHg
                  </Typography>
                </Box>
                <Box sx={{ p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="caption" fontWeight="medium" display="block">
                    Peso Saludable: 65 - 85 kg
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
}
