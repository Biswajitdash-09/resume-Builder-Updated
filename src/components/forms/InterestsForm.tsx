
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Interest } from '../../types/resume';

interface InterestsFormProps {
  data: Interest[];
  onChange: (data: Interest[]) => void;
}

export const InterestsForm: React.FC<InterestsFormProps> = ({ data, onChange }) => {
  const [newInterest, setNewInterest] = useState('');

  const addInterest = () => {
    if (newInterest.trim()) {
      const interest: Interest = {
        id: Date.now().toString(),
        name: newInterest.trim()
      };
      onChange([...data, interest]);
      setNewInterest('');
    }
  };

  const removeInterest = (id: string) => {
    onChange(data.filter(interest => interest.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addInterest();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Interests & Hobbies</h3>
      
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="interestName">Interest or Hobby</Label>
          <Input
            id="interestName"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., Photography, Hiking, Chess"
          />
        </div>
        <Button onClick={addInterest} size="sm" className="mt-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {data.map((interest) => (
          <Badge
            key={interest.id}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {interest.name}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeInterest(interest.id)}
              className="h-auto p-0 ml-1 hover:bg-transparent"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Optional section. Add interests that might be relevant to your target role or show your personality.
      </p>
    </div>
  );
};
