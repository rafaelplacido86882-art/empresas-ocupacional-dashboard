export interface Habito {
    tipo: string;
    consume: boolean;
    frecuencia: string;
    cantidad: string;
    años_consumo: number;
    observaciones: string;
}

export interface Patologia {
    nombre: string;
    diagnostico_fecha: string;
    tratamiento: string;
    estado: 'activo' | 'controlado' | 'resuelto';
    medicamentos: string[];
}

export interface Seguro {
    tipo: string;
    numero_afiliacion: string;
    vigencia: string;
    cobertura: string[];
}

export interface HorarioTrabajo {
    tipo_horario: string;
    horas_diarias: number;
    dias_semana: number;
    turno: string;
    descansos: boolean;
    horas_extras: boolean;
}

export interface Vacuna {
    nombre: string;
    fecha_aplicacion: string;
    dosis: number;
    laboratorio: string;
    vigente: boolean;
    proxima_fecha?: string;
}

export interface AgenteRiesgo {
    tipo: string;
    exposicion: 'alta' | 'media' | 'baja';
    tiempo_exposicion: number;
    medidas_proteccion: string[];
    evaluacion_medica: string;
}

export interface HistoriaClinica {
    hospitalizaciones: {
        fecha: string;
        motivo: string;
        duracion: number;
        hospital: string;
    }[];
    cirugias: {
        fecha: string;
        tipo: string;
        resultado: string;
    }[];
    alergias: {
        tipo: string;
        severidad: 'leve' | 'moderada' | 'severa';
        tratamiento: string;
    }[];
    medicamentos_actuales: {
        nombre: string;
        dosis: string;
        frecuencia: string;
        indicacion: string;
    }[];
}

export interface AntecedenteFamiliar {
    parentesco: string;
    patologia: string;
    edad_diagnostico: number;
    estado: 'vivo' | 'fallecido';
}

export interface AntecedenteReproductivo {
    menarquia?: number;
    ciclos_regulares?: boolean;
    embarazos?: number;
    partos?: number;
    abortos?: number;
    cesareas?: number;
    lactancia?: boolean;
    menopausia?: number;
    terapia_hormonal?: boolean;
}

export interface Antecedente {
    id: string;
    fecha_evaluacion: string;
    trabajador_id: string;
    habitos: Habito[];
    patologias: Patologia[];
    seguro: Seguro;
    horario_trabajo: HorarioTrabajo;
    vacunas: Vacuna[];
    agentes_riesgo: AgenteRiesgo[];
    historia_clinica: HistoriaClinica;
    antecedentes_familiares: AntecedenteFamiliar[];
    antecedentes_reproductivos?: AntecedenteReproductivo;
    observaciones: string;
}

