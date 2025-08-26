import { Card, CardContent, Typography, Box, Chip, Stack, Divider } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material/styles';

interface CardiologiaData {
  evaluacion_ocupacional_cardiologia: {
    cardiologia: Array<{
      fecha_evaluacion: string;
      ecg: {
        fc: {
          valor: number;
          unidad: string;
        };
        ritmo: string;
        intervalo_pr: {
          valor: number;
          unidad: string;
          interpretacion: string;
        };
        intervalo_qrs: {
          valor: number;
          unidad: string;
          interpretacion: string;
        };
        intervalo_qt: {
          valor: number;
          unidad: string;
          interpretacion: string;
        };
        eje_qrs: string;
      };
    }>;
  };
}

interface Props {
  datos: CardiologiaData[];
}

export default function ElectrocardiogramaEvolucion({ datos }: Props) {
  const theme = useTheme();

  const datosECG = datos[0]?.evaluacion_ocupacional_cardiologia?.cardiologia?.map((evaluacion) => ({
    fecha: new Date(evaluacion.fecha_evaluacion).toLocaleDateString('es-ES', {
      month: 'short',
      year: 'numeric'
    }),
    fc: evaluacion.ecg.fc.valor,
    intervaloPR: evaluacion.ecg.intervalo_pr.valor,
    intervaloQRS: evaluacion.ecg.intervalo_qrs.valor,
    intervaloQT: evaluacion.ecg.intervalo_qt.valor,
    ritmo: evaluacion.ecg.ritmo,
    ejeQRS: evaluacion.ecg.eje_qrs,
    interpretacionPR: evaluacion.ecg.intervalo_pr.interpretacion,
    interpretacionQRS: evaluacion.ecg.intervalo_qrs.interpretacion,
    interpretacionQT: evaluacion.ecg.intervalo_qt.interpretacion
  })).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()) || [];

  const getInterpretacionColor = (interpretacion: string) => {
    switch (interpretacion.toLowerCase()) {
      case 'normal':
        return 'success';
      case 'borderline':
      case 'limítrofe':
        return 'warning';
      case 'anormal':
      case 'patológico':
        return 'error';
      default:
        return 'default';
    }
  };

  const getRitmoColor = (ritmo: string) => {
    if (ritmo.toLowerCase().includes('sinusal regular')) return 'success';
    if (ritmo.toLowerCase().includes('extrasístole') || ritmo.toLowerCase().includes('irregular')) return 'warning';
    return 'default';
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Evolución Electrocardiográfica
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Evolución de Intervalos ECG
          </Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <LineChart
              series={[
                {
                  data: datosECG.map(d => d.intervaloPR),
                  label: 'Intervalo PR (ms)',
                  color: theme.palette.primary.main,
                },
                {
                  data: datosECG.map(d => d.intervaloQRS),
                  label: 'Intervalo QRS (ms)',
                  color: theme.palette.secondary.main,
                },
                {
                  data: datosECG.map(d => d.intervaloQT),
                  label: 'Intervalo QT (ms)',
                  color: theme.palette.error.main,
                }
              ]}
              xAxis={[{
                data: datosECG.map(d => d.fecha),
                scaleType: 'point',
              }]}
              height={280}
              margin={{ left: 80, right: 80, top: 20, bottom: 60 }}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Evolución de Frecuencia Cardíaca (ECG)
          </Typography>
          <Box sx={{ width: '100%', height: 200 }}>
            <LineChart
              series={[
                {
                  data: datosECG.map(d => d.fc),
                  label: 'Frecuencia Cardíaca (x/min)',
                  color: theme.palette.warning.main,
                }
              ]}
              xAxis={[{
                data: datosECG.map(d => d.fecha),
                scaleType: 'point',
              }]}
              height={180}
              margin={{ left: 80, right: 80, top: 20, bottom: 60 }}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Detalle por Evaluación
          </Typography>
          <Stack spacing={2}>
            {datosECG.map((dato, index) => (
              <Box key={index} sx={{ 
                p: 2, 
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                bgcolor: 'background.paper'
              }}>
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  {dato.fecha}
                </Typography>
                
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
                  <Chip
                    label={`FC: ${dato.fc} x/min`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={`PR: ${dato.intervaloPR}ms`}
                    color={getInterpretacionColor(dato.interpretacionPR) as any}
                    size="small"
                  />
                  <Chip
                    label={`QRS: ${dato.intervaloQRS}ms`}
                    color={getInterpretacionColor(dato.interpretacionQRS) as any}
                    size="small"
                  />
                  <Chip
                    label={`QT: ${dato.intervaloQT}ms`}
                    color={getInterpretacionColor(dato.interpretacionQT) as any}
                    size="small"
                  />
                </Stack>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip
                    label={dato.ritmo}
                    color={getRitmoColor(dato.ritmo) as any}
                    size="small"
                  />
                  <Chip
                    label={dato.ejeQRS}
                    size="small"
                    variant="outlined"
                  />
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
