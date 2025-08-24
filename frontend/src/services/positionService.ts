import axios from 'axios';

// URL base de la API (configurar según el entorno)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Servicio para manejar operaciones relacionadas con posiciones
 */
export class PositionService {
    /**
     * Obtiene el flujo de entrevistas para una posición específica
     * @param positionId - ID de la posición
     * @returns Información del flujo de entrevistas
     */
    static async getInterviewFlow(positionId: string | number): Promise<any> {
        try {
            // Para pruebas, usamos datos simulados
            await new Promise(resolve => setTimeout(resolve, 500)); // Simular latencia
            
            const mockData = {
                positionName: positionId === '1' ? 'Senior Backend Engineer' : 
                             positionId === '2' ? 'Junior Android Engineer' : 
                             'Product Manager',
                interviewFlow: {
                    id: 1,
                    description: "Standard development interview process",
                    interviewSteps: [
                        {
                            id: 1,
                            interviewFlowId: 1,
                            interviewTypeId: 1,
                            name: "Initial Screening",
                            orderIndex: 1
                        },
                        {
                            id: 2,
                            interviewFlowId: 1,
                            interviewTypeId: 2,
                            name: "Technical Interview",
                            orderIndex: 2
                        },
                        {
                            id: 3,
                            interviewFlowId: 1,
                            interviewTypeId: 3,
                            name: "Manager Interview",
                            orderIndex: 3
                        },
                        {
                            id: 4,
                            interviewFlowId: 1,
                            interviewTypeId: 4,
                            name: "Final Interview",
                            orderIndex: 4
                        }
                    ]
                }
            };
            
            return mockData;
            
            // Código original para cuando el backend esté disponible:
            // const response = await axios.get(`${API_BASE_URL}/positions/${positionId}/interviewFlow`);
            // return response.data;
        } catch (error) {
            console.error('Error obteniendo flujo de entrevistas:', error);
            throw new Error('No se pudo obtener el flujo de entrevistas');
        }
    }

    /**
     * Obtiene todos los candidatos para una posición específica
     * @param positionId - ID de la posición
     * @returns Lista de candidatos
     */
    static async getCandidates(positionId: string | number): Promise<any> {
        try {
            // Para pruebas, usamos datos simulados
            await new Promise(resolve => setTimeout(resolve, 300)); // Simular latencia
            
            const mockCandidates = [
                {
                    id: 1,
                    applicationId: 101,
                    fullName: "Jane Smith",
                    currentInterviewStep: "Technical Interview",
                    averageScore: 4.2
                },
                {
                    id: 2,
                    applicationId: 102,
                    fullName: "Carlos García",
                    currentInterviewStep: "Initial Screening",
                    averageScore: 0
                },
                {
                    id: 3,
                    applicationId: 103,
                    fullName: "John Doe",
                    currentInterviewStep: "Manager Interview",
                    averageScore: 4.8
                },
                {
                    id: 4,
                    applicationId: 104,
                    fullName: "Ana Rodriguez",
                    currentInterviewStep: "Initial Screening",
                    averageScore: 3.5
                },
                {
                    id: 5,
                    applicationId: 105,
                    fullName: "Michael Johnson",
                    currentInterviewStep: "Final Interview",
                    averageScore: 4.6
                },
                {
                    id: 6,
                    applicationId: 106,
                    fullName: "Sophie Chen",
                    currentInterviewStep: "Technical Interview",
                    averageScore: 4.1
                }
            ];
            
            return mockCandidates;
            
            // Código original para cuando el backend esté disponible:
            // const response = await axios.get(`${API_BASE_URL}/positions/${positionId}/candidates`);
            // return response.data;
        } catch (error) {
            console.error('Error obteniendo candidatos:', error);
            throw new Error('No se pudo obtener la lista de candidatos');
        }
    }

    /**
     * Actualiza la etapa del candidato
     * @param candidateId - ID del candidato
     * @param applicationId - ID de la aplicación
     * @param newInterviewStepId - ID de la nueva etapa
     * @returns Respuesta de la actualización
     */
    static async updateCandidateStage(
        candidateId: string | number, 
        applicationId: string | number, 
        newInterviewStepId: string | number
    ): Promise<any> {
        try {
            // Para pruebas, simulamos una actualización exitosa
            await new Promise(resolve => setTimeout(resolve, 200)); // Simular latencia
            
            console.log(`Actualizando candidato ${candidateId} a etapa ${newInterviewStepId}`);
            
            const mockResponse = {
                message: "Candidate stage updated successfully",
                data: {
                    id: candidateId,
                    applicationId: applicationId,
                    currentInterviewStep: newInterviewStepId,
                    updatedAt: new Date().toISOString()
                }
            };
            
            return mockResponse;
            
            // Código original para cuando el backend esté disponible:
            // const response = await axios.put(`${API_BASE_URL}/candidates/${candidateId}/stage`, {
            //     applicationId: applicationId,
            //     currentInterviewStep: newInterviewStepId
            // });
            // return response.data;
        } catch (error) {
            console.error('Error actualizando etapa del candidato:', error);
            throw new Error('No se pudo actualizar la etapa del candidato');
        }
    }
}

export default PositionService;
