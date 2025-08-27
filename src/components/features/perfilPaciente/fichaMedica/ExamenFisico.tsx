import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

interface ExamenFisicoProps {
    data: any[];
}

const ExamenFisico: React.FC<ExamenFisicoProps> = ({ data }) => {
    const theme = useTheme();
    
    const evolucionExamen = Object.keys(data[0].examenes_anuales).sort().map(año => {
        const examen = data[0].examenes_anuales[año];
        return {
            año: parseInt(año),
            examenFisico: examen.examen_fisico
        };
    });


    const evolucionHallazgos = evolucionExamen.map(evaluacion => {
        const sistemas = Object.keys(evaluacion.examenFisico);
        let normales = 0;
        let anormales = 0;

        sistemas.forEach(sistema => {
            const hallazgos = evaluacion.examenFisico[sistema];
            if (typeof hallazgos === 'object') {
                Object.values(hallazgos).forEach(hallazgo => {
                    if (typeof hallazgo === 'string') {
                        if (hallazgo.toLowerCase().includes('normal') || 
                            hallazgo.toLowerCase().includes('sin alteraciones') ||
                            hallazgo.toLowerCase().includes('adecuad')) {
                            normales++;
                        } else {
                            anormales++;
                        }
                    }
                });
            }
        });

        return {
            año: evaluacion.año,
            normales,
            anormales,
            total: normales + anormales
        };
    });

    const estadoActual = evolucionHallazgos[evolucionHallazgos.length - 1];
    const pieData = [
        { id: 0, value: estadoActual.normales, label: 'Normal', color: theme.palette.success.main },
        { id: 1, value: estadoActual.anormales, label: 'Alterado', color: theme.palette.error.main }
    ];

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Examen Físico
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={8}>
                        <Typography variant="subtitle2" gutterBottom>
                            Evolución de Hallazgos
                        </Typography>
                        <Box sx={{ height: 300, width: '100%' }}>
                            <BarChart
                                series={[
                                    {
                                        data: evolucionHallazgos.map(e => e.normales),
                                        label: 'Hallazgos Normales',
                                        color: theme.palette.success.main
                                    },
                                    {
                                        data: evolucionHallazgos.map(e => e.anormales),
                                        label: 'Hallazgos Alterados',
                                        color: theme.palette.error.main
                                    }
                                ]}
                                xAxis={[{
                                    data: evolucionHallazgos.map(e => e.año),
                                    scaleType: 'band'
                                }]}
                                height={300}
                            />
                        </Box>
                    </Grid>

                    <Grid size={4}>
                        <Typography variant="subtitle2" gutterBottom>
                            Estado Actual
                        </Typography>
                        <Box sx={{ height: 300, width: '100%' }}>
                            <PieChart
                                series={[{
                                    data: pieData,
                                    highlightScope: { fade: 'global', highlight: 'item' }
                                }]}
                                height={300}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ExamenFisico;
