import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useParams, useNavigate } from 'react-router-dom';
import PositionService from '../services/positionService';
import './PositionKanban.css';

// Interfaces para TypeScript
interface InterviewStep {
    id: number;
    interviewFlowId: number;
    interviewTypeId: number;
    name: string;
    orderIndex: number;
}

interface InterviewFlow {
    id: number;
    description: string;
    interviewSteps: InterviewStep[];
}

interface PositionData {
    positionName: string;
    interviewFlow: InterviewFlow;
}

interface Candidate {
    id?: number;
    applicationId?: number;
    fullName: string;
    currentInterviewStep: string;
    averageScore: number;
}

const PositionKanban: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    // Estados del componente
    const [positionData, setPositionData] = useState<PositionData | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [draggedCandidate, setDraggedCandidate] = useState<Candidate | null>(null);

    /**
     * Función para cargar los datos de la posición y candidatos
     */
    const loadPositionData = useCallback(async () => {
        if (!id) return;
        
        try {
            setLoading(true);
            setError(null);

            // Cargar datos en paralelo
            const [positionResponse, candidatesResponse] = await Promise.all([
                PositionService.getInterviewFlow(id),
                PositionService.getCandidates(id)
            ]);

            setPositionData(positionResponse);
            setCandidates(candidatesResponse);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error cargando datos');
        } finally {
            setLoading(false);
        }
    }, [id]);

    // Cargar datos al montar el componente
    useEffect(() => {
        loadPositionData();
    }, [loadPositionData]);

    /**
     * Maneja el inicio del drag
     */
    const handleDragStart = (e: React.DragEvent, candidate: Candidate) => {
        setDraggedCandidate(candidate);
        e.dataTransfer.effectAllowed = 'move';
    };

    /**
     * Maneja el evento dragover para permitir el drop
     */
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    /**
     * Maneja el drop del candidato en una nueva columna
     */
    const handleDrop = async (e: React.DragEvent, targetStep: InterviewStep) => {
        e.preventDefault();
        
        if (!draggedCandidate) return;

        // Verificar si el candidato ya está en esa etapa
        if (draggedCandidate.currentInterviewStep === targetStep.name) {
            setDraggedCandidate(null);
            return;
        }

        try {
            // Actualizar en el backend
            await PositionService.updateCandidateStage(
                draggedCandidate.id || 1, // Usar un ID por defecto si no está disponible
                draggedCandidate.applicationId || 1, // Usar un ID por defecto si no está disponible
                targetStep.id
            );

            // Actualizar el estado local
            setCandidates(prev => 
                prev.map(candidate => 
                    candidate === draggedCandidate 
                        ? { ...candidate, currentInterviewStep: targetStep.name }
                        : candidate
                )
            );
        } catch (err) {
            setError('Error actualizando la etapa del candidato');
            console.error(err);
        } finally {
            setDraggedCandidate(null);
        }
    };

    /**
     * Obtiene los candidatos para una etapa específica
     */
    const getCandidatesForStep = (stepName: string): Candidate[] => {
        return candidates.filter(candidate => candidate.currentInterviewStep === stepName);
    };

    /**
     * Obtiene el color de la puntuación basado en el valor
     */
    const getScoreColor = (score: number): string => {
        if (score === 0) return 'text-muted';
        if (score <= 2) return 'text-danger';
        if (score <= 3) return 'text-warning';
        return 'text-success';
    };

    /**
     * Maneja el botón de volver
     */
    const handleBack = () => {
        navigate('/positions');
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p className="mt-3">Cargando datos de la posición...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{error}</p>
                    <Button variant="outline-danger" onClick={loadPositionData}>
                        Reintentar
                    </Button>
                </Alert>
            </Container>
        );
    }

    if (!positionData) {
        return (
            <Container className="mt-5">
                <Alert variant="warning">
                    No se encontraron datos para esta posición.
                </Alert>
            </Container>
        );
    }

    return (
        <Container fluid className="position-kanban mt-4">
            {/* Header con título y botón de volver */}
            <Row className="mb-4">
                <Col>
                    <div className="d-flex align-items-center">
                        <Button 
                            variant="outline-secondary" 
                            className="me-3"
                            onClick={handleBack}
                        >
                            <ArrowLeft className="me-1" />
                            Volver
                        </Button>
                        <h2 className="mb-0">{positionData.positionName}</h2>
                    </div>
                </Col>
            </Row>

            {/* Kanban Board */}
            <Row className="kanban-board">
                {positionData.interviewFlow.interviewSteps
                    .sort((a, b) => a.orderIndex - b.orderIndex)
                    .map((step) => (
                    <Col 
                        key={step.id} 
                        lg={3} 
                        md={6} 
                        className="mb-4 kanban-column"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, step)}
                    >
                        <div className="kanban-column-header">
                            <h5 className="text-center p-3 bg-light rounded-top">
                                {step.name}
                                <span className="badge bg-secondary ms-2">
                                    {getCandidatesForStep(step.name).length}
                                </span>
                            </h5>
                        </div>
                        
                        <div className="kanban-column-body">
                            {getCandidatesForStep(step.name).map((candidate, index) => (
                                <Card 
                                    key={`${candidate.fullName}-${index}`}
                                    className="mb-3 candidate-card"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, candidate)}
                                    style={{ cursor: 'move' }}
                                >
                                    <Card.Body>
                                        <Card.Title className="h6 mb-2">
                                            {candidate.fullName}
                                        </Card.Title>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="text-muted small">Puntuación:</span>
                                            <span className={`fw-bold ${getScoreColor(candidate.averageScore)}`}>
                                                {candidate.averageScore > 0 ? candidate.averageScore.toFixed(1) : 'N/A'}
                                            </span>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                            
                            {/* Mensaje cuando no hay candidatos */}
                            {getCandidatesForStep(step.name).length === 0 && (
                                <div className="text-center p-4 text-muted">
                                    <p className="mb-0">No hay candidatos en esta fase</p>
                                </div>
                            )}
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PositionKanban;
