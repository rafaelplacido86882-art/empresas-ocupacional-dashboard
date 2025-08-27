import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Chip, Divider } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

interface DiagnosticosAptitudProps {
    data: any[];
}

const DiagnosticosAptitud: React.FC<DiagnosticosAptitudProps> = ({ data }) => {
    const theme = useTheme();
    
    const evolucionDiagnosticos = Object.keys(data[0].examenes_anuales).sort().map(año => {
        const examen = data[0].examenes_anuales[año];
        return {
            año: parseInt(año),
            diagnosticos: examen.diagnosticos,
            aptitud: examen.aptitud
        };
    });
    const evolucionAptitud = evolucionDiagnosticos.map(evaluacion => ({
        año: evaluacion.año,
        aptitud: evaluacion.aptitud,
        valor: evaluacion.aptitud === 'APTO' ? 1 : 
               evaluacion.aptitud === 'APTO_CON_RESTRICCIONES' ? 0.5 : 0
    }));

    const aptitudData = [
        { 
            id: 0, 
            value: evolucionAptitud.filter(e => e.aptitud === 'APTO').length, 
            label: 'Apto', 
            color: theme.palette.success.main 
        },
        { 
            id: 1, 
            value: evolucionAptitud.filter(e => e.aptitud === 'APTO_CON_RESTRICCIONES').length, 
            label: 'Apto con Restricciones', 
            color: theme.palette.warning.main 
        },
        { 
            id: 2, 
            value: evolucionAptitud.filter(e => e.aptitud === 'NO_APTO').length, 
            label: 'No Apto', 
            color: theme.palette.error.main 
        }
    ].filter(item => item.value > 0);

    const getAptitudColor = (aptitud: string): 'success' | 'warning' | 'error' => {
        switch (aptitud) {
            case 'APTO': return 'success';
            case 'APTO_CON_RESTRICCIONES': return 'warning';
            case 'NO_APTO': return 'error';
            default: return 'warning';
        }
    };

    const getAptitudLabel = (aptitud: string): string => {
        switch (aptitud) {
            case 'APTO': return 'APTO';
            case 'APTO_CON_RESTRICCIONES': return 'APTO CON RESTRICCIONES';
            case 'NO_APTO': return 'NO APTO';
            default: return aptitud;
        }
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Diagnósticos y Aptitud Laboral
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={8}>
                        <Typography variant="subtitle2" gutterBottom>
                            Evolución de Aptitud Laboral
                        </Typography>
                        <Box sx={{ height: 300, width: '100%' }}>
                            <BarChart
                                series={[
                                    {
                                        data: evolucionAptitud.map(e => e.valor),
                                        label: 'Nivel de Aptitud',
                                        color: theme.palette.primary.main
                                    }
                                ]}
                                xAxis={[{
                                    data: evolucionAptitud.map(e => e.año),
                                    scaleType: 'band'
                                }]}
                                yAxis={[{
                                    min: 0,
                                    max: 1,
                                    tickNumber: 3
                                }]}
                                height={300}
                            />
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                            * 1.0 = Apto, 0.5 = Apto con Restricciones, 0.0 = No Apto
                        </Typography>
                    </Grid>

                    <Grid size={4}>
                        <Typography variant="subtitle2" gutterBottom>
                            Distribución de Aptitud
                        </Typography>
                        <Box sx={{ height: 300, width: '100%' }}>
                            <PieChart
                                series={[{
                                    data: aptitudData,
                                    highlightScope: { fade: 'global', highlight: 'item' }
                                }]}
                                height={300}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />
                <Box>
                    <Typography variant="subtitle2" gutterBottom>
                        Historial de Evaluaciones
                    </Typography>
                    <Grid container spacing={1}>
                        {evolucionDiagnosticos.map((evaluacion, index) => (
                            <Grid size={6} key={index}>
                                <Box sx={{ 
                                    p: 2, 
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: 1,
                                    bgcolor: 'background.paper'
                                }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Typography variant="body2" fontWeight="medium">
                                            Evaluación {evaluacion.año}
                                        </Typography>
                                        <Chip
                                            label={getAptitudLabel(evaluacion.aptitud)}
                                            color={getAptitudColor(evaluacion.aptitud) as any}
                                            size="small"
                                        />
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                        {evaluacion.diagnosticos.principales?.length || 0} diagnósticos principales
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Box sx={{ 
                        flex: 1,
                        p: 2, 
                        bgcolor: 'info.lighter', 
                        borderRadius: 1,
                        border: `1px solid ${theme.palette.info.light}`
                    }}>
                        <Typography variant="body2" fontWeight="medium" color="info.main" gutterBottom>
                            Total de Evaluaciones
                        </Typography>
                        <Typography variant="h6" color="info.main">
                            {evolucionDiagnosticos.length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Desde {evolucionDiagnosticos[0].año}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default DiagnosticosAptitud;
