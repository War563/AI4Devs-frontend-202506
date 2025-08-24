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
            const response = await axios.get(`${API_BASE_URL}/positions/${positionId}/interviewFlow`);
            return response.data;
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
            const response = await axios.get(`${API_BASE_URL}/positions/${positionId}/candidates`);
            return response.data;
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
            const response = await axios.put(`${API_BASE_URL}/candidates/${candidateId}/stage`, {
                applicationId: applicationId,
                currentInterviewStep: newInterviewStepId
            });
            return response.data;
        } catch (error) {
            console.error('Error actualizando etapa del candidato:', error);
            throw new Error('No se pudo actualizar la etapa del candidato');
        }
    }
}

export default PositionService;
