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
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

interface ComparativoEspirometricoProps {
  datos: any[];
}

export default function ComparativoEspirometrico({ datos }: ComparativoEspirometricoProps) {
  const theme = useTheme();

  const examenes = datos[0]?.examenes || [];
  const fechas = examenes.map((examen: any) => new Date(examen.fecha).getFullYear()).reverse();

  const calcularPorcentajes = () => {
    return examenes.map((examen: any) => ({
      año: new Date(examen.fecha).getFullYear(),
      fvc_predicho: parseInt(examen.valores_espirometricos.fvc2),
      fev_predicho: parseInt(examen.valores_espirometricos.fev2),
      fev_fvc_predicho: parseInt(examen.valores_espirometricos.fev_fvc2),
      fef_predicho: parseInt(examen.valores_espirometricos.fef2),
      pef_predicho: parseInt(examen.valores_espirometricos.pef3),
      grado: examen.evaluacion.grado,
      conclusion: examen.evaluacion.conclusion
    })).reverse();
  };

  const porcentajesEvolucion = calcularPorcentajes();

  const seriesComparacion = [
    {
      label: 'FVC % Predicho',
      data: porcentajesEvolucion.map((d: any) => d.fvc_predicho),
      color: theme.palette.primary.main
    },
    {
      label: 'FEV1 % Predicho',
      data: porcentajesEvolucion.map((d: any) => d.fev_predicho),
      color: theme.palette.secondary.main
    },
    {
      label: 'FEV1/FVC % Predicho',
      data: porcentajesEvolucion.map((d: any) => d.fev_fvc_predicho),
      color: theme.palette.error.main
    },
    {
      label: 'FEF % Predicho',
      data: porcentajesEvolucion.map((d: any) => d.fef_predicho),
      color: theme.palette.warning.main
    },
    {
      label: 'PEF % Predicho',
      data: porcentajesEvolucion.map((d: any) => d.pef_predicho),
      color: theme.palette.info.main
    }
  ];

  const ultimoExamen = porcentajesEvolucion[porcentajesEvolucion.length - 1];
  const primerExamen = porcentajesEvolucion[0];

  const clasificarPorcentaje = (porcentaje: number) => {
    if (porcentaje >= 100) return { nivel: 'Normal', color: 'success' };
    if (porcentaje >= 80) return { nivel: 'Leve reducción', color: 'warning' };
    if (porcentaje >= 60) return { nivel: 'Moderada reducción', color: 'error' };
    return { nivel: 'Severa reducción', color: 'error' };
  };

  const analisisComparativo = ultimoExamen ? {
    fvc: {
      actual: ultimoExamen.fvc_predicho,
      inicial: primerExamen?.fvc_predicho || 0,
      cambio: ultimoExamen.fvc_predicho - (primerExamen?.fvc_predicho || 0),
      clasificacion: clasificarPorcentaje(ultimoExamen.fvc_predicho)
    },
    fev: {
      actual: ultimoExamen.fev_predicho,
      inicial: primerExamen?.fev_predicho || 0,
      cambio: ultimoExamen.fev_predicho - (primerExamen?.fev_predicho || 0),
      clasificacion: clasificarPorcentaje(ultimoExamen.fev_predicho)
    },
    fev_fvc: {
      actual: ultimoExamen.fev_fvc_predicho,
      inicial: primerExamen?.fev_fvc_predicho || 0,
      cambio: ultimoExamen.fev_fvc_predicho - (primerExamen?.fev_fvc_predicho || 0),
      clasificacion: clasificarPorcentaje(ultimoExamen.fev_fvc_predicho)
    },
    fef: {
      actual: ultimoExamen.fef_predicho,
      inicial: primerExamen?.fef_predicho || 0,
      cambio: ultimoExamen.fef_predicho - (primerExamen?.fef_predicho || 0),
      clasificacion: clasificarPorcentaje(ultimoExamen.fef_predicho)
    },
    pef: {
      actual: ultimoExamen.pef_predicho,
      inicial: primerExamen?.pef_predicho || 0,
      cambio: ultimoExamen.pef_predicho - (primerExamen?.pef_predicho || 0),
      clasificacion: clasificarPorcentaje(ultimoExamen.pef_predicho)
    }
  } : null;

  const evolucionGrados = porcentajesEvolucion.map((d: any) => ({
    año: d.año,
    grado: d.grado,
    gradoNumerico: d.grado === 'A' ? 4 : d.grado === 'B' ? 3 : d.grado === 'C' ? 2 : 1
  }));

  const estadisticasGenerales = {
    promedioFVC: porcentajesEvolucion.reduce((sum: number, d: any) => sum + d.fvc_predicho, 0) / porcentajesEvolucion.length,
    promedioFEV: porcentajesEvolucion.reduce((sum: number, d: any) => sum + d.fev_predicho, 0) / porcentajesEvolucion.length,
    mejorAño: porcentajesEvolucion.reduce((mejor: any, actual: any) => 
      (actual.fvc_predicho + actual.fev_predicho) > (mejor.fvc_predicho + mejor.fev_predicho) ? actual : mejor
    ),
    gradosMasComunes: (() => {
      const conteo: { [key: string]: number } = {};
      porcentajesEvolucion.forEach((d: any) => {
        conteo[d.grado] = (conteo[d.grado] || 0) + 1;
      });
      return Object.entries(conteo).sort(([,a], [,b]) => b - a);
    })()
  };

  const parametrosClaves = analisisComparativo ? [
    {
      nombre: 'FVC',
      porcentaje: analisisComparativo.fvc.actual,
      cambio: analisisComparativo.fvc.cambio,
      clasificacion: analisisComparativo.fvc.clasificacion,
      descripcion: 'Capacidad Vital Forzada'
    },
    {
      nombre: 'FEV1',
      porcentaje: analisisComparativo.fev.actual,
      cambio: analisisComparativo.fev.cambio,
      clasificacion: analisisComparativo.fev.clasificacion,
      descripcion: 'Volumen Espiratorio Forzado en 1s'
    },
    {
      nombre: 'FEV1/FVC',
      porcentaje: analisisComparativo.fev_fvc.actual,
      cambio: analisisComparativo.fev_fvc.cambio,
      clasificacion: analisisComparativo.fev_fvc.clasificacion,
      descripcion: 'Índice de Tiffeneau'
    },
    {
      nombre: 'FEF',
      porcentaje: analisisComparativo.fef.actual,
      cambio: analisisComparativo.fef.cambio,
      clasificacion: analisisComparativo.fef.clasificacion,
      descripcion: 'Flujo Espiratorio Forzado'
    },
    {
      nombre: 'PEF',
      porcentaje: analisisComparativo.pef.actual,
      cambio: analisisComparativo.pef.cambio,
      clasificacion: analisisComparativo.pef.clasificacion,
      descripcion: 'Flujo Espiratorio Pico'
    }
  ] : [];

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 8 }}>
        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Evolución de Porcentajes Predichos
              </Typography>
              <Box sx={{ height: 400 }}>
                <LineChart
                  xAxis={[{
                    data: fechas,
                    label: 'Año',
                    tickInterval: fechas,
                  }]}
                  series={seriesComparacion}
                  height={350}
                  margin={{ left: 80, right: 80, top: 40, bottom: 80 }}
                  yAxis={[{
                    min: 50,
                    max: 130,
                    label: '% Predicho'
                  }]}
                />
              </Box>
              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  <strong>Referencia:</strong> ≥100% Normal | 80-99% Reducción Leve | 60-79% Reducción Moderada | &lt;60% Reducción Severa
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Evolución de Grados de Evaluación
              </Typography>
              <Box sx={{ height: 300 }}>
                <BarChart
                  xAxis={[{
                    scaleType: 'band',
                    data: evolucionGrados.map((d: any) => d.año),
                    label: 'Año'
                  }]}
                  series={[{
                    label: 'Grado de Evaluación',
                    data: evolucionGrados.map((d: any) => d.gradoNumerico),
                    color: theme.palette.secondary.main
                  }]}
                  height={270}
                  margin={{ left: 60, right: 20, top: 20, bottom: 60 }}
                  yAxis={[{
                    min: 0,
                    max: 5
                  }]}
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
                Comparativo Actual vs Inicial
              </Typography>
              <Stack spacing={2}>
                {parametrosClaves.map((param) => (
                  <Box key={param.nombre} sx={{ p: 1.5, bgcolor: 'background.default', borderRadius: 1 }}>
                    <Typography variant="body2" fontWeight="medium" gutterBottom>
                      {param.nombre}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      {param.descripcion}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {param.porcentaje}%
                      </Typography>
                      <Chip
                        label={param.clasificacion.nivel}
                        size="small"
                        color={param.clasificacion.color as any}
                        variant="outlined"
                      />
                    </Box>
                    
                    {Math.abs(param.cambio) > 0 && (
                      <Typography variant="caption" color="text.secondary">
                        Cambio: {param.cambio > 0 ? '+' : ''}{param.cambio}% desde el inicial
                      </Typography>
                    )}
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estadísticas Generales
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Promedio FVC Histórico
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {estadisticasGenerales.promedioFVC.toFixed(0)}%
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Promedio FEV1 Histórico
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {estadisticasGenerales.promedioFEV.toFixed(0)}%
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Mejor Año Registrado
                  </Typography>
                  <Chip
                    label={`${estadisticasGenerales.mejorAño.año} (Grado ${estadisticasGenerales.mejorAño.grado})`}
                    color="success"
                    sx={{ width: '100%' }}
                  />
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Distribución de Grados
                  </Typography>
                  <Stack spacing={0.5}>
                    {estadisticasGenerales.gradosMasComunes.map(([grado, cantidad]) => (
                      <Box key={grado} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">Grado {grado}</Typography>
                        <Chip
                          label={`${cantidad} vez${cantidad !== 1 ? 'es' : ''}`}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Interpretación Clínica
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ p: 1, bgcolor: 'success.light', borderRadius: 1 }}>
                  <Typography variant="caption" fontWeight="medium" display="block">
                    Normal: FEV1/FVC ≥ 70% y FEV1 ≥ 80%
                  </Typography>
                </Box>
                <Box sx={{ p: 1, bgcolor: 'warning.light', borderRadius: 1 }}>
                  <Typography variant="caption" fontWeight="medium" display="block">
                    Obstructivo: FEV1/FVC &lt; 70%
                  </Typography>
                </Box>
                <Box sx={{ p: 1, bgcolor: 'error.light', borderRadius: 1 }}>
                  <Typography variant="caption" fontWeight="medium" display="block">
                    Restrictivo: FVC &lt; 80% y FEV1/FVC ≥ 70%
                  </Typography>
                </Box>
                <Box sx={{ p: 1, bgcolor: 'info.light', borderRadius: 1 }}>
                  <Typography variant="caption" fontWeight="medium" display="block">
                    Mixto: FVC &lt; 80% y FEV1/FVC &lt; 70%
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
