import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Chip, Divider } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { useTheme } from '@mui/material/styles';

interface SignosVitalesProps {
    data: any[];
}

const SignosVitales: React.FC<SignosVitalesProps> = ({ data }) => {
    const theme = useTheme();
    
    const evolucionSignos = Object.keys(data[0].examenes_anuales).sort().map(año => {
        const examen = data[0].examenes_anuales[año];
        return {
            año: parseInt(año),
            presionSistolica: examen.signos_vitales.presion_sistolica,
            presionDiastolica: examen.signos_vitales.presion_diastolica,
            frecuenciaCardiaca: examen.signos_vitales.frecuencia_cardiaca,
            frecuenciaRespiratoria: examen.signos_vitales.frecuencia_respiratoria,
            saturacionOxigeno: examen.signos_vitales.saturacion_oxigeno,
            temperatura: examen.signos_vitales.temperatura
        };
    });

    const ultimaEvaluacion = evolucionSignos[evolucionSignos.length - 1];

    const getPresionColor = (sistolica: number, diastolica: number): 'success' | 'warning' | 'error' => {
        if (sistolica >= 140 || diastolica >= 90) return 'error';
        if (sistolica >= 130 || diastolica >= 80) return 'warning';
        return 'success';
    };

    const getFrecuenciaCardiacaColor = (fc: number): 'success' | 'warning' | 'error' => {
        if (fc < 60 || fc > 100) return 'warning';
        if (fc < 50 || fc > 110) return 'error';
        return 'success';
    };

    const getSaturacionColor = (sat: number): 'success' | 'warning' | 'error' => {
        if (sat >= 96) return 'success';
        if (sat >= 92) return 'warning';
        return 'error';
    };

    const getTemperaturaColor = (temp: number): 'success' | 'warning' | 'error' => {
        if (temp >= 36.0 && temp <= 37.5) return 'success';
        if (temp >= 35.5 && temp <= 38.0) return 'warning';
        return 'error';
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Signos Vitales
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={8}>
                        <Typography variant="subtitle2" gutterBottom>
                            Evolución de Signos Vitales
                        </Typography>
                        <Box sx={{ height: 300, width: '100%' }}>
                            <LineChart
                                series={[
                                    {
                                        data: evolucionSignos.map(e => e.presionSistolica),
                                        label: 'Presión Sistólica',
                                        color: theme.palette.error.main
                                    },
                                    {
                                        data: evolucionSignos.map(e => e.presionDiastolica),
                                        label: 'Presión Diastólica',
                                        color: theme.palette.warning.main
                                    },
                                    {
                                        data: evolucionSignos.map(e => e.frecuenciaCardiaca),
                                        label: 'Frecuencia Cardíaca',
                                        color: theme.palette.primary.main
                                    }
                                ]}
                                xAxis={[{
                                    data: evolucionSignos.map(e => e.año),
                                    scaleType: 'point'
                                }]}
                                height={300}
                            />
                        </Box>
                    </Grid>

                    <Grid size={4}>
                        <Typography variant="subtitle2" gutterBottom>
                            Valores Actuales
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ height: 120 }}>
                                <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
                                    Saturación O₂
                                </Typography>
                                <Gauge
                                    value={ultimaEvaluacion.saturacionOxigeno}
                                    valueMin={85}
                                    valueMax={100}
                                    height={120}
                                    text={`${ultimaEvaluacion.saturacionOxigeno}%`}
                                />
                            </Box>
                            <Box sx={{ height: 120 }}>
                                <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
                                    Temperatura
                                </Typography>
                                <Gauge
                                    value={ultimaEvaluacion.temperatura}
                                    valueMin={35}
                                    valueMax={40}
                                    height={120}
                                    text={`${ultimaEvaluacion.temperatura}°C`}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Box>
                    <Typography variant="subtitle2" gutterBottom>
                        Estado Actual de Signos Vitales
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <Box sx={{ 
                                p: 2, 
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                bgcolor: 'background.paper'
                            }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="body2" fontWeight="medium">
                                        Presión Arterial
                                    </Typography>
                                    <Chip
                                        label={getPresionColor(ultimaEvaluacion.presionSistolica, ultimaEvaluacion.presionDiastolica) === 'success' ? 'NORMAL' : 
                                              getPresionColor(ultimaEvaluacion.presionSistolica, ultimaEvaluacion.presionDiastolica) === 'warning' ? 'ELEVADA' : 'ALTA'}
                                        color={getPresionColor(ultimaEvaluacion.presionSistolica, ultimaEvaluacion.presionDiastolica) as any}
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="h6" color="primary">
                                    {ultimaEvaluacion.presionSistolica}/{ultimaEvaluacion.presionDiastolica} mmHg
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid size={6}>
                            <Box sx={{ 
                                p: 2, 
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                bgcolor: 'background.paper'
                            }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="body2" fontWeight="medium">
                                        Frecuencia Cardíaca
                                    </Typography>
                                    <Chip
                                        label={getFrecuenciaCardiacaColor(ultimaEvaluacion.frecuenciaCardiaca) === 'success' ? 'NORMAL' : 'ANORMAL'}
                                        color={getFrecuenciaCardiacaColor(ultimaEvaluacion.frecuenciaCardiaca) as any}
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="h6" color="primary">
                                    {ultimaEvaluacion.frecuenciaCardiaca} lat/min
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid size={6}>
                            <Box sx={{ 
                                p: 2, 
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                bgcolor: 'background.paper'
                            }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="body2" fontWeight="medium">
                                        Saturación O₂
                                    </Typography>
                                    <Chip
                                        label={getSaturacionColor(ultimaEvaluacion.saturacionOxigeno) === 'success' ? 'NORMAL' : 
                                              getSaturacionColor(ultimaEvaluacion.saturacionOxigeno) === 'warning' ? 'BAJA' : 'CRÍTICA'}
                                        color={getSaturacionColor(ultimaEvaluacion.saturacionOxigeno) as any}
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="h6" color="primary">
                                    {ultimaEvaluacion.saturacionOxigeno}%
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid size={6}>
                            <Box sx={{ 
                                p: 2, 
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                bgcolor: 'background.paper'
                            }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="body2" fontWeight="medium">
                                        Temperatura
                                    </Typography>
                                    <Chip
                                        label={getTemperaturaColor(ultimaEvaluacion.temperatura) === 'success' ? 'NORMAL' : 'ANORMAL'}
                                        color={getTemperaturaColor(ultimaEvaluacion.temperatura) as any}
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="h6" color="primary">
                                    {ultimaEvaluacion.temperatura}°C
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SignosVitales;
