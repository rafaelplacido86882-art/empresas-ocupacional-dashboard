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
import type { OsteomuscularData } from '../../../../mock/osteomuscular.mock';

interface AptitudCapacidadFisicaProps {
  datos: OsteomuscularData[];
}

export default function AptitudCapacidadFisica({ datos }: AptitudCapacidadFisicaProps) {
  const theme = useTheme();

  const años = datos.map(d => d.anioEvaluacion).sort();

  const evolucionAptitud = datos.map(d => ({
    año: d.anioEvaluacion,
    aptitudEspalda: typeof d.examenOsteomuscular.aptitudEspalda.total === 'number' 
      ? d.examenOsteomuscular.aptitudEspalda.total 
      : 0,
    rangosArticulares: typeof d.examenOsteomuscular.rangosArticulares.total === 'number'
      ? d.examenOsteomuscular.rangosArticulares.total
      : 0,
    evaluacionCapacidad: d.examenOsteomuscular.evaluacionCapacidadFisica.resultado,
    observaciones: d.examenOsteomuscular.observaciones
  }));

  const ultimaEvaluacion = evolucionAptitud[evolucionAptitud.length - 1];

  const getColorByScore = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage <= 30) return theme.palette.success.main;
    if (percentage <= 60) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const getScoreLabel = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage <= 30) return 'Excelente';
    if (percentage <= 60) return 'Bueno';
    return 'Necesita atención';
  };

  const componentesAptitudEspalda = datos[datos.length - 1] ? 
    Object.entries(datos[datos.length - 1].examenOsteomuscular.aptitudEspalda)
      .filter(([key, _]) => key !== 'total')
      .map(([componente, datos]: [string, any]) => ({
        componente: componente.charAt(0).toUpperCase() + componente.slice(1).replace(/([A-Z])/g, ' $1'),
        puntuacion: datos.puntuacion || 0,
        observacion: datos.observacion || '',
        maxPuntuacion: 3
      })) : [];

  const componentesRangosArticulares = datos[datos.length - 1] ?
    Object.entries(datos[datos.length - 1].examenOsteomuscular.rangosArticulares)
      .filter(([key, _]) => key !== 'total')
      .map(([componente, datos]: [string, any]) => ({
        componente: componente.charAt(0).toUpperCase() + componente.slice(1).replace(/([A-Z])/g, ' $1'),
        puntuacion: datos.puntuacion || 0,
        dolorContraResistencia: datos.dolorContraResistencia || 'NO',
        maxPuntuacion: 3
      })) : [];

  const seriesEvolucion = [
    {
      label: 'Aptitud Espalda',
      data: evolucionAptitud.map(e => e.aptitudEspalda),
      color: theme.palette.primary.main
    },
    {
      label: 'Rangos Articulares',
      data: evolucionAptitud.map(e => e.rangosArticulares),
      color: theme.palette.secondary.main
    }
  ];

  const capacidadFisicaHistorial = evolucionAptitud.map(e => ({
    año: e.año,
    estado: e.evaluacionCapacidad.toLowerCase().includes('limitacion') || 
           e.evaluacionCapacidad.toLowerCase().includes('limitado') ? 'Con limitaciones' :
           e.evaluacionCapacidad.toLowerCase().includes('normal') ||
           e.evaluacionCapacidad.toLowerCase().includes('sin limitacion') ? 'Sin limitaciones' : 'Evaluación especial'
  }));

  const estadoActualCategoria = ultimaEvaluacion ? (
    ultimaEvaluacion.evaluacionCapacidad.toLowerCase().includes('limitacion') ||
    ultimaEvaluacion.evaluacionCapacidad.toLowerCase().includes('limitado') ? 'warning' :
    ultimaEvaluacion.evaluacionCapacidad.toLowerCase().includes('normal') ||
    ultimaEvaluacion.evaluacionCapacidad.toLowerCase().includes('sin limitacion') ? 'success' : 'info'
  ) : 'default';

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 8 }}>
        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Evolución de Puntuaciones de Aptitud
              </Typography>
              <Box sx={{ height: 350 }}>
                <LineChart
                  xAxis={[{
                    scaleType: 'point',
                    data: años,
                    label: 'Año'
                  }]}
                  series={seriesEvolucion}
                  height={320}
                  margin={{ left: 60, right: 20, top: 20, bottom: 60 }}
                />
              </Box>
            </CardContent>
          </Card>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Componentes Aptitud Espalda
                  </Typography>
                  <Stack spacing={2}>
                    {componentesAptitudEspalda.map((comp) => (
                      <Box key={comp.componente}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {comp.componente}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" fontWeight="bold">
                              {comp.puntuacion}/{comp.maxPuntuacion}
                            </Typography>
                            <Chip
                              label={comp.observacion}
                              size="small"
                              color={comp.puntuacion <= 1 ? 'success' : comp.puntuacion <= 2 ? 'warning' : 'error'}
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(comp.puntuacion / comp.maxPuntuacion) * 100}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: theme.palette.grey[200],
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: getColorByScore(comp.puntuacion, comp.maxPuntuacion),
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Rangos Articulares
                  </Typography>
                  <Stack spacing={2}>
                    {componentesRangosArticulares.map((comp) => (
                      <Box key={comp.componente}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {comp.componente}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" fontWeight="bold">
                              {comp.puntuacion}/{comp.maxPuntuacion}
                            </Typography>
                            <Chip
                              label={comp.dolorContraResistencia === 'SI' ? 'Dolor' : 'Sin dolor'}
                              size="small"
                              color={comp.dolorContraResistencia === 'SI' ? 'error' : 'success'}
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(comp.puntuacion / comp.maxPuntuacion) * 100}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: theme.palette.grey[200],
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: getColorByScore(comp.puntuacion, comp.maxPuntuacion),
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, lg: 4 }}>
        <Stack spacing={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estado Actual
              </Typography>
              {ultimaEvaluacion && (
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Aptitud Espalda Total
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h3" fontWeight="bold">
                        {ultimaEvaluacion.aptitudEspalda}
                      </Typography>
                      <Chip
                        label={getScoreLabel(ultimaEvaluacion.aptitudEspalda, 12)}
                        color={ultimaEvaluacion.aptitudEspalda <= 4 ? 'success' : ultimaEvaluacion.aptitudEspalda <= 8 ? 'warning' : 'error'}
                        size="small"
                      />
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Rangos Articulares Total
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h3" fontWeight="bold">
                        {ultimaEvaluacion.rangosArticulares}
                      </Typography>
                      <Chip
                        label={getScoreLabel(ultimaEvaluacion.rangosArticulares, 12)}
                        color={ultimaEvaluacion.rangosArticulares <= 4 ? 'success' : ultimaEvaluacion.rangosArticulares <= 8 ? 'warning' : 'error'}
                        size="small"
                      />
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Capacidad Física
                    </Typography>
                    <Chip
                      label={ultimaEvaluacion.evaluacionCapacidad}
                      color={estadoActualCategoria as any}
                      sx={{ 
                        width: '100%',
                        '& .MuiChip-label': { 
                          whiteSpace: 'normal',
                          lineHeight: 1.2
                        }
                      }}
                    />
                  </Box>
                </Stack>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Historial de Capacidad
              </Typography>
              <Stack spacing={1}>
                {capacidadFisicaHistorial.length > 0 ? (
                  capacidadFisicaHistorial.map((item) => (
                    <Box 
                      key={item.año}
                      sx={{ 
                        p: 1.5,
                        bgcolor: 'background.default',
                        borderRadius: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant="body2" fontWeight="medium">
                        {item.año}
                      </Typography>
                      <Chip
                        label={item.estado}
                        size="small"
                        color={
                          item.estado === 'Sin limitaciones' ? 'success' :
                          item.estado === 'Con limitaciones' ? 'warning' : 'info'
                        }
                        variant="outlined"
                      />
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No hay datos de capacidad física
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>

          {ultimaEvaluacion?.observaciones && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Observaciones
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  {ultimaEvaluacion.observaciones}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
