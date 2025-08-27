import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';
import type { Antecedente } from '../../../../mock/antecedentes.mock';

interface VacunasYAgentesProps {
    data: Antecedente[];
}

const VacunasYAgentes: React.FC<VacunasYAgentesProps> = ({ data }) => {
    const theme = useTheme();
    const ultimaEvaluacion = data[data.length - 1];
    
    const vacunasEvolucion = data.map(evaluacion => ({
        año: new Date(evaluacion.fecha_evaluacion).getFullYear(),
        covid: evaluacion.vacunas.filter(v => v.nombre.includes('COVID')).length,
        influenza: evaluacion.vacunas.filter(v => v.nombre.includes('Influenza')).length,
        hepatitis: evaluacion.vacunas.filter(v => v.nombre.includes('Hepatitis')).length
    }));

    const agentesRiesgoDistribucion = ultimaEvaluacion.agentes_riesgo.map((agente, index) => ({
        id: index,
        value: agente.exposicion === 'alta' ? 50 : agente.exposicion === 'media' ? 30 : 20,
        label: agente.tipo,
        color: agente.exposicion === 'alta' ? theme.palette.error.main :
               agente.exposicion === 'media' ? theme.palette.warning.main :
               theme.palette.success.main
    }));

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Vacunas y Agentes de Riesgo
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={6}>
                        <Typography variant="subtitle2" gutterBottom>
                            Evolución de Vacunación
                        </Typography>
                        <Box sx={{ height: 200, width: '100%' }}>
                            <BarChart
                                series={[
                                    {
                                        data: vacunasEvolucion.map(v => v.covid),
                                        label: 'COVID-19',
                                        color: theme.palette.primary.main
                                    },
                                    {
                                        data: vacunasEvolucion.map(v => v.influenza),
                                        label: 'Influenza',
                                        color: theme.palette.secondary.main
                                    },
                                    {
                                        data: vacunasEvolucion.map(v => v.hepatitis),
                                        label: 'Hepatitis B',
                                        color: theme.palette.success.main
                                    }
                                ]}
                                xAxis={[{
                                    data: vacunasEvolucion.map(v => v.año.toString()),
                                    scaleType: 'band'
                                }]}
                                height={200}
                            />
                        </Box>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="subtitle2" gutterBottom>
                            Distribución de Agentes de Riesgo
                        </Typography>
                        <Box sx={{ height: 200, width: '100%' }}>
                            <PieChart
                                series={[{
                                    data: agentesRiesgoDistribucion,
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

export default VacunasYAgentes;
