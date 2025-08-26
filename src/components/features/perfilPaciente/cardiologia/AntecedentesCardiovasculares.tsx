import { Card, CardContent, Typography, Box, Chip, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

interface CardiologiaData {
  evaluacion_ocupacional_cardiologia: {
    cardiologia: Array<{
      fecha_evaluacion: string;
      antecedentes: {
        soplos: boolean;
        cansancio_rapido: boolean;
        diabetes: boolean;
        presion_alta: boolean;
        mareos: boolean;
        dislipidemias: boolean;
        dolor_precordial: boolean;
        palpitaciones: boolean;
        varices_mmii: boolean;
        imas: boolean;
        perdida_conciencia: boolean;
        obesidad: boolean;
        tabaquismo: boolean;
        otros: string;
      };
    }>;
  };
}

interface Props {
  datos: CardiologiaData[];
}

export default function AntecedentesCardiovasculares({ datos }: Props) {
  const theme = useTheme();

  const antecedentes = datos[0]?.evaluacion_ocupacional_cardiologia?.cardiologia || [];

  const factoresRiesgo = [
    { nombre: 'Presión Alta', campo: 'presion_alta' },
    { nombre: 'Diabetes', campo: 'diabetes' },
    { nombre: 'Dislipidemias', campo: 'dislipidemias' },
    { nombre: 'Obesidad', campo: 'obesidad' },
    { nombre: 'Tabaquismo', campo: 'tabaquismo' },
    { nombre: 'Dolor Precordial', campo: 'dolor_precordial' },
    { nombre: 'Palpitaciones', campo: 'palpitaciones' },
    { nombre: 'Soplos', campo: 'soplos' },
    { nombre: 'Cansancio Rápido', campo: 'cansancio_rapido' },
    { nombre: 'Mareos', campo: 'mareos' }
  ];

  const conteoFactores = factoresRiesgo.map(factor => {
    const count = antecedentes.filter(ant => ant.antecedentes[factor.campo as keyof typeof ant.antecedentes]).length;
    return {
      factor: factor.nombre,
      count,
      porcentaje: antecedentes.length > 0 ? (count / antecedentes.length) * 100 : 0
    };
  });

  const evaluacionesConAntecedentes = antecedentes.map((evaluacion) => {
    const factoresPresentes = factoresRiesgo.filter(factor => 
      evaluacion.antecedentes[factor.campo as keyof typeof evaluacion.antecedentes]
    );
    
    return {
      fecha: new Date(evaluacion.fecha_evaluacion).toLocaleDateString('es-ES', {
        month: 'short',
        year: 'numeric'
      }),
      totalFactores: factoresPresentes.length,
      factores: factoresPresentes.map(f => f.nombre)
    };
  }).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

  const getRiesgoColor = (totalFactores: number) => {
    if (totalFactores === 0) return 'success';
    if (totalFactores <= 2) return 'warning';
    return 'error';
  };

  const getRiesgoLabel = (totalFactores: number) => {
    if (totalFactores === 0) return 'Sin Riesgo';
    if (totalFactores <= 2) return 'Riesgo Moderado';
    return 'Alto Riesgo';
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Antecedentes Cardiovasculares
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Prevalencia de Factores de Riesgo
          </Typography>
          <Box sx={{ height: 300, width: '100%' }}>
            <BarChart
              series={[{
                data: conteoFactores.map(f => f.porcentaje),
                label: 'Prevalencia (%)',
                color: theme.palette.primary.main,
              }]}
              xAxis={[{
                data: conteoFactores.map(f => f.factor),
                scaleType: 'band',
              }]}
              height={280}
              margin={{ left: 60, right: 20, top: 20, bottom: 100 }}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Evolución del Riesgo Cardiovascular
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {evaluacionesConAntecedentes.map((evaluacion, index) => (
              <Box key={index} sx={{ 
                minWidth: 200, 
                p: 2, 
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                bgcolor: 'background.paper'
              }}>
                <Typography variant="body2" fontWeight="bold">
                  {evaluacion.fecha}
                </Typography>
                <Chip
                  label={getRiesgoLabel(evaluacion.totalFactores)}
                  color={getRiesgoColor(evaluacion.totalFactores) as any}
                  size="small"
                  sx={{ mt: 1, mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Factores: {evaluacion.totalFactores}
                </Typography>
                {evaluacion.factores.length > 0 && (
                  <Typography variant="caption" color="text.secondary">
                    {evaluacion.factores.join(', ')}
                  </Typography>
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
