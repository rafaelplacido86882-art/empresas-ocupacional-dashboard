import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Stack,
  useTheme
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon
} from '@mui/icons-material';
import type { OsteomuscularData } from '../../../../mock/osteomuscular.mock';

interface SintomasEvolucionProps {
  datos: OsteomuscularData[];
}

export default function SintomasEvolucion({ datos }: SintomasEvolucionProps) {
  const theme = useTheme();

  const años = datos.map(d => d.anioEvaluacion).sort();
  
  const contarSintomas = (data: OsteomuscularData) => {
    const sintomas = data.evaluacionMusculoesqueletica.cuestionarioSintomas;
    return {
      problemas12Meses: Object.values(sintomas).filter(s => s.ultimos12MesesProblemas).length,
      incapacidad12Meses: Object.values(sintomas).filter(s => s.incapacidadUltimos12Meses).length,
      problemas7Dias: Object.values(sintomas).filter(s => s.problemasUltimos7Dias).length
    };
  };

  const seriesData = [
    {
      id: 'problemas12Meses',
      label: 'Problemas últimos 12 meses',
      data: datos.map(d => contarSintomas(d).problemas12Meses),
      color: theme.palette.error.main,
    },
    {
      id: 'incapacidad12Meses',
      label: 'Incapacidad últimos 12 meses',
      data: datos.map(d => contarSintomas(d).incapacidad12Meses),
      color: theme.palette.warning.main,
    },
    {
      id: 'problemas7Dias',
      label: 'Problemas últimos 7 días',
      data: datos.map(d => contarSintomas(d).problemas7Dias),
      color: theme.palette.info.main,
    }
  ];

  const calcularTendencia = (serie: number[]) => {
    if (serie.length < 2) return 'estable';
    const primer = serie[0];
    const ultimo = serie[serie.length - 1];
    if (ultimo > primer) return 'ascendente';
    if (ultimo < primer) return 'descendente';
    return 'estable';
  };

  const getTrendIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'ascendente':
        return <TrendingUpIcon sx={{ color: theme.palette.error.main }} />;
      case 'descendente':
        return <TrendingDownIcon sx={{ color: theme.palette.success.main }} />;
      default:
        return <TrendingFlatIcon sx={{ color: theme.palette.text.secondary }} />;
    }
  };

  const estadisticas = {
    ultimoAño: datos[datos.length - 1] ? contarSintomas(datos[datos.length - 1]) : null,
    tendencias: {
      problemas12Meses: calcularTendencia(seriesData[0].data),
      incapacidad12Meses: calcularTendencia(seriesData[1].data),
      problemas7Dias: calcularTendencia(seriesData[2].data)
    }
  };

  const sintomasPorRegion = datos[datos.length - 1] ? 
    Object.entries(datos[datos.length - 1].evaluacionMusculoesqueletica.cuestionarioSintomas)
      .filter(([_, sintoma]) => sintoma.ultimos12MesesProblemas || sintoma.incapacidadUltimos12Meses || sintoma.problemasUltimos7Dias)
      .map(([region, sintoma]) => ({
        region,
        problemas12Meses: sintoma.ultimos12MesesProblemas,
        incapacidad12Meses: sintoma.incapacidadUltimos12Meses,
        problemas7Dias: sintoma.problemasUltimos7Dias
      })) : [];

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 8 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Evolución de Síntomas Osteomusculares
            </Typography>
            <Box sx={{ height: 400 }}>
              <LineChart
                xAxis={[{
                  data: años,
                  label: 'Año',
                  tickInterval: años,
                }]}
                series={seriesData}
                height={350}
                margin={{ left: 80, right: 80, top: 80, bottom: 80 }}
                sx={{ 
                  '& .MuiLineElement-root': {
                    strokeWidth: 3,
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, lg: 4 }}>
        <Stack spacing={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumen Actual
              </Typography>
              {estadisticas.ultimoAño && (
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Problemas últimos 12 meses
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h4" fontWeight="bold">
                        {estadisticas.ultimoAño.problemas12Meses}
                      </Typography>
                      {getTrendIcon(estadisticas.tendencias.problemas12Meses)}
                    </Box>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Incapacidad últimos 12 meses
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h4" fontWeight="bold">
                        {estadisticas.ultimoAño.incapacidad12Meses}
                      </Typography>
                      {getTrendIcon(estadisticas.tendencias.incapacidad12Meses)}
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Problemas últimos 7 días
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h4" fontWeight="bold">
                        {estadisticas.ultimoAño.problemas7Dias}
                      </Typography>
                      {getTrendIcon(estadisticas.tendencias.problemas7Dias)}
                    </Box>
                  </Box>
                </Stack>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Regiones Afectadas
              </Typography>
              <Stack spacing={1}>
                {sintomasPorRegion.length > 0 ? (
                  sintomasPorRegion.map(({ region, problemas12Meses, incapacidad12Meses, problemas7Dias }) => (
                    <Box key={region} sx={{ p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                      <Typography variant="body2" fontWeight="medium" sx={{ textTransform: 'capitalize' }}>
                        {region.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                        {problemas12Meses && (
                          <Chip
                            label="12M"
                            size="small"
                            color="error"
                            variant="outlined"
                          />
                        )}
                        {incapacidad12Meses && (
                          <Chip
                            label="Inc"
                            size="small"
                            color="warning"
                            variant="outlined"
                          />
                        )}
                        {problemas7Dias && (
                          <Chip
                            label="7D"
                            size="small"
                            color="info"
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No se reportan síntomas en el último año
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
}
