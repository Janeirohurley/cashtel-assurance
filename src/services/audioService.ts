// Service pour la gestion de l'audio et la transcription
class AudioService {
  private static instance: AudioService;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: BlobPart[] = [];

  static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  async startRecording(): Promise<MediaRecorder> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });

      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(1000); // Collect data every second
      return this.mediaRecorder;
    } catch (error) {
      throw new Error('Impossible d\'accéder au microphone. Vérifiez les permissions.');
    }
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('Aucun enregistrement en cours'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        
        // Stop all tracks
        if (this.mediaRecorder?.stream) {
          this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
        
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  async transcribeAudio(audioBlob: Blob): Promise<string> {
    // Simulation de transcription - dans un vrai projet, vous utiliseriez un service comme:
    // - Google Speech-to-Text
    // - Azure Speech Services
    // - AWS Transcribe
    // - OpenAI Whisper API
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Texte simulé pour la démonstration
        const simulatedTranscriptions = [
          "J'ai eu un accident de voiture hier soir vers 20h30. Un autre véhicule a heurté l'arrière de ma voiture alors que j'étais arrêté à un feu rouge. Les dégâts semblent importants au niveau du pare-chocs et du coffre. J'ai appelé la police et nous avons fait un constat. L'autre conducteur a reconnu sa responsabilité.",
          "Je souhaite déclarer un sinistre médical. J'ai été hospitalisé en urgence suite à une chute dans les escaliers de mon domicile. J'ai subi une fracture du poignet droit et j'ai dû passer une radio et porter un plâtre. Les frais médicaux s'élèvent à environ 800 euros.",
          "Ma maison a subi des dégâts importants suite à la tempête de la semaine dernière. Le toit a été endommagé et il y a eu des infiltrations d'eau dans le salon et la chambre principale. J'ai fait appel à une entreprise de couverture pour une estimation des réparations.",
          "Je déclare le vol de mon téléphone portable qui s'est produit hier dans le métro. J'ai immédiatement porté plainte au commissariat et j'ai le récépissé. Le téléphone était un iPhone 14 Pro acheté il y a 6 mois."
        ];
        
        const randomIndex = Math.floor(Math.random() * simulatedTranscriptions.length);
        resolve(simulatedTranscriptions[randomIndex]);
      }, 2000); // Simule un délai de traitement
    });
  }

  async convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove data:audio/webm;base64, prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  createAudioURL(blob: Blob): string {
    return URL.createObjectURL(blob);
  }

  revokeAudioURL(url: string): void {
    URL.revokeObjectURL(url);
  }

  isRecordingSupported(): boolean {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  }

  async getAudioDevices(): Promise<MediaDeviceInfo[]> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.filter(device => device.kind === 'audioinput');
    } catch (error) {
      console.error('Erreur lors de la récupération des périphériques audio:', error);
      return [];
    }
  }
}

export const audioService = AudioService.getInstance();