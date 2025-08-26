import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface DiagnosticosEspirometriaTablaProps {
  datos: any[];
}

export default function DiagnosticosEspirometriaTabla({ datos }: DiagnosticosEspirometriaTablaProps) {
  const examenes = datos[0]?.examenes || [];

  const diagnosticosCompletos = examenes.flatMap((examen: any) =>
    examen.diagnosticos
      .filter((diag: any) => diag.diag && diag.diag.trim() !== "")
      .map((diagnostico: any, index: number) => ({
        id: `${examen.fecha}-${index}`,
        fecha: examen.fecha,
        año: new Date(examen.fecha).getFullYear(),
        codigo: diagnostico.cie_10,
        diagnostico: diagnostico.diag,
        recomendacion: diagnostico.reco1,
        grado: examen.evaluacion.grado,
        conclusion: examen.evaluacion.conclusion,
        fvc_porcentaje: parseInt(examen.valores_espirometricos.fvc2),
        fev_porcentaje: parseInt(examen.valores_espirometricos.fev2),
        prioridad: getPrioridad(diagnostico.diag, examen.evaluacion.grado)
      }))
  );

  function getPrioridad(diagnostico: string, grado: string): 'alta' | 'media' | 'baja' {
    if (diagnostico.toLowerCase().includes('anormal') || 
        diagnostico.toLowerCase().includes('obstructivo') ||
        diagnostico.toLowerCase().includes('restrictivo') ||
        grado === 'C' || grado === 'D') {
      return 'alta';
    } else if (grado === 'B') {
      return 'media';
    }
    return 'baja';
  }

  const estadisticasDiagnosticos = {
    total: diagnosticosCompletos.length,
    porAño: examenes.map((examen: any) => ({
      año: new Date(examen.fecha).getFullYear(),
      cantidad: examen.diagnosticos.filter((d: any) => d.diag && d.diag.trim() !== "").length,
      grado: examen.evaluacion.grado
    })),
    porGrado: {
      A: diagnosticosCompletos.filter((d: any) => d.grado === 'A').length,
      B: diagnosticosCompletos.filter((d: any) => d.grado === 'B').length,
      C: diagnosticosCompletos.filter((d: any) => d.grado === 'C').length,
      D: diagnosticosCompletos.filter((d: any) => d.grado === 'D').length,
    },
    porPrioridad: {
      alta: diagnosticosCompletos.filter((d: any) => d.prioridad === 'alta').length,
      media: diagnosticosCompletos.filter((d: any) => d.prioridad === 'media').length,
      baja: diagnosticosCompletos.filter((d: any) => d.prioridad === 'baja').length,
    },
    diagnosticosMasFrecuentes: getDiagnosticosMasFrecuentes(diagnosticosCompletos)
  };

  function getDiagnosticosMasFrecuentes(diagnosticos: typeof diagnosticosCompletos) {
    const conteo: { [diagnostico: string]: number } = {};
    diagnosticos.forEach((d: any) => {
      conteo[d.diagnostico] = (conteo[d.diagnostico] || 0) + 1;
    });
    
    return Object.entries(conteo)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([diagnostico, cantidad]) => ({ diagnostico, cantidad }));
  }

  const getGradoColor = (grado: string) => {
    switch (grado) {
      case 'A': return 'success';
      case 'B': return 'warning';
      case 'C': return 'error';
      case 'D': return 'error';
      default: return 'default';
    }
  };

  const getGradoLabel = (grado: string) => {
    switch (grado) {
      case 'A': return 'Normal';
      case 'B': return 'Leve';
      case 'C': return 'Moderado';
      case 'D': return 'Severo';
      default: return grado;
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'año',
      headerName: 'Año',
      width: 80,
      type: 'number',
    },
    {
      field: 'codigo',
      headerName: 'Código CIE-10',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontFamily="monospace" fontWeight={600}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'diagnostico',
      headerName: 'Diagnóstico',
      width: 300,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'grado',
      headerName: 'Grado',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={getGradoLabel(params.value)}
          size="small"
          color={getGradoColor(params.value) as any}
          variant="outlined"
        />
      ),
    },
    {
      field: 'fvc_porcentaje',
      headerName: 'FVC %',
      width: 80,
      type: 'number',
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="medium">
          {params.value}%
        </Typography>
      ),
    },
    {
      field: 'fev_porcentaje',
      headerName: 'FEV1 %',
      width: 80,
      type: 'number',
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="medium">
          {params.value}%
        </Typography>
      ),
    },
    {
      field: 'recomendacion',
      headerName: 'Recomendación',
      width: 350,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ lineHeight: 1.2, color: 'text.secondary' }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'prioridad',
      headerName: 'Prioridad',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={
            params.value === 'alta' ? 'error' :
            params.value === 'media' ? 'warning' : 'success'
          }
          variant="outlined"
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Resumen de Evaluaciones
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total de evaluaciones
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {estadisticasDiagnosticos.total}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Por grado de severidad
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip 
                        label={`A: ${estadisticasDiagnosticos.porGrado.A}`}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                      <Chip 
                        label={`B: ${estadisticasDiagnosticos.porGrado.B}`}
                        size="small"
                        color="warning"
                        variant="outlined"
                      />
                      <Chip 
                        label={`C: ${estadisticasDiagnosticos.porGrado.C}`}
                        size="small"
                        color="error"
                        variant="outlined"
                      />
                      <Chip 
                        label={`D: ${estadisticasDiagnosticos.porGrado.D}`}
                        size="small"
                        color="error"
                        variant="filled"
                      />
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Historial por año
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {estadisticasDiagnosticos.porAño.reverse().map((item: any) => (
                        <Box 
                          key={item.año}
                          sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 1,
                            bgcolor: 'background.default',
                            borderRadius: 1
                          }}
                        >
                          <Typography variant="body2">{item.año}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" fontWeight="medium">
                              {item.cantidad} eval.
                            </Typography>
                            <Chip
                              label={item.grado}
                              size="small"
                              color={getGradoColor(item.grado) as any}
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Diagnósticos frecuentes
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {estadisticasDiagnosticos.diagnosticosMasFrecuentes.length > 0 ? (
                    estadisticasDiagnosticos.diagnosticosMasFrecuentes.map((item, index) => (
                      <Box 
                        key={item.diagnostico}
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 1.5,
                          bgcolor: 'background.default',
                          borderRadius: 1,
                          border: index === 0 ? '2px solid' : '1px solid',
                          borderColor: index === 0 ? 'primary.main' : 'divider'
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography 
                            variant="body2" 
                            fontWeight={index === 0 ? 'bold' : 'medium'}
                            sx={{ 
                              fontSize: '0.8rem',
                              lineHeight: 1.2
                            }}
                          >
                            {item.diagnostico}
                          </Typography>
                        </Box>
                        <Chip
                          label={`${item.cantidad}x`}
                          size="small"
                          color={index === 0 ? 'primary' : 'default'}
                          variant={index === 0 ? 'filled' : 'outlined'}
                        />
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                      No hay datos suficientes
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <Card sx={{ height: 600 }}>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Historial de Evaluaciones Espirométricas
            </Typography>
            
            <Box sx={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={diagnosticosCompletos}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                  sorting: {
                    sortModel: [{ field: 'año', sort: 'desc' }],
                  },
                }}
                pageSizeOptions={[5, 10, 20]}
                disableRowSelectionOnClick
                sx={{
                  '& .MuiDataGrid-cell': {
                    fontSize: '0.875rem',
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: 'background.default',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  },
                  '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
