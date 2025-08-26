import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Stack,
  Tooltip
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import type { OsteomuscularData } from '../../../../mock/osteomuscular.mock';

interface RangosArticularesAnalisisProps {
  datos: OsteomuscularData[];
}

export default function RangosArticularesAnalisis({ datos }: RangosArticularesAnalisisProps) {

  const años = datos.map(d => d.anioEvaluacion).sort();
  
  const calcularPuntuacionTotal = (examenArticulaciones: any) => {
    let total = 0;
    Object.values(examenArticulaciones).forEach((articulacion: any) => {
      Object.values(articulacion).forEach((lado: any) => {
        if (typeof lado === 'object' && lado !== null) {
          total += (lado.abduccion || 0) + (lado.aduccion || 0) + (lado.flexion || 0) + 
                   (lado.extension || 0) + (lado.rotacionExterna || 0) + (lado.rotacionInterna || 0);
        }
      });
    });
    return total;
  };

  const calcularProblemasPorArticulacion = (examenArticulaciones: any) => {
    const problemas: { [key: string]: number } = {};
    Object.entries(examenArticulaciones).forEach(([articulacion, datos]: [string, any]) => {
      let totalProblemas = 0;
      Object.values(datos).forEach((lado: any) => {
        if (typeof lado === 'object' && lado !== null) {
          totalProblemas += (lado.abduccion || 0) + (lado.aduccion || 0) + (lado.flexion || 0) + 
                           (lado.extension || 0) + (lado.rotacionExterna || 0) + (lado.rotacionInterna || 0);
        }
      });
      problemas[articulacion] = totalProblemas;
    });
    return problemas;
  };

  const evolucionPuntuaciones = datos.map(d => ({
    año: d.anioEvaluacion,
    puntuacionTotal: calcularPuntuacionTotal(d.examenArticulaciones),
    problemasPorArticulacion: calcularProblemasPorArticulacion(d.examenArticulaciones)
  }));

  const ultimoAño = evolucionPuntuaciones[evolucionPuntuaciones.length - 1];
  const articulaciones = ['hombro', 'codo', 'muneca', 'cadera', 'rodilla', 'tobillo'];

  const seriesData = articulaciones.map(articulacion => ({
    label: articulacion.charAt(0).toUpperCase() + articulacion.slice(1),
    data: evolucionPuntuaciones.map(e => e.problemasPorArticulacion[articulacion] || 0),
    color: `hsl(${articulaciones.indexOf(articulacion) * 60}, 70%, 50%)`
  }));

  const datosResumenArticulaciones = ultimoAño ? 
    articulaciones.map(articulacion => ({
      id: articulacion,
      label: articulacion.charAt(0).toUpperCase() + articulacion.slice(1),
      value: ultimoAño.problemasPorArticulacion[articulacion] || 0,
      color: `hsl(${articulaciones.indexOf(articulacion) * 60}, 70%, 50%)`
    })).filter(item => item.value > 0) : [];

  const calcularSeveridad = (puntuacion: number) => {
    if (puntuacion === 0) return { nivel: 'Normal', color: 'success' };
    if (puntuacion <= 5) return { nivel: 'Leve', color: 'warning' };
    if (puntuacion <= 10) return { nivel: 'Moderado', color: 'error' };
    return { nivel: 'Severo', color: 'error' };
  };

  const severidadActual = ultimoAño ? calcularSeveridad(ultimoAño.puntuacionTotal) : null;

  const obtenerDetalleArticulacion = (datos: any): Array<{movimiento: string, severidad: number}> => {
    const detalles: Array<{movimiento: string, severidad: number}> = [];
    const movimientos = ['abduccion', 'aduccion', 'flexion', 'extension', 'rotacionExterna', 'rotacionInterna'];
    
    movimientos.forEach(movimiento => {
      const valor = datos[movimiento];
      if (valor > 0) {
        detalles.push({
          movimiento: movimiento.charAt(0).toUpperCase() + movimiento.slice(1),
          severidad: valor
        });
      }
    });
    
    return detalles;
  };

  const articulacionesAfectadas = ultimoAño ? 
    Object.entries(ultimoAño.problemasPorArticulacion)
      .filter(([_, value]) => value > 0)
      .map(([articulacion, valor]) => {
        const datosUltimoAño = datos[datos.length - 1];
        const detalles: Array<{lado: string, movimientos: Array<{movimiento: string, severidad: number}>}> = [];
        
        if (datosUltimoAño.examenArticulaciones[articulacion]) {
          Object.entries(datosUltimoAño.examenArticulaciones[articulacion]).forEach(([lado, datosLado]: [string, any]) => {
            const detalleMovimientos = obtenerDetalleArticulacion(datosLado);
            if (detalleMovimientos.length > 0) {
              detalles.push({
                lado: lado.charAt(0).toUpperCase() + lado.slice(1),
                movimientos: detalleMovimientos
              });
            }
          });
        }
        
        return {
          articulacion: articulacion.charAt(0).toUpperCase() + articulacion.slice(1),
          puntuacion: valor,
          severidad: calcularSeveridad(valor),
          detalles
        };
      })
      .sort((a, b) => b.puntuacion - a.puntuacion) : [];

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Evolución de Problemas Articulares por Tipo
              </Typography>
              <Box sx={{ height: 400 }}>
                <BarChart
                  xAxis={[{
                    scaleType: 'band',
                    data: años,
                    label: 'Año'
                  }]}
                  series={seriesData}
                  height={350}
                  margin={{ left: 80, right: 20, top: 20, bottom: 80 }}
                />
              </Box>
            </CardContent>
          </Card>

          {datosResumenArticulaciones.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Distribución Actual de Problemas por Articulación
                </Typography>
                <Box sx={{ height: 300 }}>
                  <PieChart
                    series={[{
                      data: datosResumenArticulaciones,
                    }]}
                    height={250}
                  />
                </Box>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Stack spacing={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estado General
              </Typography>
              {severidadActual && ultimoAño && (
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Puntuación Total
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                      {ultimoAño.puntuacionTotal}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Nivel de Severidad
                    </Typography>
                    <Chip
                      label={severidadActual.nivel}
                      color={severidadActual.color as any}
                      size="medium"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Articulaciones Afectadas
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {articulacionesAfectadas.length}
                    </Typography>
                  </Box>
                </Stack>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Articulaciones Afectadas
              </Typography>
              <Stack spacing={2}>
                {articulacionesAfectadas.length > 0 ? (
                  articulacionesAfectadas.map((item, index) => (
                    <Box key={index} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" fontWeight="medium">
                          {item.articulacion}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" fontWeight="bold">
                            {item.puntuacion}
                          </Typography>
                          <Chip
                            label={item.severidad.nivel}
                            size="small"
                            color={item.severidad.color as any}
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                      
                      {item.detalles.map((detalle, idx) => (
                        <Box key={idx} sx={{ mt: 1 }}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {detalle.lado}:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                            {detalle.movimientos.map((mov: {movimiento: string, severidad: number}, movIdx: number) => (
                              <Tooltip 
                                key={movIdx} 
                                title={`Severidad: ${mov.severidad}`}
                                arrow
                              >
                                <Chip
                                  label={mov.movimiento}
                                  size="small"
                                  variant="outlined"
                                  color={mov.severidad > 2 ? 'error' : mov.severidad > 1 ? 'warning' : 'default'}
                                  sx={{ fontSize: '0.7rem', height: 20 }}
                                />
                              </Tooltip>
                            ))}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No se detectan problemas articulares
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
}
