import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material/styles';
import type { Antecedente } from '../../../../mock/antecedentes.mock';

interface HistoriaClinicaYRiesgosProps {
    data: Antecedente[];
}

const HistoriaClinicaYRiesgos: React.FC<HistoriaClinicaYRiesgosProps> = ({ data }) => {
    const theme = useTheme();
    const ultimaEvaluacion = data[data.length - 1];
    
    const hospitalizacionesEvolucion = data.map(evaluacion => ({
        año: new Date(evaluacion.fecha_evaluacion).getFullYear(),
        cantidad: evaluacion.historia_clinica.hospitalizaciones.length,
        cirugias: evaluacion.historia_clinica.cirugias.length,
        alergias: evaluacion.historia_clinica.alergias.length,
        medicamentos: evaluacion.historia_clinica.medicamentos_actuales.length
    }));

    const alergiasDistribucion = ultimaEvaluacion.historia_clinica.alergias.map((alergia, index) => ({
        año: `Alergia ${index + 1}`,
        severidad: alergia.severidad === 'severa' ? 3 : alergia.severidad === 'moderada' ? 2 : 1
    }));

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Historia Clínica y Riesgos
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={6}>
                        <Typography variant="subtitle2" gutterBottom>
                            Evolución de Historia Clínica
                        </Typography>
                        <Box sx={{ height: 200, width: '100%' }}>
                            <LineChart
                                series={[
                                    {
                                        data: hospitalizacionesEvolucion.map(h => h.cantidad),
                                        label: 'Hospitalizaciones',
                                        color: theme.palette.error.main
                                    },
                                    {
                                        data: hospitalizacionesEvolucion.map(h => h.cirugias),
                                        label: 'Cirugías',
                                        color: theme.palette.warning.main
                                    },
                                    {
                                        data: hospitalizacionesEvolucion.map(h => h.alergias),
                                        label: 'Alergias',
                                        color: theme.palette.info.main
                                    },
                                    {
                                        data: hospitalizacionesEvolucion.map(h => h.medicamentos),
                                        label: 'Medicamentos',
                                        color: theme.palette.success.main
                                    }
                                ]}
                                xAxis={[{
                                    data: hospitalizacionesEvolucion.map(h => h.año),
                                    scaleType: 'point'
                                }]}
                                height={200}
                            />
                        </Box>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="subtitle2" gutterBottom>
                            Severidad de Alergias
                        </Typography>
                        <Box sx={{ height: 200, width: '100%' }}>
                            <BarChart
                                series={[{
                                    data: alergiasDistribucion.map(a => a.severidad),
                                    label: 'Nivel de Severidad',
                                    color: theme.palette.warning.main
                                }]}
                                xAxis={[{
                                    data: alergiasDistribucion.map(a => a.año),
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

export default HistoriaClinicaYRiesgos;
