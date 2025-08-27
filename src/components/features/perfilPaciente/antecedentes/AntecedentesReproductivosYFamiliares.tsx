import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Chip, Stack, Divider } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';
import type { Antecedente } from '../../../../mock/antecedentes.mock';

interface AntecedentesReproductivosYFamiliaresProps {
    data: Antecedente[];
}

const AntecedentesReproductivosYFamiliares: React.FC<AntecedentesReproductivosYFamiliaresProps> = ({ data }) => {
    const theme = useTheme();
    const ultimaEvaluacion = data[data.length - 1];
    
    const familiaresPorParentesco = ultimaEvaluacion.antecedentes_familiares.reduce((acc, familiar) => {
        acc[familiar.parentesco] = (acc[familiar.parentesco] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const familiaresData = Object.entries(familiaresPorParentesco).map(([parentesco, cantidad], index) => ({
        id: index,
        value: cantidad,
        label: parentesco,
        color: [
            theme.palette.primary.main,
            theme.palette.secondary.main,
            theme.palette.warning.main,
            theme.palette.error.main,
            theme.palette.success.main,
            theme.palette.info.main
        ][index % 6]
    }));

    const patologiasFamiliares = data.map(evaluacion => {
        const patologias = evaluacion.antecedentes_familiares.reduce((acc, familiar) => {
            acc[familiar.patologia] = (acc[familiar.patologia] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        return {
            año: new Date(evaluacion.fecha_evaluacion).getFullYear(),
            diabetes: patologias['Diabetes tipo 2'] || 0,
            hipertension: patologias['Hipertensión arterial'] || 0,
            cardiaco: patologias['Infarto al miocardio'] || 0,
            tiroides: patologias['Hipotiroidismo'] || 0
        };
    });

    const getEstadoColor = (estado: string): 'success' | 'error' => {
        return estado === 'vivo' ? 'success' : 'error';
    };

    const getTerapiaColor = (terapia: boolean): 'primary' | 'default' => {
        return terapia ? 'primary' : 'default';
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Antecedentes Reproductivos y Familiares
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={6}>
                        <Typography variant="subtitle2" gutterBottom>
                            Distribución de Antecedentes Familiares
                        </Typography>
                        <Box sx={{ height: 200, width: '100%' }}>
                            <PieChart
                                series={[{
                                    data: familiaresData,
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
                            Evolución de Patologías Familiares
                        </Typography>
                        <Box sx={{ height: 200, width: '100%' }}>
                            <BarChart
                                series={[
                                    {
                                        data: patologiasFamiliares.map(p => p.diabetes),
                                        label: 'Diabetes',
                                        color: theme.palette.error.main
                                    },
                                    {
                                        data: patologiasFamiliares.map(p => p.hipertension),
                                        label: 'Hipertensión',
                                        color: theme.palette.warning.main
                                    },
                                    {
                                        data: patologiasFamiliares.map(p => p.cardiaco),
                                        label: 'Cardíaco',
                                        color: theme.palette.error.dark
                                    },
                                    {
                                        data: patologiasFamiliares.map(p => p.tiroides),
                                        label: 'Tiroides',
                                        color: theme.palette.info.main
                                    }
                                ]}
                                xAxis={[{
                                    data: patologiasFamiliares.map(p => p.año.toString()),
                                    scaleType: 'band'
                                }]}
                                height={200}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {ultimaEvaluacion.antecedentes_reproductivos && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Antecedentes Reproductivos
                        </Typography>
                        <Box sx={{ 
                            p: 2, 
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 1,
                            bgcolor: 'background.paper'
                        }}>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <Stack spacing={1}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Menarquia:</Typography>
                                            <Typography variant="body2" fontWeight="medium">
                                                {ultimaEvaluacion.antecedentes_reproductivos.menarquia} años
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Ciclos regulares:</Typography>
                                            <Chip
                                                label={ultimaEvaluacion.antecedentes_reproductivos.ciclos_regulares ? 'SÍ' : 'NO'}
                                                color={ultimaEvaluacion.antecedentes_reproductivos.ciclos_regulares ? 'success' : 'warning'}
                                                size="small"
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Embarazos:</Typography>
                                            <Typography variant="body2" fontWeight="medium">
                                                {ultimaEvaluacion.antecedentes_reproductivos.embarazos}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Partos:</Typography>
                                            <Typography variant="body2" fontWeight="medium">
                                                {ultimaEvaluacion.antecedentes_reproductivos.partos}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Grid>
                                <Grid size={6}>
                                    <Stack spacing={1}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Abortos:</Typography>
                                            <Typography variant="body2" fontWeight="medium">
                                                {ultimaEvaluacion.antecedentes_reproductivos.abortos}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Cesáreas:</Typography>
                                            <Typography variant="body2" fontWeight="medium">
                                                {ultimaEvaluacion.antecedentes_reproductivos.cesareas}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Lactancia:</Typography>
                                            <Chip
                                                label={ultimaEvaluacion.antecedentes_reproductivos.lactancia ? 'SÍ' : 'NO'}
                                                color={ultimaEvaluacion.antecedentes_reproductivos.lactancia ? 'success' : 'default'}
                                                size="small"
                                            />
                                        </Box>
                                        {ultimaEvaluacion.antecedentes_reproductivos.menopausia && (
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2">Menopausia:</Typography>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {ultimaEvaluacion.antecedentes_reproductivos.menopausia} años
                                                </Typography>
                                            </Box>
                                        )}
                                        {ultimaEvaluacion.antecedentes_reproductivos.terapia_hormonal !== undefined && (
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2">Terapia hormonal:</Typography>
                                                <Chip
                                                    label={ultimaEvaluacion.antecedentes_reproductivos.terapia_hormonal ? 'SÍ' : 'NO'}
                                                    color={getTerapiaColor(ultimaEvaluacion.antecedentes_reproductivos.terapia_hormonal) as any}
                                                    size="small"
                                                />
                                            </Box>
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                )}

                <Box>
                    <Typography variant="subtitle2" gutterBottom>
                        Antecedentes Familiares
                    </Typography>
                    <Stack spacing={1}>
                        {ultimaEvaluacion.antecedentes_familiares.map((familiar, index) => (
                            <Box key={index} sx={{ 
                                p: 2, 
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                bgcolor: 'background.paper'
                            }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="body2" fontWeight="medium">
                                        {familiar.parentesco} - {familiar.patologia}
                                    </Typography>
                                    <Chip
                                        label={familiar.estado.toUpperCase()}
                                        color={getEstadoColor(familiar.estado) as any}
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                    Edad al diagnóstico: {familiar.edad_diagnostico} años
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AntecedentesReproductivosYFamiliares;
