import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PersonalInfo } from '../../types/resume';
import { PhotoUploader } from '../PhotoUploader';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string | boolean) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Personal Information</h3>
      
      {/* Photo Upload */}
      <PhotoUploader
        photo={data.photo}
        showPhoto={data.showPhoto}
        photoShape={data.photoShape}
        photoSize={data.photoSize}
        onPhotoChange={(photo) => handleChange('photo', photo || '')}
        onShowPhotoChange={(show) => handleChange('showPhoto', show)}
        onPhotoShapeChange={(shape) => handleChange('photoShape', shape)}
        onPhotoSizeChange={(size) => handleChange('photoSize', size)}
      />
      
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
        <Label htmlFor="title">Professional Title</Label>
        <Input
          id="title"
          value={data.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Senior Software Engineer"
        />
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
        <Label htmlFor="website">Personal Website</Label>
        <Input
          id="website"
          value={data.website || ''}
          onChange={(e) => handleChange('website', e.target.value)}
          placeholder="johndoe.dev"
        />
      </div>

      <div>
        <Label htmlFor="portfolio">Portfolio</Label>
        <Input
          id="portfolio"
          value={data.portfolio || ''}
          onChange={(e) => handleChange('portfolio', e.target.value)}
          placeholder="portfolio.johndoe.com"
        />
      </div>

      <div>
        <Label htmlFor="twitter">Twitter / X</Label>
        <Input
          id="twitter"
          value={data.twitter || ''}
          onChange={(e) => handleChange('twitter', e.target.value)}
          placeholder="@johndoe"
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
