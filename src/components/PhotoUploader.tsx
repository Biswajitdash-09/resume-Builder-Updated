import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Camera, Upload, X, User } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PhotoUploaderProps {
  photo?: string;
  showPhoto: boolean;
  photoShape: 'circle' | 'rounded' | 'square';
  photoSize: 'small' | 'medium' | 'large';
  onPhotoChange: (photo: string | undefined) => void;
  onShowPhotoChange: (show: boolean) => void;
  onPhotoShapeChange: (shape: 'circle' | 'rounded' | 'square') => void;
  onPhotoSizeChange: (size: 'small' | 'medium' | 'large') => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photo,
  showPhoto,
  photoShape,
  photoSize,
  onPhotoChange,
  onShowPhotoChange,
  onPhotoShapeChange,
  onPhotoSizeChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // Resize image to reduce storage size
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        const resizedPhoto = canvas.toDataURL('image/jpeg', 0.8);
        onPhotoChange(resizedPhoto);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const getPhotoShapeClass = () => {
    switch (photoShape) {
      case 'circle':
        return 'rounded-full';
      case 'rounded':
        return 'rounded-lg';
      case 'square':
        return 'rounded-none';
      default:
        return 'rounded-full';
    }
  };

  const getPhotoSizeClass = () => {
    switch (photoSize) {
      case 'small':
        return 'w-16 h-16';
      case 'medium':
        return 'w-24 h-24';
      case 'large':
        return 'w-32 h-32';
      default:
        return 'w-24 h-24';
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          <Label className="text-sm font-medium">Profile Photo</Label>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="show-photo" className="text-xs text-muted-foreground">
            Show in Resume
          </Label>
          <Switch
            id="show-photo"
            checked={showPhoto}
            onCheckedChange={onShowPhotoChange}
          />
        </div>
      </div>

      <div className="flex gap-4 items-start">
        {/* Photo Preview / Upload Area */}
        <div
          className={`relative flex items-center justify-center border-2 border-dashed transition-all duration-200 ${getPhotoSizeClass()} ${getPhotoShapeClass()} ${
            isDragging ? 'border-primary bg-primary/10' : 'border-border'
          } ${photo ? 'border-solid' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {photo ? (
            <>
              <img
                src={photo}
                alt="Profile"
                className={`w-full h-full object-cover ${getPhotoShapeClass()}`}
              />
              <button
                onClick={() => onPhotoChange(undefined)}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/80 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </>
          ) : (
            <div className="text-center p-2">
              <User className="h-8 w-8 mx-auto text-muted-foreground/50" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            {photo ? 'Change Photo' : 'Upload Photo'}
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Shape</Label>
              <Select value={photoShape} onValueChange={(v) => onPhotoShapeChange(v as any)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="circle">Circle</SelectItem>
                  <SelectItem value="rounded">Rounded</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Size</Label>
              <Select value={photoSize} onValueChange={(v) => onPhotoSizeChange(v as any)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Drag and drop an image or click to upload. Recommended: Square image, max 2MB.
        Note: Some ATS systems may not process photos.
      </p>
    </div>
  );
};
