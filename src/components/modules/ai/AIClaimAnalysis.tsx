import React, { useState } from 'react';
import { Upload, FileText, AlertTriangle, CheckCircle, Clock, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { aiService } from '../../../services/aiService';
import { AIClaimAnalysis as AIClaimAnalysisType } from '../../../types/api';

export const AIClaimAnalysis: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [claimType, setClaimType] = useState('');
  const [description, setDescription] = useState('');
  const [analysis, setAnalysis] = useState<AIClaimAnalysisType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleAnalyze = async () => {
    if (!files.length || !claimType || !description) return;

    setLoading(true);
    try {
      const result = await aiService.analyzeClaim({
        claimId: `CLAIM-${Date.now()}`,
        documents: files,
        claimType,
        description
      });
      setAnalysis(result);
    } catch (error) {
      console.error('Échec de l\'analyse:', error);
      alert('Erreur lors de l\'analyse. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validated':
        return 'success';
      case 'requiresReview':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'info';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
      case 'critical':
        return 'error';
      default:
        return 'info';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-dark-500 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-primary-500" />
            Analyse IA des Réclamations
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-500 mb-2">
              Type de réclamation
            </label>
            <select
              value={claimType}
              onChange={(e) => setClaimType(e.target.value)}
              className="w-full p-2 border border-light-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Sélectionner le type de réclamation</option>
              <option value="health">Assurance Santé</option>
              <option value="vehicle">Assurance Véhicule</option>
              <option value="property">Assurance Propriété</option>
              <option value="life">Assurance Vie</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-500 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-2 border border-light-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Décrivez les détails de la réclamation..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-500 mb-2">
              Télécharger des documents
            </label>
            <div className="border-2 border-dashed border-light-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-dark-400 mx-auto mb-2" />
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-primary-600 hover:text-primary-700">
                  Cliquez pour télécharger des fichiers
                </span>
                <span className="text-dark-400"> ou glissez-déposez</span>
              </label>
              {files.length > 0 && (
                <div className="mt-2 text-sm text-dark-500">
                  {files.length} fichier(s) sélectionné(s)
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            loading={loading}
            disabled={!files.length || !claimType || !description}
            fullWidth
          >
            Analyser la réclamation
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-dark-500">Résultats de l'analyse</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-dark-500">
                  {(analysis.confidence_score * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-dark-400">Score de confiance</div>
              </div>
              <div className="text-center">
                <Badge variant={getStatusColor(analysis.status)} size="lg">
                  {analysis.status}
                </Badge>
                <div className="text-sm text-dark-400 mt-1">Statut</div>
              </div>
              <div className="text-center">
                <Badge variant={getRiskColor(analysis.fraud_risk_level)} size="lg">
                  {analysis.fraud_risk_level}
                </Badge>
                <div className="text-sm text-dark-400 mt-1">Risque de fraude</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-dark-500 mb-3 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-warning-500" />
                  Problèmes détectés
                </h4>
                <ul className="space-y-2">
                  {analysis.detected_issues.map((issue, index) => (
                    <li key={index} className="text-sm text-dark-400 flex items-start">
                      <span className="w-2 h-2 bg-warning-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-dark-500 mb-3 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-success-500" />
                  Recommandations
                </h4>
                <ul className="space-y-2">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="text-sm text-dark-400 flex items-start">
                      <span className="w-2 h-2 bg-success-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-light-200 p-4 rounded-lg">
              <h4 className="font-medium text-dark-500 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-primary-500" />
                Temps de traitement estimé
              </h4>
              <p className="text-sm text-dark-400">
                {analysis.estimated_processing_time.days} jours, {analysis.estimated_processing_time.hours} heures
                <Badge variant="info" size="sm" className="ml-2">
                  Priorité {analysis.estimated_processing_time.priority}
                </Badge>
              </p>
            </div>

            <div>
              <h4 className="font-medium text-dark-500 mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-primary-500" />
                Analyse des documents
              </h4>
              <div className="space-y-3">
                {analysis.document_analyses.map((doc, index) => (
                  <div key={index} className="border border-light-300 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-dark-500">{doc.document_type}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant={doc.is_authentic ? 'success' : 'error'} size="sm">
                          {doc.is_authentic ? 'Authentique' : 'Suspect'}
                        </Badge>
                        <span className="text-sm text-dark-400">
                          {(doc.quality_score * 100).toFixed(1)}% qualité
                        </span>
                      </div>
                    </div>
                    {doc.anomalies.length > 0 && (
                      <div className="text-sm text-error-600">
                        Anomalies: {doc.anomalies.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};