import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { OsteomuscularData } from '../../../../mock/osteomuscular.mock';

interface DiagnosticosOsteoTablaProps {
  datos: OsteomuscularData[];
}

export default function DiagnosticosOsteoTabla({ datos }: DiagnosticosOsteoTablaProps) {
  const diagnosticosCompletos = datos.flatMap((evaluacion) =>
    evaluacion.diagnosticos.map((diagnostico, index) => ({
      id: `${evaluacion.anioEvaluacion}-${index}`,
      año: evaluacion.anioEvaluacion,
      codigo: diagnostico.cie10,
      conclusion: diagnostico.conclusion,
      recomendaciones: diagnostico.recomendaciones,
      prioridad: getPrioridad(diagnostico.cie10, diagnostico.conclusion),
    }))
  );

  function getPrioridad(codigo: string, conclusion: string): 'alta' | 'media' | 'baja' {
    if (codigo.includes('M') || conclusion.toLowerCase().includes('lumbalgia') || 
        conclusion.toLowerCase().includes('dolor') || conclusion.toLowerCase().includes('limitacion')) {
      return 'alta';
    } else if (conclusion.toLowerCase().includes('conservado') || 
               conclusion.toLowerCase().includes('normal')) {
      return 'baja';
    }
    return 'media';
  }

  const estadisticasDiagnosticos = {
    total: diagnosticosCompletos.length,
    porAño: datos.map(evaluacion => ({
      año: evaluacion.anioEvaluacion,
      cantidad: evaluacion.diagnosticos.length
    })),
    porPrioridad: {
      alta: diagnosticosCompletos.filter(d => d.prioridad === 'alta').length,
      media: diagnosticosCompletos.filter(d => d.prioridad === 'media').length,
      baja: diagnosticosCompletos.filter(d => d.prioridad === 'baja').length,
    },
    codigosMasFrecuentes: getCodigosMasFrecuentes(diagnosticosCompletos)
  };

  function getCodigosMasFrecuentes(diagnosticos: typeof diagnosticosCompletos) {
    const conteo: { [codigo: string]: number } = {};
    diagnosticos.forEach(d => {
      conteo[d.codigo] = (conteo[d.codigo] || 0) + 1;
    });
    
    return Object.entries(conteo)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([codigo, cantidad]) => ({ codigo, cantidad }));
  }

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
      field: 'conclusion',
      headerName: 'Conclusión Diagnóstica',
      width: 300,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'recomendaciones',
      headerName: 'Recomendaciones',
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
      width: 120,
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
                  Resumen de Diagnósticos
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total de diagnósticos
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {estadisticasDiagnosticos.total}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Por prioridad
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip 
                        label={`Alta: ${estadisticasDiagnosticos.porPrioridad.alta}`}
                        size="small"
                        color="error"
                        variant="outlined"
                      />
                      <Chip 
                        label={`Media: ${estadisticasDiagnosticos.porPrioridad.media}`}
                        size="small"
                        color="warning"
                        variant="outlined"
                      />
                      <Chip 
                        label={`Baja: ${estadisticasDiagnosticos.porPrioridad.baja}`}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Por año
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {estadisticasDiagnosticos.porAño.map((item) => (
                        <Box 
                          key={item.año}
                          sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            p: 1,
                            bgcolor: 'background.default',
                            borderRadius: 1
                          }}
                        >
                          <Typography variant="body2">{item.año}</Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {item.cantidad} diagnóstico{item.cantidad !== 1 ? 's' : ''}
                          </Typography>
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
                  Códigos más frecuentes
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {estadisticasDiagnosticos.codigosMasFrecuentes.length > 0 ? (
                    estadisticasDiagnosticos.codigosMasFrecuentes.map((item, index) => (
                      <Box 
                        key={item.codigo}
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
                        <Box>
                          <Typography 
                            variant="body2" 
                            fontFamily="monospace" 
                            fontWeight={index === 0 ? 'bold' : 'medium'}
                          >
                            {item.codigo}
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
              Historial de Diagnósticos Osteomusculares
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
