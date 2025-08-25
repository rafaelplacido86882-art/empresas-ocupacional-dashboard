import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  ButtonGroup,
  Paper,
  Chip,
  Stack,
  useTheme,
  Tooltip
} from '@mui/material';
import {
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
  Circle as CircleIcon,
  Close as CloseIcon,
  Build as BuildIcon,
  Star as StarIcon,
  MedicalServices as MedicalIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useState } from 'react';
import type { DatosOdontograma, PiezaDental, AccionDental } from '../../../../mock/odontograma.mock';

interface EvolucionOdontogramaProps {
  datos: DatosOdontograma;
}

const getEstiloAccion = (codigo: string) => {
  switch (codigo) {
    case "0":
      return {
        color: '#4caf50',
        icon: <CircleIcon sx={{ fontSize: 16 }} />,
        label: 'Sano'
      };
    case "1":
      return {
        color: '#f44336',
        icon: <WarningIcon sx={{ fontSize: 16 }} />,
        label: 'Caries'
      };
    case "2":
      return {
        color: '#2196f3',
        icon: <BuildIcon sx={{ fontSize: 16 }} />,
        label: 'Obturación'
      };
    case "3":
      return {
        color: '#757575',
        icon: <CloseIcon sx={{ fontSize: 16 }} />,
        label: 'Ausente'
      };
    case "4":
      return {
        color: '#ff9800',
        icon: <StarIcon sx={{ fontSize: 16 }} />,
        label: 'Corona'
      };
    case "5":
      return {
        color: '#9c27b0',
        icon: <MedicalIcon sx={{ fontSize: 16 }} />,
        label: 'Endodoncia'
      };
    case "6":
      return {
        color: '#607d8b',
        icon: <BuildIcon sx={{ fontSize: 16 }} />,
        label: 'Implante'
      };
    case "7":
      return {
        color: '#795548',
        icon: <BuildIcon sx={{ fontSize: 16 }} />,
        label: 'Prótesis'
      };
    case "8":
      return {
        color: '#e91e63',
        icon: <WarningIcon sx={{ fontSize: 16 }} />,
        label: 'Fractura'
      };
    default:
      return {
        color: '#9e9e9e',
        icon: <CircleIcon sx={{ fontSize: 16 }} />,
        label: 'Otro'
      };
  }
};

const PiezaDentalComponent = ({ pieza, acciones }: { pieza: number, acciones: AccionDental[] }) => {
  const accion = acciones[0];
  const estilo = getEstiloAccion(accion.codigo);

  return (
    <Tooltip
      title={`Pieza ${pieza}: ${accion.tipo}`}
      placement="top"
    >
      <Paper
        elevation={2}
        sx={{
          width: 50,
          height: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: `2px solid ${estilo.color}`,
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: 3,
          },
        }}
      >
        <Box sx={{ color: estilo.color, mb: 0.5 }}>
          {estilo.icon}
        </Box>
        <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, color: estilo.color }}>
          {pieza}
        </Typography>
      </Paper>
    </Tooltip>
  );
};

