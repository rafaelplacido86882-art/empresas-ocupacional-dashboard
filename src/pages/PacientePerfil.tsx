import { Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Chip, Stack } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import {
    HeaderPerfil,
    Interconsulta,
    FichaMedica,
    Antecedentes,
    Laboratorio,
    Oftalmologia,
    Cardiologia, Espirometria, Osteomuscular, Psicologia, Odontologia, Radiologia, Audiometria, Dashboard
} from '../components/features/perfilPaciente';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function PacientePerfil() {
    const [selectedSection, setSelectedSection] = useState(0);

    const sections = [
        { id: 1, label: 'Interconsulta', color: 'secondary' },
        { id: 2, label: 'Ficha Médica', color: 'success' },
        { id: 3, label: 'Antecedentes', color: 'info' },
        { id: 4, label: 'Laboratorio', color: 'warning' },
        { id: 5, label: 'Oftalmología', color: 'error' },
        { id: 6, label: 'Cardiología', color: 'primary' },
        { id: 7, label: 'Espirometría', color: 'secondary' },
        { id: 8, label: 'Osteomuscular', color: 'success' },
        { id: 9, label: 'Radiología', color: 'info' },
        { id: 10, label: 'Audiometría', color: 'warning' },
        { id: 11, label: 'Psicología', color: 'error' },
        { id: 12, label: 'Odontología', color: 'primary' },
    ] as const;

    const handleSectionChange = (event: SelectChangeEvent<number>) => {
        setSelectedSection(event.target.value as number);
    };

    const handleChipClick = (sectionId: number) => {
        setSelectedSection(sectionId);
    };

    const getCurrentSection = () => {
        return sections.find(section => section.id === selectedSection) || sections[0];
    };

    return (
        <Box sx={{
            width: '100%',
            minWidth: 0,
        }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Perfil del trabajador
            </Typography>

            <Paper sx={{ p: { xs: 1, sm: 2 }, mb: 2 }}>
                <HeaderPerfil />
            </Paper>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Seleccionar sección</InputLabel>
                        <Select
                            value={selectedSection}
                            onChange={handleSectionChange}
                            label="Seleccionar sección"
                        >
                            {sections.map((section) => (
                                <MenuItem key={section.id} value={section.id}>
                                    {section.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            flexWrap: 'wrap',
                            gap: 1,
                        }}
                    >
                        {sections.map((section) => (
                            <Chip
                                key={section.id}
                                label={section.label}
                                color={selectedSection === section.id ? section.color : 'default'}
                                variant={selectedSection === section.id ? 'filled' : 'outlined'}
                                onClick={() => handleChipClick(section.id)}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: selectedSection === section.id ? undefined : 'action.hover',
                                    },
                                }}
                            />
                        ))}
                    </Stack>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Sección actual:
                    </Typography>
                    <Chip
                        label={getCurrentSection().label}
                        color={getCurrentSection().color}
                        size="small"
                    />
                </Box>
            </Paper>
            <Paper sx={{ p: 3, minHeight: 400 }}>
                <TabPanel value={selectedSection} index={0}>
                    <Dashboard />
                </TabPanel>
                <TabPanel value={selectedSection} index={1}>
                    <Interconsulta />
                </TabPanel>
                <TabPanel value={selectedSection} index={2}>
                    <FichaMedica />
                </TabPanel>
                <TabPanel value={selectedSection} index={3}>
                    <Antecedentes />
                </TabPanel>
                <TabPanel value={selectedSection} index={4}>
                    <Laboratorio />
                </TabPanel>
                <TabPanel value={selectedSection} index={5}>
                    <Oftalmologia />
                </TabPanel>
                <TabPanel value={selectedSection} index={6}>
                    <Cardiologia />
                </TabPanel>
                <TabPanel value={selectedSection} index={7}>
                    <Espirometria />
                </TabPanel>
                <TabPanel value={selectedSection} index={8}>
                    <Osteomuscular />
                </TabPanel>
                <TabPanel value={selectedSection} index={9}>
                    <Radiologia />
                </TabPanel>
                <TabPanel value={selectedSection} index={10}>
                    <Audiometria />
                </TabPanel>
                <TabPanel value={selectedSection} index={11}>
                    <Psicologia />
                </TabPanel>
                <TabPanel value={selectedSection} index={12}>
                    <Odontologia />
                </TabPanel>
            </Paper>
        </Box>
    );
}