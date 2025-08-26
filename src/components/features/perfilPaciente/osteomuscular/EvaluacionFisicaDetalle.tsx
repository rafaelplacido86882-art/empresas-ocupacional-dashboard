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
import { BarChart } from '@mui/x-charts/BarChart';
import type { OsteomuscularData } from '../../../../mock/osteomuscular.mock';

interface EvaluacionFisicaDetalleProps {
  datos: OsteomuscularData[];
}

export default function EvaluacionFisicaDetalle({ datos }: EvaluacionFisicaDetalleProps) {
  const theme = useTheme();

  const ultimaEvaluacion = datos[datos.length - 1];

  const evaluarColumnaVertebral = (columna: any) => {
    let problemas = 0;
    
    Object.values(columna.curvasFisiologicas).forEach((valor: any) => {
      if (valor !== 'normal') problemas++;
    });
    
    Object.values(columna.ejeLateral).forEach((valor: any) => {
      if (valor !== 'normal') problemas++;
    });

    Object.values(columna.movilidadDolor).forEach((segmento: any) => {
      Object.values(segmento).forEach((movimiento: any) => {
        if (movimiento === true) problemas++;
      });
    });

    Object.values(columna.palpacion).forEach((segmento: any) => {
      Object.values(segmento).forEach((hallazgo: any) => {
        if (hallazgo === true) problemas++;
      });
    });

    return problemas;
  };

  const evaluarExtremidades = (extremidades: any) => {
    let problemas = 0;
    
    Object.values(extremidades).forEach((extremidad: any) => {
      Object.values(extremidad).forEach((lado: any) => {
        Object.values(lado).forEach((valor: any) => {
          if (valor === '+') problemas++;
        });
      });
    });

    return problemas;
  };

  const datosRadar = ultimaEvaluacion ? [
    {
      categoria: 'Columna Cervical',
      puntuacion: ultimaEvaluacion.examenFisicoOsteomuscular.columnaVertebral.curvasFisiologicas.cervical === 'normal' ? 10 : 
                 ultimaEvaluacion.examenFisicoOsteomuscular.columnaVertebral.curvasFisiologicas.cervical === 'alterada' ? 5 : 7,
    },
    {
      categoria: 'Columna Dorsal', 
      puntuacion: ultimaEvaluacion.examenFisicoOsteomuscular.columnaVertebral.curvasFisiologicas.dorsal === 'normal' ? 10 :
                 ultimaEvaluacion.examenFisicoOsteomuscular.columnaVertebral.curvasFisiologicas.dorsal === 'alterada' ? 5 : 7,
    },
    {
      categoria: 'Columna Lumbar',
      puntuacion: ultimaEvaluacion.examenFisicoOsteomuscular.columnaVertebral.curvasFisiologicas.lumbar === 'normal' ? 10 :
                 ultimaEvaluacion.examenFisicoOsteomuscular.columnaVertebral.curvasFisiologicas.lumbar === 'alterada' ? 5 : 7,
    },
    {
      categoria: 'Muñecas',
      puntuacion: (ultimaEvaluacion.examenFisicoOsteomuscular.extremidades.munecas.testPhalen.derecho === '-' &&
                  ultimaEvaluacion.examenFisicoOsteomuscular.extremidades.munecas.testPhalen.izquierdo === '-' &&
                  ultimaEvaluacion.examenFisicoOsteomuscular.extremidades.munecas.testTinel.derecho === '-' &&
                  ultimaEvaluacion.examenFisicoOsteomuscular.extremidades.munecas.testTinel.izquierdo === '-') ? 10 : 5,
    },
    {
      categoria: 'Codos',
      puntuacion: (ultimaEvaluacion.examenFisicoOsteomuscular.extremidades.codos.varo.derecho === '-' &&
                  ultimaEvaluacion.examenFisicoOsteomuscular.extremidades.codos.varo.izquierdo === '-' &&
                  ultimaEvaluacion.examenFisicoOsteomuscular.extremidades.codos.valgo.derecho === '-' &&
                  ultimaEvaluacion.examenFisicoOsteomuscular.extremidades.codos.valgo.izquierdo === '-') ? 10 : 5,
    },
    {
      categoria: 'Pies',
      puntuacion: (ultimaEvaluacion.examenFisicoOsteomuscular.extremidades.pies.cavo.derecho === '-' &&
                  ultimaEvaluacion.examenFisicoOsteomuscular.extremidades.pies.cavo.izquierdo === '-' &&
                  ultimaEvaluacion.examenFisicoOsteomuscular.extremidades.pies.plano.derecho === '-' &&
                  ultimaEvaluacion.examenFisicoOsteomuscular.extremidades.pies.plano.izquierdo === '-') ? 10 : 5,
    }
  ] : [];

  const problemasColumna = ultimaEvaluacion ? evaluarColumnaVertebral(ultimaEvaluacion.examenFisicoOsteomuscular.columnaVertebral) : 0;
  const problemasExtremidades = ultimaEvaluacion ? evaluarExtremidades(ultimaEvaluacion.examenFisicoOsteomuscular.extremidades) : 0;

  const estadoGeneral = {
    columna: problemasColumna === 0 ? 'Normal' : problemasColumna <= 3 ? 'Alteraciones leves' : 'Alteraciones significativas',
    extremidades: problemasExtremidades === 0 ? 'Normal' : problemasExtremidades <= 2 ? 'Alteraciones leves' : 'Alteraciones significativas',
    colorColumna: problemasColumna === 0 ? 'success' : problemasColumna <= 3 ? 'warning' : 'error',
    colorExtremidades: problemasExtremidades === 0 ? 'success' : problemasExtremidades <= 2 ? 'warning' : 'error'
  };

  const detalleColumna = ultimaEvaluacion ? [
    {
      titulo: 'Curvas Fisiológicas',
      items: Object.entries(ultimaEvaluacion.examenFisicoOsteomuscular.columnaVertebral.curvasFisiologicas).map(([region, estado]) => ({
        nombre: region.charAt(0).toUpperCase() + region.slice(1),
        estado: estado as string,
        normal: estado === 'normal'
      }))
    },
    {
      titulo: 'Eje Lateral',
      items: Object.entries(ultimaEvaluacion.examenFisicoOsteomuscular.columnaVertebral.ejeLateral).map(([region, estado]) => ({
        nombre: region.charAt(0).toUpperCase() + region.slice(1),
        estado: estado as string,
        normal: estado === 'normal'
      }))
    },
    {
      titulo: 'Movilidad y Dolor',
      items: Object.entries(ultimaEvaluacion.examenFisicoOsteomuscular.columnaVertebral.movilidadDolor).map(([segmento, movimientos]) => ({
        segmento: segmento.charAt(0).toUpperCase() + segmento.slice(1),
        movimientos: Object.entries(movimientos as any).filter(([_, valor]) => valor === true).map(([mov, _]) => mov)
      })).filter(item => item.movimientos.length > 0)
    },
    {
      titulo: 'Palpación',
      items: Object.entries(ultimaEvaluacion.examenFisicoOsteomuscular.columnaVertebral.palpacion).map(([segmento, hallazgos]) => ({
        segmento: segmento.charAt(0).toUpperCase() + segmento.slice(1),
        hallazgos: Object.entries(hallazgos as any).filter(([_, valor]) => valor === true).map(([hallazgo, _]) => hallazgo)
      })).filter(item => item.hallazgos.length > 0)
    }
  ] : [];

  const detalleExtremidades = ultimaEvaluacion ? 
    Object.entries(ultimaEvaluacion.examenFisicoOsteomuscular.extremidades).map(([extremidad, datos]) => ({
      extremidad: extremidad.charAt(0).toUpperCase() + extremidad.slice(1),
      hallazgos: Object.entries(datos as any).map(([test, lados]) => ({
        test: test.charAt(0).toUpperCase() + test.slice(1),
        resultados: Object.entries(lados as any).filter(([_, resultado]) => resultado === '+').map(([lado, _]) => lado)
      })).filter(hallazgo => hallazgo.resultados.length > 0)
    })).filter(item => item.hallazgos.length > 0) : [];

  const antecedentesMedicos = ultimaEvaluacion?.evaluacionMusculoesqueletica.antecedentesMedicosPositivos.filter(
    antecedente => antecedente.diagnostico && antecedente.diagnostico !== ""
  ) || [];

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Stack spacing={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estado General
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Columna Vertebral
                  </Typography>
                  <Chip
                    label={estadoGeneral.columna}
                    color={estadoGeneral.colorColumna as any}
                    sx={{ width: '100%' }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    {problemasColumna} problema{problemasColumna !== 1 ? 's' : ''} detectado{problemasColumna !== 1 ? 's' : ''}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Extremidades
                  </Typography>
                  <Chip
                    label={estadoGeneral.extremidades}
                    color={estadoGeneral.colorExtremidades as any}
                    sx={{ width: '100%' }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    {problemasExtremidades} problema{problemasExtremidades !== 1 ? 's' : ''} detectado{problemasExtremidades !== 1 ? 's' : ''}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {antecedentesMedicos.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Antecedentes Médicos
                </Typography>
                <Stack spacing={1}>
                  {antecedentesMedicos.map((antecedente, index) => (
                    <Box key={index} sx={{ p: 1.5, bgcolor: 'background.default', borderRadius: 1 }}>
                      <Typography variant="body2" fontWeight="medium">
                        {antecedente.diagnostico}
                      </Typography>
                      {antecedente.fecha && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          Fecha: {antecedente.fecha}
                        </Typography>
                      )}
                      {antecedente.tratamiento && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          Tratamiento: {antecedente.tratamiento}
                        </Typography>
                      )}
                      {antecedente.comentarios && antecedente.comentarios !== "NINGUNO" && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          {antecedente.comentarios}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <Stack spacing={3}>
          {datosRadar.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Evaluación por Segmentos Corporales
                </Typography>
                <Box sx={{ height: 400 }}>
                  <BarChart
                    series={[{
                      data: datosRadar.map(item => item.puntuacion),
                      label: 'Puntuación',
                      color: theme.palette.primary.main
                    }]}
                    xAxis={[{
                      scaleType: 'band',
                      data: datosRadar.map(item => item.categoria),
                    }]}
                    height={350}
                    margin={{ top: 50, bottom: 100, left: 80, right: 50 }}
                  />
                </Box>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Detalle de Columna Vertebral
              </Typography>
              <Stack spacing={1}>
                {detalleColumna.map((seccion, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle2">{seccion.titulo}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {seccion.titulo === 'Curvas Fisiológicas' || seccion.titulo === 'Eje Lateral' ? (
                        <Stack spacing={1}>
                          {(seccion.items as any[]).map((item, idx) => (
                            <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="body2">{item.nombre}</Typography>
                              <Chip
                                label={item.estado}
                                size="small"
                                color={item.normal ? 'success' : 'warning'}
                                variant="outlined"
                              />
                            </Box>
                          ))}
                        </Stack>
                      ) : (
                        <Stack spacing={1}>
                          {(seccion.items as any[]).map((item, idx) => (
                            <Box key={idx}>
                              <Typography variant="body2" fontWeight="medium" gutterBottom>
                                {seccion.titulo === 'Movilidad y Dolor' ? item.segmento : item.segmento}
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {(seccion.titulo === 'Movilidad y Dolor' ? item.movimientos : item.hallazgos).map((elemento: string, elemIdx: number) => (
                                  <Chip
                                    key={elemIdx}
                                    label={elemento}
                                    size="small"
                                    color="error"
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                            </Box>
                          ))}
                        </Stack>
                      )}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {detalleExtremidades.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Hallazgos en Extremidades
                </Typography>
                <Stack spacing={1}>
                  {detalleExtremidades.map((extremidad, index) => (
                    <Accordion key={index}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle2">{extremidad.extremidad}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack spacing={1}>
                          {extremidad.hallazgos.map((hallazgo, idx) => (
                            <Box key={idx}>
                              <Typography variant="body2" fontWeight="medium" gutterBottom>
                                {hallazgo.test}
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {hallazgo.resultados.map((lado, ladoIdx) => (
                                  <Chip
                                    key={ladoIdx}
                                    label={lado.charAt(0).toUpperCase() + lado.slice(1)}
                                    size="small"
                                    color="warning"
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                            </Box>
                          ))}
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
