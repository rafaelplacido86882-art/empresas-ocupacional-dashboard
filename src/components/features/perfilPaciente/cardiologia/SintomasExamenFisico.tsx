import { Card, CardContent, Typography, Box, Chip, Stack, Divider } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

interface CardiologiaData {
  evaluacion_ocupacional_cardiologia: {
    cardiologia: Array<{
      fecha_evaluacion: string;
      sintomas: {
        asintomatico: boolean;
        lipotimias: boolean;
        claudicacion_intermitente: boolean;
        dolor_precordial: boolean;
        dnp: boolean;
        palpitaciones: boolean;
        mareos: boolean;
        otros: string;
      };
      examen_fisico: {
        examen_corazon: string;
        otros_hallazgos: string;
      };
    }>;
  };
}

interface Props {
  datos: CardiologiaData[];
}

export default function SintomasExamenFisico({ datos }: Props) {
  const theme = useTheme();

  const evaluaciones = datos[0]?.evaluacion_ocupacional_cardiologia?.cardiologia || [];

  const sintomas = [
    { nombre: 'Asintomático', campo: 'asintomatico' },
    { nombre: 'Lipotimias', campo: 'lipotimias' },
    { nombre: 'Claudicación Intermitente', campo: 'claudicacion_intermitente' },
    { nombre: 'Dolor Precordial', campo: 'dolor_precordial' },
    { nombre: 'Disnea de Esfuerzo', campo: 'dnp' },
    { nombre: 'Palpitaciones', campo: 'palpitaciones' },
    { nombre: 'Mareos', campo: 'mareos' }
  ];

  const conteoSintomas = sintomas.map(sintoma => {
    const count = evaluaciones.filter(evaluacion => evaluacion.sintomas[sintoma.campo as keyof typeof evaluacion.sintomas]).length;
    return {
      sintoma: sintoma.nombre,
      count,
      porcentaje: evaluaciones.length > 0 ? (count / evaluaciones.length) * 100 : 0
    };
  });

  const evaluacionesDetalle = evaluaciones.map((evaluacion) => {
    const sintomasPresentes = sintomas.filter(sintoma => 
      evaluacion.sintomas[sintoma.campo as keyof typeof evaluacion.sintomas]
    );
    
    const esAsintomatico = evaluacion.sintomas.asintomatico;
    const totalSintomas = sintomasPresentes.filter(s => s.campo !== 'asintomatico').length;
    
    return {
      fecha: new Date(evaluacion.fecha_evaluacion).toLocaleDateString('es-ES', {
        month: 'short',
        year: 'numeric'
      }),
      esAsintomatico,
      totalSintomas,
      sintomasPresentes: sintomasPresentes.map(s => s.nombre),
      examenCorazon: evaluacion.examen_fisico.examen_corazon,
      otrosHallazgos: evaluacion.examen_fisico.otros_hallazgos,
      otrosSintomas: evaluacion.sintomas.otros
    };
  }).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

  const getEstadoColor = (esAsintomatico: boolean, totalSintomas: number) => {
    if (esAsintomatico || totalSintomas === 0) return 'success';
    if (totalSintomas <= 2) return 'warning';
    return 'error';
  };

  const getEstadoLabel = (esAsintomatico: boolean, totalSintomas: number) => {
    if (esAsintomatico) return 'Asintomático';
    if (totalSintomas === 0) return 'Sin Síntomas';
    if (totalSintomas <= 2) return 'Síntomas Leves';
    return 'Múltiples Síntomas';
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Síntomas y Examen Físico Cardiovascular
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Prevalencia de Síntomas
          </Typography>
          <Box sx={{ height: 300, width: '100%' }}>
            <BarChart
              series={[{
                data: conteoSintomas.map(s => s.porcentaje),
                label: 'Prevalencia (%)',
                color: theme.palette.info.main,
              }]}
              xAxis={[{
                data: conteoSintomas.map(s => s.sintoma),
                scaleType: 'band',
              }]}
              height={280}
              margin={{ left: 60, right: 20, top: 20, bottom: 120 }}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Evolución Clínica Detallada
          </Typography>
          <Stack spacing={2}>
            {evaluacionesDetalle.map((evaluacion, index) => (
              <Box key={index} sx={{ 
                p: 2, 
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                bgcolor: 'background.paper'
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {evaluacion.fecha}
                  </Typography>
                  <Chip
                    label={getEstadoLabel(evaluacion.esAsintomatico, evaluacion.totalSintomas)}
                    color={getEstadoColor(evaluacion.esAsintomatico, evaluacion.totalSintomas) as any}
                    size="small"
                  />
                </Box>

                {evaluacion.sintomasPresentes.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Síntomas Presentes:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {evaluacion.sintomasPresentes.map((sintoma, idx) => (
                        <Chip
                          key={idx}
                          label={sintoma}
                          size="small"
                          variant="outlined"
                          color={sintoma === 'Asintomático' ? 'success' : 'default'}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}

                {evaluacion.otrosSintomas && evaluacion.otrosSintomas !== 'Ninguno' && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Otros síntomas:</strong> {evaluacion.otrosSintomas}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Examen cardíaco:</strong> {evaluacion.examenCorazon}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Otros hallazgos:</strong> {evaluacion.otrosHallazgos}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
