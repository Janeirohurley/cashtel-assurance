import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Download, Share2, Copy, Camera, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import QRCodeLib from 'qrcode';
import QrScanner from 'qr-scanner';

interface QRCodeGeneratorProps {
  subscriptionId: string;
  productName: string;
  clientName: string;
  validUntil: string;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  subscriptionId,
  productName,
  clientName,
  validUntil
}) => {
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);

  // Generate QR code data
  const qrData = {
    subscriptionId,
    productName,
    clientName,
    validUntil,
    issuer: 'Cashtel Assurance',
    timestamp: new Date().toISOString(),
    verificationUrl: `https://verify.cashtelassurance.com/${subscriptionId}`
  };

  const qrCodeValue = JSON.stringify(qrData);

  useEffect(() => {
    generateQRCode();
  }, [subscriptionId, productName, clientName, validUntil]);

  const generateQRCode = async () => {
    try {
      const dataURL = await QRCodeLib.toDataURL(qrCodeValue, {
        width: 256,
        margin: 2,
        color: {
          dark: '#001D23',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      });
      setQrCodeDataURL(dataURL);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleDownload = () => {
    if (!qrCodeDataURL) return;

    const link = document.createElement('a');
    link.download = `insurance-card-${subscriptionId}.png`;
    link.href = qrCodeDataURL;
    link.click();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeValue);
      // You could add a toast notification here
      alert('QR code data copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Insurance Card - Cashtel Assurance',
          text: `Insurance card for ${clientName} - ${productName}`,
          url: qrData.verificationUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopy();
    }
  };

  const startScanning = async () => {
    if (!videoRef.current) return;

    try {
      setIsScanning(true);
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          setScannedData(result.data);
          stopScanning();
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      await qrScannerRef.current.start();
    } catch (error) {
      console.error('Error starting QR scanner:', error);
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await QrScanner.scanImage(file);
      setScannedData(result);
    } catch (error) {
      console.error('Error scanning uploaded image:', error);
      alert('No QR code found in the uploaded image.');
    }
  };

  const parseScannedData = () => {
    try {
      return JSON.parse(scannedData);
    } catch {
      return null;
    }
  };

  const parsedData = parseScannedData();

  return (
    <div className="space-y-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Digital Insurance Card</h3>
            <Badge variant="success">Active</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">Product: <span className="font-medium text-gray-900">{productName}</span></p>
              <p className="text-sm text-gray-600">Client: <span className="font-medium text-gray-900">{clientName}</span></p>
              <p className="text-sm text-gray-600">Valid Until: <span className="font-medium text-gray-900">{validUntil}</span></p>
              <p className="text-sm text-gray-600">ID: <span className="font-mono text-xs text-gray-800">{subscriptionId}</span></p>
            </div>
            
            {/* QR Code Display */}
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200 flex justify-center">
              {qrCodeDataURL ? (
                <img src={qrCodeDataURL} alt="QR Code" className="w-48 h-48" />
              ) : (
                <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Generating QR Code...</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <QrCode className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-blue-800">Scan this QR code to verify your insurance coverage</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={Download}
              onClick={handleDownload}
              disabled={!qrCodeDataURL}
            >
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={Copy}
              onClick={handleCopy}
            >
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={Share2}
              onClick={handleShare}
            >
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Scanner */}
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">QR Code Scanner</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isScanning ? (
            <div className="space-y-3">
              <Button
                variant="primary"
                icon={Camera}
                onClick={startScanning}
                fullWidth
              >
                Start Camera Scanner
              </Button>
              
              <div className="text-center text-gray-500">or</div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                icon={Upload}
                onClick={() => fileInputRef.current?.click()}
                fullWidth
              >
                Upload Image
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <video
                ref={videoRef}
                className="w-full h-64 bg-black rounded-lg"
                playsInline
              />
              <Button
                variant="outline"
                onClick={stopScanning}
                fullWidth
              >
                Stop Scanning
              </Button>
            </div>
          )}

          {scannedData && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Scanned QR Code:</h4>
              {parsedData ? (
                <div className="space-y-1 text-sm text-green-700">
                  <p><strong>Subscription ID:</strong> {parsedData.subscriptionId}</p>
                  <p><strong>Product:</strong> {parsedData.productName}</p>
                  <p><strong>Client:</strong> {parsedData.clientName}</p>
                  <p><strong>Valid Until:</strong> {parsedData.validUntil}</p>
                  <p><strong>Issuer:</strong> {parsedData.issuer}</p>
                </div>
              ) : (
                <p className="text-sm text-green-700 font-mono break-all">{scannedData}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};