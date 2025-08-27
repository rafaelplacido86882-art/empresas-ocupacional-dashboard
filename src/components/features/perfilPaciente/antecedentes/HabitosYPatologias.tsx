import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';
import type { Antecedente } from '../../../../mock/antecedentes.mock';

interface HabitosYPatologiasProps {
    data: Antecedente[];
}

const HabitosYPatologias: React.FC<HabitosYPatologiasProps> = ({ data }) => {
    const theme = useTheme();
    const ultimaEvaluacion = data[data.length - 1];
    
    const habitosEvolucion = data.map(evaluacion => ({
        año: new Date(evaluacion.fecha_evaluacion).getFullYear(),
        tabaco: evaluacion.habitos.find(h => h.tipo === 'Tabaco')?.consume ? 1 : 0,
        alcohol: evaluacion.habitos.find(h => h.tipo === 'Alcohol')?.consume ? 1 : 0,
        drogas: evaluacion.habitos.find(h => h.tipo === 'Drogas')?.consume ? 1 : 0
    }));
    
    const patologiasActuales = ultimaEvaluacion.patologias.map((pat, index) => ({
        id: index,
        value: pat.estado === 'activo' ? 40 : pat.estado === 'controlado' ? 35 : 25,
        label: pat.nombre,
        color: pat.estado === 'activo' ? theme.palette.error.main : 
               pat.estado === 'controlado' ? theme.palette.warning.main : 
               theme.palette.success.main
    }));

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Hábitos y Patologías
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={6}>
                        <Typography variant="subtitle2" gutterBottom>
                            Evolución de Hábitos
                        </Typography>
                        <Box sx={{ height: 200, width: '100%' }}>
                            <BarChart
                                series={[
                                    {
                                        data: habitosEvolucion.map(h => h.tabaco),
                                        label: 'Tabaco',
                                        color: theme.palette.error.main
                                    },
                                    {
                                        data: habitosEvolucion.map(h => h.alcohol),
                                        label: 'Alcohol',
                                        color: theme.palette.warning.main
                                    },
                                    {
                                        data: habitosEvolucion.map(h => h.drogas),
                                        label: 'Drogas',
                                        color: theme.palette.error.dark
                                    }
                                ]}
                                xAxis={[{
                                    data: habitosEvolucion.map(h => h.año.toString()),
                                    scaleType: 'band'
                                }]}
                                height={200}
                            />
                        </Box>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="subtitle2" gutterBottom>
                            Distribución de Patologías
                        </Typography>
                        <Box sx={{ height: 200, width: '100%' }}>
                            <PieChart
                                series={[{
                                    data: patologiasActuales,
                                    highlightScope: { fade: 'global', highlight: 'item' },
                                    innerRadius: 30,
                                    outerRadius: 80
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

export default HabitosYPatologias;
