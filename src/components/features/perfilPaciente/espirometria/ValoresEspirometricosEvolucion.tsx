import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Stack,
  useTheme
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon
} from '@mui/icons-material';

interface ValoresEspirometricosEvolucionProps {
  datos: any[];
}

export default function ValoresEspirometricosEvolucion({ datos }: ValoresEspirometricosEvolucionProps) {
  const theme = useTheme();

  const examenes = datos[0]?.examenes || [];
  const fechas = examenes.map((examen: any) => new Date(examen.fecha).getFullYear()).reverse();
  
  const seriesData = [
    {
      id: 'fvc',
      label: 'FVC (L)',
      data: examenes.map((examen: any) => parseFloat(examen.valores_espirometricos.fvc)).reverse(),
      color: theme.palette.primary.main,
    },
    {
      id: 'fev',
      label: 'FEV1 (L)',
      data: examenes.map((examen: any) => parseFloat(examen.valores_espirometricos.fev)).reverse(),
      color: theme.palette.secondary.main,
    },
    {
      id: 'fev_fvc',
      label: 'FEV1/FVC (%)',
      data: examenes.map((examen: any) => parseFloat(examen.valores_espirometricos.fev_fvc)).reverse(),
      color: theme.palette.error.main,
    },
    {
      id: 'pef',
      label: 'PEF (L/s)',
      data: examenes.map((examen: any) => parseFloat(examen.valores_espirometricos.pef1)).reverse(),
      color: theme.palette.warning.main,
    }
  ];

  const calcularTendencia = (serie: number[]) => {
    if (serie.length < 2) return 'estable';
    const primer = serie[0];
    const ultimo = serie[serie.length - 1];
    const cambio = ((ultimo - primer) / primer) * 100;
    if (cambio > 2) return 'ascendente';
    if (cambio < -2) return 'descendente';
    return 'estable';
  };

  const getTrendIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'ascendente':
        return <TrendingUpIcon sx={{ color: theme.palette.success.main }} />;
      case 'descendente':
        return <TrendingDownIcon sx={{ color: theme.palette.error.main }} />;
      default:
        return <TrendingFlatIcon sx={{ color: theme.palette.text.secondary }} />;
    }
  };

  const ultimoExamen = examenes[examenes.length - 1];
  const penultimoExamen = examenes[examenes.length - 2];

  const estadisticas = ultimoExamen ? {
    fvc: {
      valor: parseFloat(ultimoExamen.valores_espirometricos.fvc),
      porcentaje: parseInt(ultimoExamen.valores_espirometricos.fvc2),
      tendencia: calcularTendencia(seriesData[0].data)
    },
    fev: {
      valor: parseFloat(ultimoExamen.valores_espirometricos.fev),
      porcentaje: parseInt(ultimoExamen.valores_espirometricos.fev2),
      tendencia: calcularTendencia(seriesData[1].data)
    },
    fev_fvc: {
      valor: parseFloat(ultimoExamen.valores_espirometricos.fev_fvc),
      porcentaje: parseInt(ultimoExamen.valores_espirometricos.fev_fvc2),
      tendencia: calcularTendencia(seriesData[2].data)
    },
    pef: {
      valor: parseFloat(ultimoExamen.valores_espirometricos.pef1),
      porcentaje: parseInt(ultimoExamen.valores_espirometricos.pef3),
      tendencia: calcularTendencia(seriesData[3].data)
    }
  } : null;

  const getColorByPercentage = (porcentaje: number) => {
    if (porcentaje >= 100) return 'success';
    if (porcentaje >= 80) return 'warning';
    return 'error';
  };

  const cambiosSignificativos = estadisticas && penultimoExamen ? [
    {
      parametro: 'FVC',
      actual: estadisticas.fvc.valor,
      anterior: parseFloat(penultimoExamen.valores_espirometricos.fvc),
      cambio: estadisticas.fvc.valor - parseFloat(penultimoExamen.valores_espirometricos.fvc)
    },
    {
      parametro: 'FEV1',
      actual: estadisticas.fev.valor,
      anterior: parseFloat(penultimoExamen.valores_espirometricos.fev),
      cambio: estadisticas.fev.valor - parseFloat(penultimoExamen.valores_espirometricos.fev)
    },
    {
      parametro: 'FEV1/FVC',
      actual: estadisticas.fev_fvc.valor,
      anterior: parseFloat(penultimoExamen.valores_espirometricos.fev_fvc),
      cambio: estadisticas.fev_fvc.valor - parseFloat(penultimoExamen.valores_espirometricos.fev_fvc)
    }
  ].filter(item => Math.abs(item.cambio) > 0.1) : [];

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 8 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Evolución de Valores Espirométricos
            </Typography>
            <Box sx={{ height: 400 }}>
              <LineChart
                xAxis={[{
                  data: fechas,
                  label: 'Año',
                  tickInterval: fechas,
                }]}
                series={seriesData}
                height={350}
                margin={{ left: 80, right: 80, top: 80, bottom: 80 }}
                sx={{ 
                  '& .MuiLineElement-root': {
                    strokeWidth: 3,
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, lg: 4 }}>
        <Stack spacing={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Valores Actuales
              </Typography>
              {estadisticas && (
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      FVC (Capacidad Vital Forzada)
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h4" fontWeight="bold">
                        {estadisticas.fvc.valor}L
                      </Typography>
                      {getTrendIcon(estadisticas.fvc.tendencia)}
                    </Box>
                    <Chip
                      label={`${estadisticas.fvc.porcentaje}% predicho`}
                      color={getColorByPercentage(estadisticas.fvc.porcentaje)}
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      FEV1 (Vol. Espiratorio Forzado)
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h4" fontWeight="bold">
                        {estadisticas.fev.valor}L
                      </Typography>
                      {getTrendIcon(estadisticas.fev.tendencia)}
                    </Box>
                    <Chip
                      label={`${estadisticas.fev.porcentaje}% predicho`}
                      color={getColorByPercentage(estadisticas.fev.porcentaje)}
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      FEV1/FVC (Índice de Tiffeneau)
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h4" fontWeight="bold">
                        {estadisticas.fev_fvc.valor}%
                      </Typography>
                      {getTrendIcon(estadisticas.fev_fvc.tendencia)}
                    </Box>
                    <Chip
                      label={`${estadisticas.fev_fvc.porcentaje}% predicho`}
                      color={getColorByPercentage(estadisticas.fev_fvc.porcentaje)}
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      PEF (Flujo Espiratorio Pico)
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h4" fontWeight="bold">
                        {estadisticas.pef.valor}L/s
                      </Typography>
                      {getTrendIcon(estadisticas.pef.tendencia)}
                    </Box>
                    <Chip
                      label={`${estadisticas.pef.porcentaje}% predicho`}
                      color={getColorByPercentage(estadisticas.pef.porcentaje)}
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Stack>
              )}
            </CardContent>
          </Card>

          {cambiosSignificativos.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Cambios Significativos
                </Typography>
                <Stack spacing={1}>
                  {cambiosSignificativos.map((cambio) => (
                    <Box key={cambio.parametro} sx={{ p: 1.5, bgcolor: 'background.default', borderRadius: 1 }}>
                      <Typography variant="body2" fontWeight="medium">
                        {cambio.parametro}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {cambio.anterior} → {cambio.actual}
                      </Typography>
                      <Chip
                        label={`${cambio.cambio > 0 ? '+' : ''}${cambio.cambio.toFixed(2)}`}
                        size="small"
                        color={cambio.cambio > 0 ? 'success' : 'error'}
                        variant="outlined"
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
