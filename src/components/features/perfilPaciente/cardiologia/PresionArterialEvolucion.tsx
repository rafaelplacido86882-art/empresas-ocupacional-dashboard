import { Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
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
    }>;
  };
}

interface Props {
  datos: CardiologiaData[];
}

export default function PresionArterialEvolucion({ datos }: Props) {
  const theme = useTheme();

  const datosEvolucion = datos[0]?.evaluacion_ocupacional_cardiologia?.cardiologia?.map((evaluacion) => ({
    fecha: new Date(evaluacion.fecha_evaluacion).toLocaleDateString('es-ES', {
      month: 'short',
      year: 'numeric'
    }),
    sistolica: evaluacion.examen_fisico.presion_arterial.sistolica,
    diastolica: evaluacion.examen_fisico.presion_arterial.diastolica,
    frecuenciaCardiaca: evaluacion.examen_fisico.frecuencia_cardiaca.valor
  })).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()) || [];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Evolución de Presión Arterial y Frecuencia Cardíaca
        </Typography>
        
        <Box sx={{ width: '100%', height: 400 }}>
          <LineChart
            series={[
              {
                data: datosEvolucion.map(d => d.sistolica),
                label: 'Presión Sistólica (mmHg)',
                color: theme.palette.error.main,
              },
              {
                data: datosEvolucion.map(d => d.diastolica),
                label: 'Presión Diastólica (mmHg)',
                color: theme.palette.warning.main,
              },
              {
                data: datosEvolucion.map(d => d.frecuenciaCardiaca),
                label: 'Frecuencia Cardíaca (lat/min)',
                color: theme.palette.primary.main,
              }
            ]}
            xAxis={[{
              data: datosEvolucion.map(d => d.fecha),
              scaleType: 'point',
            }]}
            height={350}
            margin={{ left: 80, right: 80, top: 20, bottom: 80 }}
          />
        </Box>

        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {datosEvolucion.map((dato, index) => (
            <Box key={index} sx={{ 
              minWidth: 200, 
              p: 1, 
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1
            }}>
              <Typography variant="body2" fontWeight="bold">
                {dato.fecha}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                PA: {dato.sistolica}/{dato.diastolica} mmHg
              </Typography>
              <Typography variant="body2" color="text.secondary">
                FC: {dato.frecuenciaCardiaca} lat/min
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
