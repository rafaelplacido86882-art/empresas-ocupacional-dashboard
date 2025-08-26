import { Card, CardContent, Typography, Box, Grid, Chip, Divider } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';

interface CardiologiaData {
  evaluacion_ocupacional_cardiologia: {
    cardiologia: Array<{
      fecha_evaluacion: string;
      examen_fisico: {
        presion_arterial: {
          sistolica: number;
          diastolica: number;
        };
        frecuencia_cardiaca: {
          valor: number;
        };
      };
      ecg: {
        fc: {
          valor: number;
        };
        ritmo: string;
      };
      aptitud_trabajo_forzado: string;
      aptitud_trabajo_altura: string;
    }>;
  };
}

interface Props {
  datos: CardiologiaData[];
}

export default function ResumenCardiovascular({ datos }: Props) {
  const theme = useTheme();

  const evaluaciones = datos[0]?.evaluacion_ocupacional_cardiologia?.cardiologia || [];

  const datosEvolucion = evaluaciones.map((evaluacion) => ({
    fecha: new Date(evaluacion.fecha_evaluacion).toLocaleDateString('es-ES', {
      month: 'short',
      year: 'numeric'
    }),
    sistolica: evaluacion.examen_fisico.presion_arterial.sistolica,
    diastolica: evaluacion.examen_fisico.presion_arterial.diastolica,
    fcClinica: evaluacion.examen_fisico.frecuencia_cardiaca.valor,
    fcECG: evaluacion.ecg.fc.valor,
    ritmo: evaluacion.ecg.ritmo,
    aptitudForzado: evaluacion.aptitud_trabajo_forzado,
    aptitudAltura: evaluacion.aptitud_trabajo_altura
  })).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

  const distribucionAptitud = {
    forzado: evaluaciones.reduce((acc, evaluacion) => {
      const aptitud = evaluacion.aptitud_trabajo_forzado;
      acc[aptitud] = (acc[aptitud] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    altura: evaluaciones.reduce((acc, evaluacion) => {
      const aptitud = evaluacion.aptitud_trabajo_altura;
      acc[aptitud] = (acc[aptitud] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  const pieDataForzado = Object.entries(distribucionAptitud.forzado).map(([label, value], index) => ({
    id: index,
    value,
    label,
    color: getAptitudColor(label)
  }));

  const pieDataAltura = Object.entries(distribucionAptitud.altura).map(([label, value], index) => ({
    id: index,
    value,
    label,
    color: getAptitudColor(label)
  }));

  function getAptitudColor(aptitud: string) {
    switch (aptitud.toLowerCase()) {
      case 'apto':
        return theme.palette.success.main;
      case 'apto con restricciones':
        return theme.palette.warning.main;
      case 'no apto':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  }

  const clasificacionPA = (sistolica: number, diastolica: number) => {
    if (sistolica < 120 && diastolica < 80) return { label: 'Normal', color: 'success' };
    if (sistolica < 130 && diastolica < 80) return { label: 'Elevada', color: 'info' };
    if ((sistolica >= 130 && sistolica < 140) || (diastolica >= 80 && diastolica < 90)) return { label: 'HTA Grado 1', color: 'warning' };
    if (sistolica >= 140 || diastolica >= 90) return { label: 'HTA Grado 2', color: 'error' };
    return { label: 'Indeterminada', color: 'default' };
  };

  const estadisticasPA = datosEvolucion.map(dato => {
    const clasificacion = clasificacionPA(dato.sistolica, dato.diastolica);
    return {
      ...dato,
      clasificacionPA: clasificacion
    };
  });

  const promedios = {
    sistolica: datosEvolucion.reduce((sum, d) => sum + d.sistolica, 0) / datosEvolucion.length,
    diastolica: datosEvolucion.reduce((sum, d) => sum + d.diastolica, 0) / datosEvolucion.length,
    fcClinica: datosEvolucion.reduce((sum, d) => sum + d.fcClinica, 0) / datosEvolucion.length,
    fcECG: datosEvolucion.reduce((sum, d) => sum + d.fcECG, 0) / datosEvolucion.length
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Resumen Cardiovascular Integral
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="subtitle2" gutterBottom>
              Evolución de Parámetros Vitales
            </Typography>
            <Box sx={{ height: 300, width: '100%' }}>
              <LineChart
                series={[
                  {
                    data: datosEvolucion.map(d => d.sistolica),
                    label: 'Presión Sistólica',
                    color: theme.palette.error.main,
                  },
                  {
                    data: datosEvolucion.map(d => d.diastolica),
                    label: 'Presión Diastólica',
                    color: theme.palette.warning.main,
                  },
                  {
                    data: datosEvolucion.map(d => d.fcClinica),
                    label: 'FC Clínica',
                    color: theme.palette.primary.main,
                  }
                ]}
                xAxis={[{
                  data: datosEvolucion.map(d => d.fecha),
                  scaleType: 'point',
                }]}
                height={280}
                margin={{ left: 80, right: 80, top: 20, bottom: 60 }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle2" gutterBottom>
              Promedios Generales
            </Typography>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2" gutterBottom>
                <strong>PA Promedio:</strong> {Math.round(promedios.sistolica)}/{Math.round(promedios.diastolica)} mmHg
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>FC Clínica:</strong> {Math.round(promedios.fcClinica)} lat/min
              </Typography>
              <Typography variant="body2">
                <strong>FC ECG:</strong> {Math.round(promedios.fcECG)} x/min
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" gutterBottom>
              Distribución Aptitud Trabajo Forzado
            </Typography>
            <Box sx={{ height: 200 }}>
              <PieChart
                series={[{
                  data: pieDataForzado,
                }]}
                height={180}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" gutterBottom>
              Distribución Aptitud Trabajo en Altura
            </Typography>
            <Box sx={{ height: 200 }}>
              <PieChart
                series={[{
                  data: pieDataAltura,
                }]}
                height={180}
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Clasificación de Presión Arterial por Evaluación
          </Typography>
          <Grid container spacing={2}>
            {estadisticasPA.map((dato, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ 
                  p: 2, 
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                  bgcolor: 'background.paper'
                }}>
                  <Typography variant="body2" fontWeight="bold" gutterBottom>
                    {dato.fecha}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    PA: {dato.sistolica}/{dato.diastolica} mmHg
                  </Typography>
                  <Chip
                    label={dato.clasificacionPA.label}
                    color={dato.clasificacionPA.color as any}
                    size="small"
                  />
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    {dato.ritmo}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
