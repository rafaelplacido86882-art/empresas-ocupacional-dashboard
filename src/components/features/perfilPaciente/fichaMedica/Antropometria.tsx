import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Chip, Divider } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material/styles';

interface AntropometriaProps {
    data: any[];
}

const Antropometria: React.FC<AntropometriaProps> = ({ data }) => {
    const theme = useTheme();
    
    const evolucionAntropometria = Object.keys(data[0].examenes_anuales).sort().map(año => {
        const examen = data[0].examenes_anuales[año];
        return {
            año: parseInt(año),
            talla: examen.antropometria.talla,
            peso: examen.antropometria.peso,
            imc: examen.antropometria.imc,
            perimetroAbdominal: examen.antropometria.perimetro_abdominal,
            grasa: examen.antropometria.grasa || 0,
            musculo: examen.antropometria.musculo || 0
        };
    });

    const ultimaEvaluacion = evolucionAntropometria[evolucionAntropometria.length - 1];

    const getIMCColor = (imc: number): 'success' | 'warning' | 'error' => {
        if (imc >= 18.5 && imc < 25) return 'success';
        if ((imc >= 25 && imc < 30) || (imc >= 17 && imc < 18.5)) return 'warning';
        return 'error';
    };

    const getIMCLabel = (imc: number): string => {
        if (imc < 18.5) return 'BAJO PESO';
        if (imc < 25) return 'NORMAL';
        if (imc < 30) return 'SOBREPESO';
        return 'OBESIDAD';
    };

    const getPerimetroAbdominalColor = (perimetro: number, genero: string = 'M'): 'success' | 'warning' | 'error' => {
        const limite = genero === 'M' ? 102 : 88;
        if (perimetro < limite - 10) return 'success';
        if (perimetro < limite) return 'warning';
        return 'error';
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Antropometría
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={12}>
                        <Typography variant="subtitle2" gutterBottom>
                            Evolución Peso e IMC
                        </Typography>
                        <Box sx={{ height: 300, width: '100%' }}>
                            <LineChart
                                series={[
                                    {
                                        data: evolucionAntropometria.map(e => e.peso),
                                        label: 'Peso (kg)',
                                        color: theme.palette.primary.main
                                    },
                                    {
                                        data: evolucionAntropometria.map(e => e.imc),
                                        label: 'IMC',
                                        color: theme.palette.secondary.main
                                    }
                                ]}
                                xAxis={[{
                                    data: evolucionAntropometria.map(e => e.año),
                                    scaleType: 'point'
                                }]}
                                height={300}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Box>
                    <Typography variant="subtitle2" gutterBottom>
                        Medidas Antropométricas Actuales
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid size={3}>
                            <Box sx={{ 
                                p: 2, 
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                bgcolor: 'background.paper'
                            }}>
                                <Typography variant="body2" fontWeight="medium" gutterBottom>
                                    Talla
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    {ultimaEvaluacion.talla} cm
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid size={3}>
                            <Box sx={{ 
                                p: 2, 
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                bgcolor: 'background.paper'
                            }}>
                                <Typography variant="body2" fontWeight="medium" gutterBottom>
                                    Peso
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    {ultimaEvaluacion.peso} kg
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid size={3}>
                            <Box sx={{ 
                                p: 2, 
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                bgcolor: 'background.paper'
                            }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="body2" fontWeight="medium">
                                        IMC
                                    </Typography>
                                    <Chip
                                        label={getIMCLabel(ultimaEvaluacion.imc)}
                                        color={getIMCColor(ultimaEvaluacion.imc) as any}
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="h6" color="primary">
                                    {ultimaEvaluacion.imc}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid size={3}>
                            <Box sx={{ 
                                p: 2, 
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                bgcolor: 'background.paper'
                            }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="body2" fontWeight="medium">
                                        P. Abdominal
                                    </Typography>
                                    <Chip
                                        label={getPerimetroAbdominalColor(ultimaEvaluacion.perimetroAbdominal) === 'success' ? 'NORMAL' : 
                                              getPerimetroAbdominalColor(ultimaEvaluacion.perimetroAbdominal) === 'warning' ? 'RIESGO' : 'ALTO'}
                                        color={getPerimetroAbdominalColor(ultimaEvaluacion.perimetroAbdominal) as any}
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="h6" color="primary">
                                    {ultimaEvaluacion.perimetroAbdominal} cm
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box>
                    <Typography variant="subtitle2" gutterBottom>
                        Evolución del Perímetro Abdominal
                    </Typography>
                    <Box sx={{ height: 200, width: '100%' }}>
                        <LineChart
                            series={[
                                {
                                    data: evolucionAntropometria.map(e => e.perimetroAbdominal),
                                    label: 'Perímetro Abdominal (cm)',
                                    color: theme.palette.warning.main,
                                    area: true
                                }
                            ]}
                            xAxis={[{
                                data: evolucionAntropometria.map(e => e.año),
                                scaleType: 'point'
                            }]}
                            height={200}
                        />
                    </Box>
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
                            Tendencia de Peso
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {evolucionAntropometria.length > 1 ? (
                                ultimaEvaluacion.peso > evolucionAntropometria[evolucionAntropometria.length - 2].peso ? 
                                "↗ Incremento" : 
                                ultimaEvaluacion.peso < evolucionAntropometria[evolucionAntropometria.length - 2].peso ? 
                                "↘ Disminución" : "→ Estable"
                            ) : "Datos insuficientes"}
                        </Typography>
                    </Box>
                    
                    <Box sx={{ 
                        flex: 1,
                        p: 2, 
                        bgcolor: 'success.lighter', 
                        borderRadius: 1,
                        border: `1px solid ${theme.palette.success.light}`
                    }}>
                        <Typography variant="body2" fontWeight="medium" color="success.main" gutterBottom>
                            Estado Nutricional
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {getIMCLabel(ultimaEvaluacion.imc)}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Antropometria;
