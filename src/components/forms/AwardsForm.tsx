import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Trophy } from 'lucide-react';
import { Award } from '../../types/resume';

interface AwardsFormProps {
  data: Award[];
  onChange: (data: Award[]) => void;
}

export const AwardsForm: React.FC<AwardsFormProps> = ({ data, onChange }) => {
  const addAward = () => {
    const newAward: Award = {
      id: Date.now().toString(),
      title: '',
      issuer: '',
      date: '',
      description: '',
    };
    onChange([...data, newAward]);
  };

  const updateAward = (id: string, field: keyof Award, value: string) => {
    onChange(
      data.map((award) =>
        award.id === id ? { ...award, [field]: value } : award
      )
    );
  };

  const removeAward = (id: string) => {
    onChange(data.filter((award) => award.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Awards & Honors</h3>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addAward}>
          <Plus className="h-4 w-4 mr-2" />
          Add Award
        </Button>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No awards added yet. Click "Add Award" to get started.
        </p>
      ) : (
        <div className="space-y-4">
          {data.map((award, index) => (
            <div
              key={award.id}
              className="p-4 border rounded-lg space-y-4 bg-muted/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Award #{index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAward(award.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`title-${award.id}`}>Award Title *</Label>
                  <Input
                    id={`title-${award.id}`}
                    value={award.title}
                    onChange={(e) =>
                      updateAward(award.id, 'title', e.target.value)
                    }
                    placeholder="Employee of the Year"
                  />
                </div>

                <div>
                  <Label htmlFor={`issuer-${award.id}`}>Issuing Organization *</Label>
                  <Input
                    id={`issuer-${award.id}`}
                    value={award.issuer}
                    onChange={(e) =>
                      updateAward(award.id, 'issuer', e.target.value)
                    }
                    placeholder="Company Name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`date-${award.id}`}>Date Received</Label>
                <Input
                  id={`date-${award.id}`}
                  type="month"
                  value={award.date}
                  onChange={(e) =>
                    updateAward(award.id, 'date', e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor={`description-${award.id}`}>Description (Optional)</Label>
                <Textarea
                  id={`description-${award.id}`}
                  value={award.description || ''}
                  onChange={(e) =>
                    updateAward(award.id, 'description', e.target.value)
                  }
                  placeholder="Brief description of the award..."
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