export default function EvolucionOdontograma({ datos }: EvolucionOdontogramaProps) {
  const theme = useTheme();
  const [añoSeleccionado, setAñoSeleccionado] = useState(datos.años[datos.años.length - 1]?.año || 2025);

  const odontogramaActual = datos.años.find(año => año.año === añoSeleccionado);

  const organizarPorCuadrantes = (odontograma: PiezaDental[]) => {
    const cuadrantes = {
      superiorDerecho: [] as PiezaDental[], // 11-18
      superiorIzquierdo: [] as PiezaDental[], // 21-28
      inferiorIzquierdo: [] as PiezaDental[], // 31-38
      inferiorDerecho: [] as PiezaDental[], // 41-48
    };

    odontograma.forEach(pieza => {
      const numero = pieza.pieza;
      if (numero >= 11 && numero <= 18) {
        cuadrantes.superiorDerecho.push(pieza);
      } else if (numero >= 21 && numero <= 28) {
        cuadrantes.superiorIzquierdo.push(pieza);
      } else if (numero >= 31 && numero <= 38) {
        cuadrantes.inferiorIzquierdo.push(pieza);
      } else if (numero >= 41 && numero <= 48) {
        cuadrantes.inferiorDerecho.push(pieza);
      }
    });

    cuadrantes.superiorDerecho.sort((a, b) => a.pieza - b.pieza);
    cuadrantes.superiorIzquierdo.sort((a, b) => a.pieza - b.pieza);
    cuadrantes.inferiorIzquierdo.sort((a, b) => a.pieza - b.pieza);
    cuadrantes.inferiorDerecho.sort((a, b) => a.pieza - b.pieza);

    return cuadrantes;
  };

  const calcularEstadisticas = (odontograma: PiezaDental[]) => {
    const conteos: { [key: string]: number } = {};
    odontograma.forEach(pieza => {
      const codigo = pieza.acciones[0]?.codigo || "0";
      conteos[codigo] = (conteos[codigo] || 0) + 1;
    });
    return conteos;
  };

  const navegarAño = (direccion: 'anterior' | 'siguiente') => {
    const indiceActual = datos.años.findIndex(año => año.año === añoSeleccionado);
    if (direccion === 'anterior' && indiceActual > 0) {
      setAñoSeleccionado(datos.años[indiceActual - 1].año);
    } else if (direccion === 'siguiente' && indiceActual < datos.años.length - 1) {
      setAñoSeleccionado(datos.años[indiceActual + 1].año);
    }
  };

  const cuadrantes = organizarPorCuadrantes(odontogramaActual?.odontograma || []);
  const estadisticas = calcularEstadisticas(odontogramaActual?.odontograma || []);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" component="h2">
            Evolución del Odontograma
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<PrevIcon />}
              onClick={() => navegarAño('anterior')}
              disabled={añoSeleccionado === datos.años[0]?.año}
            >
              Anterior
            </Button>

            <Typography variant="h6" sx={{ minWidth: 60, textAlign: 'center', fontWeight: 700 }}>
              {añoSeleccionado}
            </Typography>

            <Button
              variant="outlined"
              size="small"
              endIcon={<NextIcon />}
              onClick={() => navegarAño('siguiente')}
              disabled={añoSeleccionado === datos.años[datos.años.length - 1]?.año}
            >
              Siguiente
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 12 }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 3,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`
            }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {cuadrantes.superiorDerecho.reverse().map((pieza) => (
                    <PiezaDentalComponent
                      key={pieza.pieza}
                      pieza={pieza.pieza}
                      acciones={pieza.acciones}
                    />
                  ))}
                </Box>

                <Box sx={{ width: 20 }} />

                <Box sx={{ display: 'flex', gap: 1 }}>
                  {cuadrantes.superiorIzquierdo.map((pieza) => (
                    <PiezaDentalComponent
                      key={pieza.pieza}
                      pieza={pieza.pieza}
                      acciones={pieza.acciones}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{
                width: '100%',
                height: 2,
                bgcolor: theme.palette.divider,
                my: 2
              }} />

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {cuadrantes.inferiorDerecho.reverse().map((pieza) => (
                    <PiezaDentalComponent
                      key={pieza.pieza}
                      pieza={pieza.pieza}
                      acciones={pieza.acciones}
                    />
                  ))}
                </Box>

                <Box sx={{ width: 20 }} />

                <Box sx={{ display: 'flex', gap: 1 }}>
                  {cuadrantes.inferiorIzquierdo.map((pieza) => (
                    <PiezaDentalComponent
                      key={pieza.pieza}
                      pieza={pieza.pieza}
                      acciones={pieza.acciones}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 12 }}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Leyenda de Estados
                </Typography>
                <Stack spacing={1}>
                  {Object.entries(estadisticas).map(([codigo, cantidad]) => {
                    const estilo = getEstiloAccion(codigo);
                    return (
                      <Box
                        key={codigo}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 1,
                          borderRadius: 1,
                          border: `1px solid ${estilo.color}`,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ color: estilo.color }}>
                            {estilo.icon}
                          </Box>
                          <Typography variant="body2" sx={{ color: estilo.color, fontWeight: 600 }}>
                            {estilo.label}
                          </Typography>
                        </Box>
                        <Chip
                          label={cantidad}
                          size="small"
                          sx={{
                            bgcolor: estilo.color,
                            color: 'white',
                            fontWeight: 600
                          }}
                        />
                      </Box>
                    );
                  })}
                </Stack>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Navegación Rápida
                </Typography>
                <ButtonGroup orientation="vertical" variant="outlined" fullWidth>
                  {datos.años.map(año => (
                    <Button
                      key={año.año}
                      variant={año.año === añoSeleccionado ? 'contained' : 'outlined'}
                      onClick={() => setAñoSeleccionado(año.año)}
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Año {año.año}
                    </Button>
                  ))}
                </ButtonGroup>
              </Box>

              <Box sx={{ p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom color="primary.contrastText">
                  Resumen {añoSeleccionado}
                </Typography>
                <Typography variant="body2" color="primary.contrastText">
                  Total de piezas: {odontogramaActual?.odontograma.length || 0}
                </Typography>
                <Typography variant="body2" color="primary.contrastText">
                  Piezas sanas: {estadisticas["0"] || 0}
                </Typography>
                <Typography variant="body2" color="primary.contrastText">
                  Requieren tratamiento: {(estadisticas["1"] || 0) + (estadisticas["8"] || 0)}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
