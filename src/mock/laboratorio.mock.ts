export const laboratorioMockData = [
  {
    evaluacion_ocupacional_laboratorio: {
      laboratorio: [
        {
          fecha_evaluacion: "2024-01-15",
          hemograma: {
            hemoglobina: {
              valor: 14.2,
              unidad: "g/dL",
              referencia: "12.0-15.5",
              estado: "normal"
            },
            hematocrito: {
              valor: 42.5,
              unidad: "%",
              referencia: "36.0-46.0",
              estado: "normal"
            },
            leucocitos: {
              valor: 6800,
              unidad: "/μL",
              referencia: "4000-10000",
              estado: "normal"
            },
            plaquetas: {
              valor: 285000,
              unidad: "/μL",
              referencia: "150000-450000",
              estado: "normal"
            },
            neutrofilos: {
              valor: 65,
              unidad: "%",
              referencia: "50-70",
              estado: "normal"
            },
            linfocitos: {
              valor: 28,
              unidad: "%",
              referencia: "20-40",
              estado: "normal"
            }
          },
          bioquimica: {
            glucosa: {
              valor: 95,
              unidad: "mg/dL",
              referencia: "70-100",
              estado: "normal"
            },
            colesterol_total: {
              valor: 185,
              unidad: "mg/dL",
              referencia: "<200",
              estado: "normal"
            },
            trigliceridos: {
              valor: 145,
              unidad: "mg/dL",
              referencia: "<150",
              estado: "normal"
            },
            creatinina: {
              valor: 0.9,
              unidad: "mg/dL",
              referencia: "0.6-1.2",
              estado: "normal"
            },
            bun: {
              valor: 15,
              unidad: "mg/dL",
              referencia: "7-20",
              estado: "normal"
            },
            acido_urico: {
              valor: 5.2,
              unidad: "mg/dL",
              referencia: "3.5-7.2",
              estado: "normal"
            },
            alt_gpt: {
              valor: 25,
              unidad: "U/L",
              referencia: "7-56",
              estado: "normal"
            },
            ast_got: {
              valor: 22,
              unidad: "U/L",
              referencia: "10-40",
              estado: "normal"
            }
          },
          toxicologia: {
            plomo: {
              valor: 8.5,
              unidad: "μg/dL",
              referencia: "<10",
              estado: "normal"
            },
            mercurio: {
              valor: 2.1,
              unidad: "μg/L",
              referencia: "<5",
              estado: "normal"
            },
            acetilcolinesterasa: {
              valor: 85,
              unidad: "%",
              referencia: ">70",
              estado: "normal"
            },
            colinesterasa_plasmatica: {
              valor: 7800,
              unidad: "U/L",
              referencia: "5400-13200",
              estado: "normal"
            }
          },
          biomarcadores: {
            ldh: {
              valor: 165,
              unidad: "U/L",
              referencia: "140-280",
              estado: "normal"
            },
            ck_total: {
              valor: 120,
              unidad: "U/L",
              referencia: "30-200",
              estado: "normal"
            },
            proteina_c_reactiva: {
              valor: 1.2,
              unidad: "mg/L",
              referencia: "<3.0",
              estado: "normal"
            }
          },
          alertas: [
            {
              tipo: "seguimiento",
              parametro: "Colesterol Total",
              mensaje: "Mantener dieta baja en grasas saturadas",
              prioridad: "baja"
            }
          ],
          interpretacion: "Resultados dentro de parámetros normales. Continuar con controles anuales.",
          recomendaciones: "Mantener hábitos saludables, ejercicio regular y dieta balanceada."
        },
        {
          fecha_evaluacion: "2025-01-22",
          hemograma: {
            hemoglobina: {
              valor: 13.8,
              unidad: "g/dL",
              referencia: "12.0-15.5",
              estado: "normal"
            },
            hematocrito: {
              valor: 41.2,
              unidad: "%",
              referencia: "36.0-46.0",
              estado: "normal"
            },
            leucocitos: {
              valor: 7200,
              unidad: "/μL",
              referencia: "4000-10000",
              estado: "normal"
            },
            plaquetas: {
              valor: 310000,
              unidad: "/μL",
              referencia: "150000-450000",
              estado: "normal"
            },
            neutrofilos: {
              valor: 62,
              unidad: "%",
              referencia: "50-70",
              estado: "normal"
            },
            linfocitos: {
              valor: 32,
              unidad: "%",
              referencia: "20-40",
              estado: "normal"
            }
          },
          bioquimica: {
            glucosa: {
              valor: 102,
              unidad: "mg/dL",
              referencia: "70-100",
              estado: "alto"
            },
            colesterol_total: {
              valor: 195,
              unidad: "mg/dL",
              referencia: "<200",
              estado: "normal"
            },
            trigliceridos: {
              valor: 158,
              unidad: "mg/dL",
              referencia: "<150",
              estado: "alto"
            },
            creatinina: {
              valor: 0.8,
              unidad: "mg/dL",
              referencia: "0.6-1.2",
              estado: "normal"
            },
            bun: {
              valor: 18,
              unidad: "mg/dL",
              referencia: "7-20",
              estado: "normal"
            },
            acido_urico: {
              valor: 6.1,
              unidad: "mg/dL",
              referencia: "3.5-7.2",
              estado: "normal"
            },
            alt_gpt: {
              valor: 28,
              unidad: "U/L",
              referencia: "7-56",
              estado: "normal"
            },
            ast_got: {
              valor: 24,
              unidad: "U/L",
              referencia: "10-40",
              estado: "normal"
            }
          },
          toxicologia: {
            plomo: {
              valor: 7.2,
              unidad: "μg/dL",
              referencia: "<10",
              estado: "normal"
            },
            mercurio: {
              valor: 1.8,
              unidad: "μg/L",
              referencia: "<5",
              estado: "normal"
            },
            acetilcolinesterasa: {
              valor: 88,
              unidad: "%",
              referencia: ">70",
              estado: "normal"
            },
            colinesterasa_plasmatica: {
              valor: 8200,
              unidad: "U/L",
              referencia: "5400-13200",
              estado: "normal"
            }
          },
          biomarcadores: {
            ldh: {
              valor: 180,
              unidad: "U/L",
              referencia: "140-280",
              estado: "normal"
            },
            ck_total: {
              valor: 95,
              unidad: "U/L",
              referencia: "30-200",
              estado: "normal"
            },
            proteina_c_reactiva: {
              valor: 0.8,
              unidad: "mg/L",
              referencia: "<3.0",
              estado: "normal"
            }
          },
          alertas: [
            {
              tipo: "atencion",
              parametro: "Glucosa",
              mensaje: "Glucosa ligeramente elevada - control en 3 meses",
              prioridad: "media"
            },
            {
              tipo: "atencion",
              parametro: "Triglicéridos",
              mensaje: "Triglicéridos elevados - modificar dieta",
              prioridad: "media"
            }
          ],
          interpretacion: "Ligero aumento en glucosa y triglicéridos. Requiere seguimiento.",
          recomendaciones: "Ajustar dieta, reducir carbohidratos simples y grasas. Control en 3 meses."
        },
        {
          fecha_evaluacion: "2023-03-10",
          hemograma: {
            hemoglobina: {
              valor: 14.5,
              unidad: "g/dL",
              referencia: "12.0-15.5",
              estado: "normal"
            },
            hematocrito: {
              valor: 43.1,
              unidad: "%",
              referencia: "36.0-46.0",
              estado: "normal"
            },
            leucocitos: {
              valor: 6500,
              unidad: "/μL",
              referencia: "4000-10000",
              estado: "normal"
            },
            plaquetas: {
              valor: 265000,
              unidad: "/μL",
              referencia: "150000-450000",
              estado: "normal"
            },
            neutrofilos: {
              valor: 68,
              unidad: "%",
              referencia: "50-70",
              estado: "normal"
            },
            linfocitos: {
              valor: 25,
              unidad: "%",
              referencia: "20-40",
              estado: "normal"
            }
          },
          bioquimica: {
            glucosa: {
              valor: 88,
              unidad: "mg/dL",
              referencia: "70-100",
              estado: "normal"
            },
            colesterol_total: {
              valor: 175,
              unidad: "mg/dL",
              referencia: "<200",
              estado: "normal"
            },
            trigliceridos: {
              valor: 120,
              unidad: "mg/dL",
              referencia: "<150",
              estado: "normal"
            },
            creatinina: {
              valor: 1.0,
              unidad: "mg/dL",
              referencia: "0.6-1.2",
              estado: "normal"
            },
            bun: {
              valor: 12,
              unidad: "mg/dL",
              referencia: "7-20",
              estado: "normal"
            },
            acido_urico: {
              valor: 4.8,
              unidad: "mg/dL",
              referencia: "3.5-7.2",
              estado: "normal"
            },
            alt_gpt: {
              valor: 30,
              unidad: "U/L",
              referencia: "7-56",
              estado: "normal"
            },
            ast_got: {
              valor: 26,
              unidad: "U/L",
              referencia: "10-40",
              estado: "normal"
            }
          },
          toxicologia: {
            plomo: {
              valor: 9.2,
              unidad: "μg/dL",
              referencia: "<10",
              estado: "normal"
            },
            mercurio: {
              valor: 2.5,
              unidad: "μg/L",
              referencia: "<5",
              estado: "normal"
            },
            acetilcolinesterasa: {
              valor: 82,
              unidad: "%",
              referencia: ">70",
              estado: "normal"
            },
            colinesterasa_plasmatica: {
              valor: 7500,
              unidad: "U/L",
              referencia: "5400-13200",
              estado: "normal"
            }
          },
          biomarcadores: {
            ldh: {
              valor: 155,
              unidad: "U/L",
              referencia: "140-280",
              estado: "normal"
            },
            ck_total: {
              valor: 110,
              unidad: "U/L",
              referencia: "30-200",
              estado: "normal"
            },
            proteina_c_reactiva: {
              valor: 0.9,
              unidad: "mg/L",
              referencia: "<3.0",
              estado: "normal"
            }
          },
          alertas: [],
          interpretacion: "Excelente estado de laboratorio. Todos los parámetros en rangos óptimos.",
          recomendaciones: "Mantener estilo de vida actual. Control anual de rutina."
        }
      ]
    }
  }
];
