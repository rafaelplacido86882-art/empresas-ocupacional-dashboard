import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import type { Antecedente } from '../../../../mock/antecedentes.mock';

interface SegurosYHorariosProps {
    data: Antecedente[];
}

const SegurosYHorarios: React.FC<SegurosYHorariosProps> = ({ data }) => {
    const theme = useTheme();
    const segurosDistribucion = data.reduce((acc, evaluacion) => {
        const tipo = evaluacion.seguro.tipo;
        acc[tipo] = (acc[tipo] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const segurosData = Object.entries(segurosDistribucion).map(([tipo, cantidad], index) => ({
        id: index,
        value: cantidad,
        label: tipo,
        color: [
            theme.palette.primary.main,
            theme.palette.secondary.main,
            theme.palette.warning.main,
            theme.palette.error.main,
            theme.palette.success.main
        ][index % 5]
    }));

    const horariosEvolucion = data.map(evaluacion => ({
        año: new Date(evaluacion.fecha_evaluacion).getFullYear(),
        horas: evaluacion.horario_trabajo.horas_diarias,
        dias: evaluacion.horario_trabajo.dias_semana,
        extras: evaluacion.horario_trabajo.horas_extras ? 1 : 0
    }));

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Seguros y Horarios de Trabajo
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={6}>
                        <Typography variant="subtitle2" gutterBottom>
                            Distribución de Seguros
                        </Typography>
                        <Box sx={{ height: 200, width: '100%' }}>
                            <PieChart
                                series={[{
                                    data: segurosData,
                                    highlightScope: { fade: 'global', highlight: 'item' },
                                    innerRadius: 30,
                                    outerRadius: 80
                                }]}
                                height={200}
                            />
                        </Box>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="subtitle2" gutterBottom>
                            Evolución de Horarios
                        </Typography>
                        <Box sx={{ height: 200, width: '100%' }}>
                            <BarChart
                                series={[
                                    {
                                        data: horariosEvolucion.map(h => h.horas),
                                        label: 'Horas Diarias',
                                        color: theme.palette.primary.main
                                    },
                                    {
                                        data: horariosEvolucion.map(h => h.dias),
                                        label: 'Días Semana',
                                        color: theme.palette.secondary.main
                                    },
                                    {
                                        data: horariosEvolucion.map(h => h.extras * 2),
                                        label: 'Horas Extras',
                                        color: theme.palette.warning.main
                                    }
                                ]}
                                xAxis={[{
                                    data: horariosEvolucion.map(h => h.año.toString()),
                                    scaleType: 'band'
                                }]}
                                height={200}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SegurosYHorarios;
