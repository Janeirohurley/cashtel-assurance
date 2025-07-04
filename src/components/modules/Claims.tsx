import React, { useState } from 'react';
import { AlertTriangle, Plus, Eye, Upload, Clock, CheckCircle, XCircle, FileText, Mic, MicOff, Play, Pause } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';

export const Claims: React.FC = () => {
  const [showNewClaimForm, setShowNewClaimForm] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [description, setDescription] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const claims = [
    {
      id: 'CLM-2024-001',
      type: 'Médical',
      description: 'Visite aux urgences pour douleur thoracique',
      amount: 2500,
      status: 'approved',
      submittedDate: '2024-11-15',
      processedDate: '2024-11-20',
      policyId: 'SUB-2024-001',
      policyName: 'Assurance Santé Premium',
      documents: ['rapport_medical.pdf', 'recu.jpg'],
      notes: 'Réclamation approuvée après examen médical. Paiement traité.',
      estimatedPayout: 2250
    },
    {
      id: 'CLM-2024-002',
      type: 'Véhicule',
      description: 'Dommages mineurs de collision au pare-chocs arrière',
      amount: 1200,
      status: 'pending',
      submittedDate: '2024-11-25',
      processedDate: null,
      policyId: 'SUB-2024-002',
      policyName: 'Assurance Véhicule',
      documents: ['rapport_police.pdf', 'photos_degats.zip'],
      notes: 'En cours d\'examen par l\'expert en sinistres.',
      estimatedPayout: 1080
    },
    {
      id: 'CLM-2024-003',
      type: 'Médical',
      description: 'Coûts de médicaments sur ordonnance',
      amount: 450,
      status: 'rejected',
      submittedDate: '2024-10-10',
      processedDate: '2024-10-15',
      policyId: 'SUB-2024-001',
      policyName: 'Assurance Santé Premium',
      documents: ['ordonnance.jpg'],
      notes: 'Médicament non couvert par les conditions actuelles de la police.',
      estimatedPayout: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      case 'processing': return 'info';
      default: return 'info';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'pending': return Clock;
      case 'rejected': return XCircle;
      case 'processing': return Clock;
      default: return Clock;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const handleViewDetails = (claimId: string) => {
    setSelectedClaim(selectedClaim === claimId ? null : claimId);
  };

  const handleNewClaim = () => {
    setShowNewClaimForm(true);
  };

  const handleSubmitClaim = () => {
    // Handle claim submission
    setShowNewClaimForm(false);
    setDescription('');
    setAudioBlob(null);
    alert('Réclamation soumise avec succès !');
  };

  // Fonctions d'enregistrement audio
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        
        // Convertir l'audio en texte (simulation)
        setTimeout(() => {
          const simulatedText = "J'ai eu un accident de voiture hier soir vers 20h30. Un autre véhicule a heurté l'arrière de ma voiture alors que j'étais arrêté à un feu rouge. Les dégâts semblent importants au niveau du pare-chocs et du coffre. J'ai appelé la police et nous avons fait un constat. L'autre conducteur a reconnu sa responsabilité.";
          setDescription(prev => prev + (prev ? ' ' : '') + simulatedText);
        }, 2000);
        
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Erreur lors du démarrage de l\'enregistrement:', error);
      alert('Impossible d\'accéder au microphone. Veuillez vérifier les permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const playAudio = () => {
    if (audioBlob) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.onended = () => setIsPlaying(false);
      audio.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-dark-500">Réclamations & Demandes</h1>
        <Button variant="primary" onClick={handleNewClaim}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Réclamation
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Total Réclamations</p>
                <p className="text-2xl font-bold text-dark-500">{claims.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Approuvées</p>
                <p className="text-2xl font-bold text-success-600">
                  {claims.filter(c => c.status === 'approved').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">En Attente</p>
                <p className="text-2xl font-bold text-warning-600">
                  {claims.filter(c => c.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dark-400">Montant Total</p>
                <p className="text-2xl font-bold text-dark-500">
                  ${claims.reduce((sum, c) => sum + c.amount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Claim Form */}
      {showNewClaimForm && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-dark-500">Nouvelle Réclamation</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-500 mb-2">
                  Type de réclamation
                </label>
                <select className="w-full p-2 border border-light-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Sélectionner le type</option>
                  <option value="medical">Médical</option>
                  <option value="vehicle">Véhicule</option>
                  <option value="property">Propriété</option>
                  <option value="life">Vie</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-500 mb-2">
                  Police d'assurance
                </label>
                <select className="w-full p-2 border border-light-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Sélectionner la police</option>
                  <option value="SUB-2024-001">Assurance Santé Premium</option>
                  <option value="SUB-2024-002">Assurance Véhicule</option>
                </select>
              </div>
            </div>

            <Input
              label="Montant de la réclamation"
              type="number"
              placeholder="0.00"
              fullWidth
            />

            <div>
              <label className="block text-sm font-medium text-dark-500 mb-2">
                Description
              </label>
              <div className="space-y-3">
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-light-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Décrivez l'incident et les détails de la réclamation..."
                />
                
                {/* Audio Recording Controls */}
                <div className="flex items-center space-x-3 p-3 bg-light-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    {!isRecording ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        icon={Mic}
                        onClick={startRecording}
                        className="text-primary-600 border-primary-300 hover:bg-primary-50"
                      >
                        Enregistrer
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        icon={MicOff}
                        onClick={stopRecording}
                        className="text-error-600 border-error-300 hover:bg-error-50 animate-pulse"
                      >
                        Arrêter
                      </Button>
                    )}
                    
                    {audioBlob && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        icon={isPlaying ? Pause : Play}
                        onClick={isPlaying ? pauseAudio : playAudio}
                        className="text-accent-600"
                      >
                        {isPlaying ? 'Pause' : 'Écouter'}
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    {isRecording && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-error-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-dark-500">Enregistrement en cours...</span>
                      </div>
                    )}
                    {audioBlob && !isRecording && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                        <span className="text-sm text-dark-500">Enregistrement terminé - Transcription automatique ajoutée</span>
                      </div>
                    )}
                    {!isRecording && !audioBlob && (
                      <span className="text-sm text-dark-400">Cliquez sur "Enregistrer" pour décrire votre réclamation vocalement</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-500 mb-2">
                Documents justificatifs
              </label>
              <div className="border-2 border-dashed border-light-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-dark-400 mx-auto mb-2" />
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                  id="claim-documents"
                />
                <label htmlFor="claim-documents" className="cursor-pointer">
                  <span className="text-primary-600 hover:text-primary-700">
                    Cliquez pour télécharger des fichiers
                  </span>
                  <span className="text-dark-400"> ou glissez-déposez</span>
                </label>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="primary"
                onClick={handleSubmitClaim}
                fullWidth
              >
                Soumettre la réclamation
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowNewClaimForm(false);
                  setDescription('');
                  setAudioBlob(null);
                }}
                fullWidth
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Claims List */}
      <div className="space-y-4">
        {claims.map((claim) => {
          const StatusIcon = getStatusIcon(claim.status);
          return (
            <Card key={claim.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-dark-500">{claim.description}</h3>
                      <p className="text-sm text-dark-400">ID: {claim.id} • {claim.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={getStatusColor(claim.status)} size="sm">
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {claim.status === 'approved' ? 'Approuvée' : 
                       claim.status === 'pending' ? 'En attente' : 
                       claim.status === 'rejected' ? 'Rejetée' : claim.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Eye}
                      onClick={() => handleViewDetails(claim.id)}
                    >
                      {selectedClaim === claim.id ? 'Masquer' : 'Voir'} Détails
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-dark-400">Montant réclamé</p>
                    <p className="text-sm font-medium text-dark-500">${claim.amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-dark-400">Paiement estimé</p>
                    <p className="text-sm font-medium text-dark-500">${claim.estimatedPayout}</p>
                  </div>
                  <div>
                    <p className="text-xs text-dark-400">Soumise le</p>
                    <p className="text-sm font-medium text-dark-500">{formatDate(claim.submittedDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-dark-400">Police</p>
                    <p className="text-sm font-medium text-dark-500">{claim.policyName}</p>
                  </div>
                </div>

                {selectedClaim === claim.id && (
                  <div className="border-t border-light-300 pt-4 space-y-4">
                    <div>
                      <h4 className="font-medium text-dark-500 mb-2">Notes de la réclamation</h4>
                      <p className="text-sm text-dark-400">{claim.notes}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-dark-500 mb-2">Documents justificatifs</h4>
                      <div className="flex flex-wrap gap-2">
                        {claim.documents.map((doc, index) => (
                          <div key={index} className="flex items-center space-x-2 bg-light-200 px-3 py-1 rounded-lg">
                            <FileText className="w-4 h-4 text-dark-400" />
                            <span className="text-sm text-dark-500">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {claim.processedDate && (
                      <div>
                        <p className="text-sm font-medium text-dark-500">Date de traitement</p>
                        <p className="text-sm text-dark-400">{formatDate(claim.processedDate)}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {claims.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-dark-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-dark-500 mb-2">Aucune réclamation</h3>
            <p className="text-dark-400 mb-4">
              Vous n'avez encore déposé aucune réclamation d'assurance.
            </p>
            <Button variant="primary" onClick={handleNewClaim}>
              Déposer votre première réclamation
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};