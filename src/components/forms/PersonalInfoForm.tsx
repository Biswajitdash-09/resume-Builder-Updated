
import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { PersonalInfo } from '../../types/resume';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleChange('profilePicture', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    handleChange('profilePicture', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Personal Information</h3>
      
      {/* Profile Picture Section */}
      <div className="space-y-2">
        <Label>Profile Picture</Label>
        <div className="flex items-center gap-4">
          {data.profilePicture ? (
            <div className="relative">
              <img
                src={data.profilePicture}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                onClick={removeProfilePicture}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <Upload className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </Button>
            <p className="text-xs text-gray-500 mt-1">
              Recommended: Square image, max 2MB
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="John"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Doe"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john.doe@email.com"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
          required
        />
      </div>

      <div>
        <Label htmlFor="linkedin">LinkedIn Profile</Label>
        <Input
          id="linkedin"
          value={data.linkedin}
          onChange={(e) => handleChange('linkedin', e.target.value)}
          placeholder="linkedin.com/in/johndoe"
        />
      </div>

      <div>
        <Label htmlFor="github">GitHub Profile</Label>
        <Input
          id="github"
          value={data.github}
          onChange={(e) => handleChange('github', e.target.value)}
          placeholder="github.com/johndoe"
        />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={data.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="City, State, Country"
        />
      </div>
    </div>
  );
};
