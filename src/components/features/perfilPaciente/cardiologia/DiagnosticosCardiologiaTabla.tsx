import { Card, CardContent, Typography, Box, Chip, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';

interface CardiologiaData {
  evaluacion_ocupacional_cardiologia: {
    cardiologia: Array<{
      fecha_evaluacion: string;
      diagnosticos: Array<{
        cie10: string;
        conclusion: string;
        recomendaciones: string;
      }>;
      aptitud_trabajo_forzado: string;
      aptitud_trabajo_altura: string;
    }>;
  };
}

interface Props {
  datos: CardiologiaData[];
}

export default function DiagnosticosCardiologiaTabla({ datos }: Props) {
  const diagnosticos = datos[0]?.evaluacion_ocupacional_cardiologia?.cardiologia?.flatMap((evaluacion, index) =>
    evaluacion.diagnosticos.map((diagnostico, diagIndex) => ({
      id: `${index}-${diagIndex}`,
      fecha: new Date(evaluacion.fecha_evaluacion).toLocaleDateString('es-ES'),
      cie10: diagnostico.cie10,
      conclusion: diagnostico.conclusion,
      recomendaciones: diagnostico.recomendaciones,
      aptitudForzado: evaluacion.aptitud_trabajo_forzado,
      aptitudAltura: evaluacion.aptitud_trabajo_altura,
    }))
  ) || [];

  const getAptitudColor = (aptitud: string) => {
    switch (aptitud.toLowerCase()) {
      case 'apto':
        return 'success';
      case 'apto con restricciones':
        return 'warning';
      case 'no apto':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'fecha',
      headerName: 'Fecha',
      width: 120,
      type: 'string',
    },
    {
      field: 'cie10',
      headerName: 'CIE-10',
      width: 100,
      type: 'string',
    },
    {
      field: 'conclusion',
      headerName: 'Diagnóstico',
      width: 200,
      type: 'string',
    },
    {
      field: 'recomendaciones',
      headerName: 'Recomendaciones',
      width: 300,
      type: 'string',
    },
    {
      field: 'aptitudForzado',
      headerName: 'Aptitud Trabajo Forzado',
      width: 180,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getAptitudColor(params.value) as any}
          size="small"
          sx={{ fontSize: '0.75rem' }}
        />
      ),
    },
    {
      field: 'aptitudAltura',
      headerName: 'Aptitud Trabajo en Altura',
      width: 180,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getAptitudColor(params.value) as any}
          size="small"
          sx={{ fontSize: '0.75rem' }}
        />
      ),
    },
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Diagnósticos y Aptitudes Cardiológicas
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip label="Apto" color="success" size="small" />
            <Chip label="Apto con Restricciones" color="warning" size="small" />
            <Chip label="No Apto" color="error" size="small" />
          </Stack>
        </Box>

        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={diagnosticos}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-cell': {
                borderColor: 'divider',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'background.paper',
                borderColor: 'divider',
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
