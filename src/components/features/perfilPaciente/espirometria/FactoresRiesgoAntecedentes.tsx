import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Stack,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

interface FactoresRiesgoAntecedentesProps {
  datos: any[];
}

export default function FactoresRiesgoAntecedentes({ datos }: FactoresRiesgoAntecedentesProps) {
  const theme = useTheme();

  const examenes = datos[0]?.examenes || [];

  const analizarFactoresRiesgo = () => {
    const factores = {
      fumador: 0,
      asma: 0,
      tuberculosis: 0,
      exclusiones: 0,
      preEspirometria: 0
    };

    examenes.forEach((examen: any) => {
      if (examen.antecedentes.espiro_fumador === 'S') factores.fumador++;
      if (examen.antecedentes.espiro_asma === 'S') factores.asma++;
      if (examen.antecedentes.espiro_tubercu === 'S') factores.tuberculosis++;

      const exclusionesPositivas = Object.values(examen.preguntas_exclusion).filter(v => v === 'S').length;
      if (exclusionesPositivas > 0) factores.exclusiones++;

      const preEspirometriaPositivas = Object.values(examen.preguntas_pre_espirometria).filter(v => v === 'S').length;
      if (preEspirometriaPositivas > 0) factores.preEspirometria++;
    });

    return factores;
  };

  const analizarPreguntasProfesionales = () => {
    const respuestas: { [key: string]: number } = {};
    
    examenes.forEach((examen: any) => {
      Object.entries(examen.preguntas_profesional).forEach(([pregunta, respuesta]) => {
        if (respuesta === 'S') {
          respuestas[pregunta] = (respuestas[pregunta] || 0) + 1;
        }
      });
    });

    return Object.entries(respuestas)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([pregunta, cantidad]) => ({ pregunta, cantidad }));
  };

  const factoresRiesgo = analizarFactoresRiesgo();
  const preguntasProfesionales = analizarPreguntasProfesionales();

  const datosFactoresRiesgo = [
    {
      id: 'fumador',
      label: 'Fumador',
      value: factoresRiesgo.fumador,
      color: theme.palette.error.main
    },
    {
      id: 'asma',
      label: 'Asma',
      value: factoresRiesgo.asma,
      color: theme.palette.warning.main
    },
    {
      id: 'tuberculosis',
      label: 'Tuberculosis',
      value: factoresRiesgo.tuberculosis,
      color: theme.palette.info.main
    },
    {
      id: 'exclusiones',
      label: 'Criterios Exclusión',
      value: factoresRiesgo.exclusiones,
      color: theme.palette.secondary.main
    }
  ].filter(item => item.value > 0);

  const evolucionFumador = examenes.map((examen: any) => ({
    año: new Date(examen.fecha).getFullYear(),
    fumador: examen.antecedentes.espiro_fumador === 'S' ? 1 : 0,
    asma: examen.antecedentes.espiro_asma === 'S' ? 1 : 0,
    tuberculosis: examen.antecedentes.espiro_tubercu === 'S' ? 1 : 0
  })).reverse();

  const seriesEvolucion = [
    {
      label: 'Fumador',
      data: evolucionFumador.map((e: any) => e.fumador),
      color: theme.palette.error.main
    },
    {
      label: 'Asma',
      data: evolucionFumador.map((e: any) => e.asma),
      color: theme.palette.warning.main
    },
    {
      label: 'Tuberculosis',
      data: evolucionFumador.map((e: any) => e.tuberculosis),
      color: theme.palette.info.main
    }
  ];

  const ultimoExamen = examenes[examenes.length - 1];
  const estadoActual = ultimoExamen ? {
    fumador: ultimoExamen.antecedentes.espiro_fumador === 'S',
    asma: ultimoExamen.antecedentes.espiro_asma === 'S',
    tuberculosis: ultimoExamen.antecedentes.espiro_tubercu === 'S',
    observaciones: ultimoExamen.observaciones.recomendaciones
  } : null;

  const detallePreguntas = ultimoExamen ? [
    {
      categoria: 'Criterios de Exclusión',
      preguntas: Object.entries(ultimoExamen.preguntas_exclusion).map(([key, value]) => ({
        pregunta: key,
        respuesta: value as string,
        positiva: value === 'S'
      }))
    },
    {
      categoria: 'Preguntas Profesionales',
      preguntas: Object.entries(ultimoExamen.preguntas_profesional).map(([key, value]) => ({
        pregunta: key,
        respuesta: value as string,
        positiva: value === 'S'
      }))
    },
    {
      categoria: 'Pre-Espirometría',
      preguntas: Object.entries(ultimoExamen.preguntas_pre_espirometria)
        .filter(([key, _]) => key !== 'cuantos')
        .map(([key, value]) => ({
          pregunta: key,
          respuesta: value as string,
          positiva: value === 'S'
        }))
    }
  ] : [];

  const getRiesgoColor = (tieneRiesgo: boolean) => {
    return tieneRiesgo ? 'error' : 'success';
  };

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Stack spacing={3}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Distribución de Factores de Riesgo
                  </Typography>
                  {datosFactoresRiesgo.length > 0 ? (
                    <Box sx={{ height: 250 }}>
                      <PieChart
                        series={[{
                          data: datosFactoresRiesgo
                        }]}
                        height={220}
                      />
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                      No se detectaron factores de riesgo
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Evolución de Antecedentes
                  </Typography>
                  <Box sx={{ height: 250 }}>
                    <BarChart
                      xAxis={[{
                        scaleType: 'band',
                        data: evolucionFumador.map((e: any) => e.año),
                        label: 'Año'
                      }]}
                      series={seriesEvolucion}
                      height={220}
                      margin={{ left: 60, right: 20, top: 20, bottom: 60 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Detalle de Cuestionarios
              </Typography>
              <Stack spacing={1}>
                {detallePreguntas.map((seccion, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle2">{seccion.categoria}</Typography>
                      <Box sx={{ ml: 2 }}>
                        <Chip
                          label={`${seccion.preguntas.filter(p => p.positiva).length} positivas`}
                          size="small"
                          color={seccion.preguntas.some(p => p.positiva) ? 'warning' : 'success'}
                          variant="outlined"
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={1}>
                        {seccion.preguntas.map((pregunta, idx) => (
                          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                            <Box sx={{ 
                              p: 1, 
                              bgcolor: pregunta.positiva ? 'warning.light' : 'success.light',
                              borderRadius: 1,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}>
                              <Typography variant="caption" fontWeight="medium">
                                {pregunta.pregunta}
                              </Typography>
                              <Chip
                                label={pregunta.respuesta}
                                size="small"
                                color={pregunta.positiva ? 'warning' : 'success'}
                                variant="filled"
                              />
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Stack spacing={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estado Actual de Riesgo
              </Typography>
              {estadoActual && (
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Fumador
                    </Typography>
                    <Chip
                      label={estadoActual.fumador ? 'SÍ' : 'NO'}
                      color={getRiesgoColor(estadoActual.fumador)}
                      sx={{ width: '100%' }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Asma
                    </Typography>
                    <Chip
                      label={estadoActual.asma ? 'SÍ' : 'NO'}
                      color={getRiesgoColor(estadoActual.asma)}
                      sx={{ width: '100%' }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Tuberculosis
                    </Typography>
                    <Chip
                      label={estadoActual.tuberculosis ? 'SÍ' : 'NO'}
                      color={getRiesgoColor(estadoActual.tuberculosis)}
                      sx={{ width: '100%' }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Nivel de Riesgo General
                    </Typography>
                    <Chip
                      label={
                        estadoActual.fumador || estadoActual.asma || estadoActual.tuberculosis 
                          ? 'ALTO' : 'BAJO'
                      }
                      color={
                        estadoActual.fumador || estadoActual.asma || estadoActual.tuberculosis 
                          ? 'error' : 'success'
                      }
                      sx={{ width: '100%', fontWeight: 'bold' }}
                    />
                  </Box>
                </Stack>
              )}
            </CardContent>
          </Card>

          {preguntasProfesionales.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Síntomas Profesionales
                </Typography>
                <Stack spacing={1}>
                  {preguntasProfesionales.map((item) => (
                    <Box key={item.pregunta} sx={{ p: 1.5, bgcolor: 'background.default', borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" fontWeight="medium">
                          {item.pregunta}
                        </Typography>
                        <Chip
                          label={`${item.cantidad}x`}
                          size="small"
                          color="warning"
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          )}

          {estadoActual?.observaciones && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Observaciones
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  {estadoActual.observaciones}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
