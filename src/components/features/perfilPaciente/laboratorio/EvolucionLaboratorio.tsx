import { Card, CardContent, Typography, Box, Grid, Chip, Stack } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material/styles';

interface LaboratorioData {
  evaluacion_ocupacional_laboratorio: {
    laboratorio: Array<{
      fecha_evaluacion: string;
      bioquimica: {
        glucosa: {
          valor: number;
          estado: string;
        };
        colesterol_total: {
          valor: number;
          estado: string;
        };
        creatinina: {
          valor: number;
          estado: string;
        };
      };
      hemograma: {
        hemoglobina: {
          valor: number;
          estado: string;
        };
      };
    }>;
  };
}

interface Props {
  datos: LaboratorioData[];
}

export default function EvolucionLaboratorio({ datos }: Props) {
    const theme = useTheme();
    const evaluaciones = datos[0]?.evaluacion_ocupacional_laboratorio?.laboratorio || [];

    const evolucionData = evaluaciones.map((evaluacion) => ({
        fecha: new Date(evaluacion.fecha_evaluacion).toLocaleDateString('es-ES', {
            month: 'short',
            year: 'numeric'
        }),
        glucosa: evaluacion.bioquimica.glucosa.valor,
        colesterol: evaluacion.bioquimica.colesterol_total.valor,
        creatinina: evaluacion.bioquimica.creatinina.valor,
        hemoglobina: evaluacion.hemograma.hemoglobina.valor,
        glucosaEstado: evaluacion.bioquimica.glucosa.estado,
        colesterolEstado: evaluacion.bioquimica.colesterol_total.estado,
        creatininaEstado: evaluacion.bioquimica.creatinina.estado,
        hemoglobinaEstado: evaluacion.hemograma.hemoglobina.estado
    })).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

    const calcularTendencia = (valores: number[]) => {
        if (valores.length < 2) return { tendencia: 'estable', variacion: '0%' };
        
        const primer = valores[0];
        const ultimo = valores[valores.length - 1];
        const variacion = ((ultimo - primer) / primer) * 100;
        
        let tendencia = 'estable';
        if (Math.abs(variacion) > 5) {
            tendencia = variacion > 0 ? 'aumentando' : 'disminuyendo';
        }
        
        return {
            tendencia,
            variacion: `${variacion > 0 ? '+' : ''}${variacion.toFixed(1)}%`
        };
    };

    const tendenciasData = [
        {
            parametro: 'Glucosa',
            valores: evolucionData.map(d => d.glucosa),
            ...calcularTendencia(evolucionData.map(d => d.glucosa))
        },
        {
            parametro: 'Colesterol',
            valores: evolucionData.map(d => d.colesterol),
            ...calcularTendencia(evolucionData.map(d => d.colesterol))
        },
        {
            parametro: 'Creatinina',
            valores: evolucionData.map(d => d.creatinina),
            ...calcularTendencia(evolucionData.map(d => d.creatinina))
        },
        {
            parametro: 'Hemoglobina',
            valores: evolucionData.map(d => d.hemoglobina),
            ...calcularTendencia(evolucionData.map(d => d.hemoglobina))
        }
    ];

    const getTendenciaColor = (tendencia: string) => {
        switch (tendencia) {
            case 'estable': return 'success';
            case 'aumentando': return 'warning';
            case 'disminuyendo': return 'info';
            case 'critico': return 'error';
            default: return 'default';
        }
    };

    const getTendenciaIcon = (tendencia: string) => {
        switch (tendencia) {
            case 'estable': return '→';
            case 'aumentando': return '↗';
            case 'disminuyendo': return '↘';
            case 'critico': return '⚠';
            default: return '→';
        }
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Evolución de Laboratorio
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={8}>
                        <Typography variant="subtitle2" gutterBottom>
                            Tendencias Temporales
                        </Typography>
                        <Box sx={{ height: 280, width: '100%' }}>
                            <LineChart
                                series={[
                                    {
                                        data: evolucionData.map(d => d.glucosa),
                                        label: 'Glucosa (mg/dL)',
                                        color: theme.palette.primary.main,
                                    },
                                    {
                                        data: evolucionData.map(d => d.colesterol),
                                        label: 'Colesterol (mg/dL)',
                                        color: theme.palette.warning.main,
                                    },
                                    {
                                        data: evolucionData.map(d => d.creatinina),
                                        label: 'Creatinina (mg/dL)',
                                        color: theme.palette.success.main,
                                    },
                                    {
                                        data: evolucionData.map(d => d.hemoglobina),
                                        label: 'Hemoglobina (g/dL)',
                                        color: theme.palette.error.main,
                                    }
                                ]}
                                xAxis={[{
                                    data: evolucionData.map(d => d.fecha),
                                    scaleType: 'point',
                                }]}
                                height={260}
                                margin={{ left: 80, right: 80, top: 20, bottom: 60 }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={4}>
                        <Typography variant="subtitle2" gutterBottom>
                            Análisis de Tendencias
                        </Typography>
                        <Stack spacing={2}>
                            {tendenciasData.map((item, index) => (
                                <Box key={index} sx={{ 
                                    p: 2, 
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: 1,
                                    bgcolor: 'background.paper'
                                }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" fontWeight="bold">
                                            {item.parametro}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="body2">
                                                {getTendenciaIcon(item.tendencia)}
                                            </Typography>
                                            <Chip
                                                label={item.variacion}
                                                color={getTendenciaColor(item.tendencia) as any}
                                                size="small"
                                            />
                                        </Box>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                        {item.tendencia.charAt(0).toUpperCase() + item.tendencia.slice(1)}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