export const antecedentesMockData: Antecedente[] = [
    {
        id: "ANT-2023-001",
        fecha_evaluacion: "2023-08-15",
        trabajador_id: "TRAB-001",
        habitos: [
            {
                tipo: "Tabaco",
                consume: true,
                frecuencia: "Diario",
                cantidad: "10 cigarrillos",
                años_consumo: 8,
                observaciones: "Intenta reducir consumo"
            },
            {
                tipo: "Alcohol",
                consume: true,
                frecuencia: "Fines de semana",
                cantidad: "2-3 cervezas",
                años_consumo: 10,
                observaciones: "Consumo social moderado"
            },
            {
                tipo: "Drogas",
                consume: false,
                frecuencia: "Nunca",
                cantidad: "N/A",
                años_consumo: 0,
                observaciones: "Niega consumo"
            }
        ],
        patologias: [
            {
                nombre: "Hipertensión arterial",
                diagnostico_fecha: "2022-03-15",
                tratamiento: "Enalapril 10mg",
                estado: "controlado",
                medicamentos: ["Enalapril", "Hidroclorotiazida"]
            },
            {
                nombre: "Diabetes tipo 2",
                diagnostico_fecha: "2021-11-20",
                tratamiento: "Metformina 850mg",
                estado: "activo",
                medicamentos: ["Metformina"]
            }
        ],
        seguro: {
            tipo: "EsSalud",
            numero_afiliacion: "12345678901",
            vigencia: "2023-12-31",
            cobertura: ["Consultas", "Emergencias", "Cirugías", "Medicamentos"]
        },
        horario_trabajo: {
            tipo_horario: "Fijo",
            horas_diarias: 8,
            dias_semana: 5,
            turno: "Mañana",
            descansos: true,
            horas_extras: false
        },
        vacunas: [
            {
                nombre: "COVID-19",
                fecha_aplicacion: "2023-01-15",
                dosis: 4,
                laboratorio: "Pfizer",
                vigente: true,
                proxima_fecha: "2024-01-15"
            },
            {
                nombre: "Influenza",
                fecha_aplicacion: "2023-04-10",
                dosis: 1,
                laboratorio: "Sanofi",
                vigente: true,
                proxima_fecha: "2024-04-10"
            },
            {
                nombre: "Hepatitis B",
                fecha_aplicacion: "2022-06-15",
                dosis: 3,
                laboratorio: "GSK",
                vigente: true
            }
        ],
        agentes_riesgo: [
            {
                tipo: "Ruido",
                exposicion: "alta",
                tiempo_exposicion: 6,
                medidas_proteccion: ["Protectores auditivos", "Rotación de personal"],
                evaluacion_medica: "Audiometría anual"
            },
            {
                tipo: "Químicos",
                exposicion: "media",
                tiempo_exposicion: 4,
                medidas_proteccion: ["Mascarilla", "Guantes", "Ventilación"],
                evaluacion_medica: "Exámenes toxicológicos"
            }
        ],
        historia_clinica: {
            hospitalizaciones: [
                {
                    fecha: "2022-08-10",
                    motivo: "Apendicitis",
                    duracion: 3,
                    hospital: "Hospital Nacional"
                }
            ],
            cirugias: [
                {
                    fecha: "2022-08-11",
                    tipo: "Apendicectomía",
                    resultado: "Exitosa"
                }
            ],
            alergias: [
                {
                    tipo: "Penicilina",
                    severidad: "moderada",
                    tratamiento: "Evitar antibióticos betalactámicos"
                }
            ],
            medicamentos_actuales: [
                {
                    nombre: "Enalapril",
                    dosis: "10mg",
                    frecuencia: "1 vez al día",
                    indicacion: "Hipertensión"
                },
                {
                    nombre: "Metformina",
                    dosis: "850mg",
                    frecuencia: "2 veces al día",
                    indicacion: "Diabetes"
                }
            ]
        },
        antecedentes_familiares: [
            {
                parentesco: "Padre",
                patologia: "Diabetes tipo 2",
                edad_diagnostico: 55,
                estado: "vivo"
            },
            {
                parentesco: "Madre",
                patologia: "Hipertensión arterial",
                edad_diagnostico: 48,
                estado: "vivo"
            },
            {
                parentesco: "Abuelo paterno",
                patologia: "Infarto al miocardio",
                edad_diagnostico: 65,
                estado: "fallecido"
            }
        ],
        antecedentes_reproductivos: {
            menarquia: 13,
            ciclos_regulares: true,
            embarazos: 2,
            partos: 2,
            abortos: 0,
            cesareas: 1,
            lactancia: true,
            terapia_hormonal: false
        },
        observaciones: "Paciente cooperativo, requiere seguimiento de patologías crónicas"
    },
    {
        id: "ANT-2024-001",
        fecha_evaluacion: "2024-08-20",
        trabajador_id: "TRAB-001",
        habitos: [
            {
                tipo: "Tabaco",
                consume: true,
                frecuencia: "Diario",
                cantidad: "5 cigarrillos",
                años_consumo: 9,
                observaciones: "Reducción significativa del consumo"
            },
            {
                tipo: "Alcohol",
                consume: true,
                frecuencia: "Ocasional",
                cantidad: "1-2 cervezas",
                años_consumo: 11,
                observaciones: "Menor frecuencia de consumo"
            },
            {
                tipo: "Drogas",
                consume: false,
                frecuencia: "Nunca",
                cantidad: "N/A",
                años_consumo: 0,
                observaciones: "Mantiene abstinencia"
            }
        ],
        patologias: [
            {
                nombre: "Hipertensión arterial",
                diagnostico_fecha: "2022-03-15",
                tratamiento: "Enalapril 10mg + Amlodipino 5mg",
                estado: "controlado",
                medicamentos: ["Enalapril", "Amlodipino"]
            },
            {
                nombre: "Diabetes tipo 2",
                diagnostico_fecha: "2021-11-20",
                tratamiento: "Metformina 850mg + Glibenclamida",
                estado: "controlado",
                medicamentos: ["Metformina", "Glibenclamida"]
            }
        ],
        seguro: {
            tipo: "EPS",
            numero_afiliacion: "12345678901",
            vigencia: "2024-12-31",
            cobertura: ["Consultas", "Emergencias", "Cirugías", "Medicamentos", "Odontología"]
        },
        horario_trabajo: {
            tipo_horario: "Rotativo",
            horas_diarias: 8,
            dias_semana: 5,
            turno: "Mixto",
            descansos: true,
            horas_extras: true
        },
        vacunas: [
            {
                nombre: "COVID-19",
                fecha_aplicacion: "2024-01-20",
                dosis: 5,
                laboratorio: "Moderna",
                vigente: true,
                proxima_fecha: "2025-01-20"
            },
            {
                nombre: "Influenza",
                fecha_aplicacion: "2024-04-15",
                dosis: 1,
                laboratorio: "Sanofi",
                vigente: true,
                proxima_fecha: "2025-04-15"
            },
            {
                nombre: "Hepatitis B",
                fecha_aplicacion: "2022-06-15",
                dosis: 3,
                laboratorio: "GSK",
                vigente: true
            }
        ],
        agentes_riesgo: [
            {
                tipo: "Ruido",
                exposicion: "media",
                tiempo_exposicion: 7,
                medidas_proteccion: ["Protectores auditivos", "Cabinas insonorizadas"],
                evaluacion_medica: "Audiometría semestral"
            },
            {
                tipo: "Químicos",
                exposicion: "baja",
                tiempo_exposicion: 5,
                medidas_proteccion: ["Mascarilla N95", "Guantes nitrilo", "Extracción localizada"],
                evaluacion_medica: "Perfil toxicológico anual"
            },
            {
                tipo: "Ergonómico",
                exposicion: "alta",
                tiempo_exposicion: 8,
                medidas_proteccion: ["Pausas activas", "Silla ergonómica"],
                evaluacion_medica: "Evaluación osteomuscular"
            }
        ],
        historia_clinica: {
            hospitalizaciones: [
                {
                    fecha: "2022-08-10",
                    motivo: "Apendicitis",
                    duracion: 3,
                    hospital: "Hospital Nacional"
                }
            ],
            cirugias: [
                {
                    fecha: "2022-08-11",
                    tipo: "Apendicectomía",
                    resultado: "Exitosa"
                }
            ],
            alergias: [
                {
                    tipo: "Penicilina",
                    severidad: "moderada",
                    tratamiento: "Evitar antibióticos betalactámicos"
                },
                {
                    tipo: "Polen",
                    severidad: "leve",
                    tratamiento: "Antihistamínicos estacionales"
                }
            ],
            medicamentos_actuales: [
                {
                    nombre: "Enalapril",
                    dosis: "10mg",
                    frecuencia: "1 vez al día",
                    indicacion: "Hipertensión"
                },
                {
                    nombre: "Amlodipino",
                    dosis: "5mg",
                    frecuencia: "1 vez al día",
                    indicacion: "Hipertensión"
                },
                {
                    nombre: "Metformina",
                    dosis: "850mg",
                    frecuencia: "2 veces al día",
                    indicacion: "Diabetes"
                },
                {
                    nombre: "Glibenclamida",
                    dosis: "5mg",
                    frecuencia: "1 vez al día",
                    indicacion: "Diabetes"
                }
            ]
        },
        antecedentes_familiares: [
            {
                parentesco: "Padre",
                patologia: "Diabetes tipo 2",
                edad_diagnostico: 55,
                estado: "vivo"
            },
            {
                parentesco: "Madre",
                patologia: "Hipertensión arterial",
                edad_diagnostico: 48,
                estado: "vivo"
            },
            {
                parentesco: "Abuelo paterno",
                patologia: "Infarto al miocardio",
                edad_diagnostico: 65,
                estado: "fallecido"
            },
            {
                parentesco: "Hermana",
                patologia: "Hipotiroidismo",
                edad_diagnostico: 30,
                estado: "vivo"
            }
        ],
        antecedentes_reproductivos: {
            menarquia: 13,
            ciclos_regulares: true,
            embarazos: 3,
            partos: 3,
            abortos: 0,
            cesareas: 2,
            lactancia: true,
            terapia_hormonal: false
        },
        observaciones: "Mejoría en control de patologías, reducción de factores de riesgo"
    },
    {
        id: "ANT-2025-001",
        fecha_evaluacion: "2025-08-25",
        trabajador_id: "TRAB-001",
        habitos: [
            {
                tipo: "Tabaco",
                consume: false,
                frecuencia: "Ex fumador",
                cantidad: "0 cigarrillos",
                años_consumo: 9,
                observaciones: "Logró dejar el hábito completamente"
            },
            {
                tipo: "Alcohol",
                consume: true,
                frecuencia: "Muy ocasional",
                cantidad: "1 cerveza",
                años_consumo: 12,
                observaciones: "Consumo muy esporádico"
            },
            {
                tipo: "Drogas",
                consume: false,
                frecuencia: "Nunca",
                cantidad: "N/A",
                años_consumo: 0,
                observaciones: "Sin antecedentes"
            }
        ],
        patologias: [
            {
                nombre: "Hipertensión arterial",
                diagnostico_fecha: "2022-03-15",
                tratamiento: "Enalapril 5mg",
                estado: "controlado",
                medicamentos: ["Enalapril"]
            },
            {
                nombre: "Diabetes tipo 2",
                diagnostico_fecha: "2021-11-20",
                tratamiento: "Metformina 850mg",
                estado: "controlado",
                medicamentos: ["Metformina"]
            }
        ],
        seguro: {
            tipo: "SCTR",
            numero_afiliacion: "12345678901",
            vigencia: "2025-12-31",
            cobertura: ["Accidentes laborales", "Enfermedades ocupacionales", "Rehabilitación"]
        },
        horario_trabajo: {
            tipo_horario: "Flexible",
            horas_diarias: 8,
            dias_semana: 5,
            turno: "Diurno",
            descansos: true,
            horas_extras: false
        },
        vacunas: [
            {
                nombre: "COVID-19",
                fecha_aplicacion: "2025-01-25",
                dosis: 6,
                laboratorio: "Pfizer",
                vigente: true,
                proxima_fecha: "2026-01-25"
            },
            {
                nombre: "Influenza",
                fecha_aplicacion: "2025-04-20",
                dosis: 1,
                laboratorio: "GSK",
                vigente: true,
                proxima_fecha: "2026-04-20"
            },
            {
                nombre: "Hepatitis B",
                fecha_aplicacion: "2022-06-15",
                dosis: 3,
                laboratorio: "GSK",
                vigente: true
            }
        ],
        agentes_riesgo: [
            {
                tipo: "Ruido",
                exposicion: "baja",
                tiempo_exposicion: 8,
                medidas_proteccion: ["Protectores auditivos", "Ambiente controlado"],
                evaluacion_medica: "Audiometría anual"
            },
            {
                tipo: "Ergonómico",
                exposicion: "media",
                tiempo_exposicion: 8,
                medidas_proteccion: ["Estación ergonómica", "Pausas programadas"],
                evaluacion_medica: "Evaluación postural"
            }
        ],
        historia_clinica: {
            hospitalizaciones: [
                {
                    fecha: "2022-08-10",
                    motivo: "Apendicitis",
                    duracion: 3,
                    hospital: "Hospital Nacional"
                }
            ],
            cirugias: [
                {
                    fecha: "2022-08-11",
                    tipo: "Apendicectomía",
                    resultado: "Exitosa"
                }
            ],
            alergias: [
                {
                    tipo: "Penicilina",
                    severidad: "moderada",
                    tratamiento: "Evitar antibióticos betalactámicos"
                },
                {
                    tipo: "Polen",
                    severidad: "leve",
                    tratamiento: "Antihistamínicos estacionales"
                }
            ],
            medicamentos_actuales: [
                {
                    nombre: "Enalapril",
                    dosis: "5mg",
                    frecuencia: "1 vez al día",
                    indicacion: "Hipertensión"
                },
                {
                    nombre: "Metformina",
                    dosis: "850mg",
                    frecuencia: "2 veces al día",
                    indicacion: "Diabetes"
                }
            ]
        },
        antecedentes_familiares: [
            {
                parentesco: "Padre",
                patologia: "Diabetes tipo 2",
                edad_diagnostico: 55,
                estado: "vivo"
            },
            {
                parentesco: "Madre",
                patologia: "Hipertensión arterial",
                edad_diagnostico: 48,
                estado: "vivo"
            },
            {
                parentesco: "Abuelo paterno",
                patologia: "Infarto al miocardio",
                edad_diagnostico: 65,
                estado: "fallecido"
            },
            {
                parentesco: "Hermana",
                patologia: "Hipotiroidismo",
                edad_diagnostico: 30,
                estado: "vivo"
            }
        ],
        antecedentes_reproductivos: {
            menarquia: 13,
            ciclos_regulares: false,
            embarazos: 3,
            partos: 3,
            abortos: 0,
            cesareas: 2,
            lactancia: true,
            menopausia: 45,
            terapia_hormonal: true
        },
        observaciones: "Excelente evolución, cesación tabáquica exitosa, patologías bien controladas"
    }
];
