import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Heart } from 'lucide-react';
import { VolunteerExperience } from '../../types/resume';

interface VolunteerFormProps {
  data: VolunteerExperience[];
  onChange: (data: VolunteerExperience[]) => void;
}

export const VolunteerForm: React.FC<VolunteerFormProps> = ({ data, onChange }) => {
  const addVolunteer = () => {
    const newVolunteer: VolunteerExperience = {
      id: Date.now().toString(),
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...data, newVolunteer]);
  };

  const updateVolunteer = (
    id: string,
    field: keyof VolunteerExperience,
    value: string | boolean
  ) => {
    onChange(
      data.map((vol) =>
        vol.id === id ? { ...vol, [field]: value } : vol
      )
    );
  };

  const removeVolunteer = (id: string) => {
    onChange(data.filter((vol) => vol.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Volunteer Experience</h3>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addVolunteer}>
          <Plus className="h-4 w-4 mr-2" />
          Add Volunteer
        </Button>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No volunteer experience added yet. Click "Add Volunteer" to get started.
        </p>
      ) : (
        <div className="space-y-4">
          {data.map((vol, index) => (
            <div
              key={vol.id}
              className="p-4 border rounded-lg space-y-4 bg-muted/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Volunteer #{index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeVolunteer(vol.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`organization-${vol.id}`}>Organization *</Label>
                  <Input
                    id={`organization-${vol.id}`}
                    value={vol.organization}
                    onChange={(e) =>
                      updateVolunteer(vol.id, 'organization', e.target.value)
                    }
                    placeholder="Red Cross"
                  />
                </div>

                <div>
                  <Label htmlFor={`role-${vol.id}`}>Role *</Label>
                  <Input
                    id={`role-${vol.id}`}
                    value={vol.role}
                    onChange={(e) =>
                      updateVolunteer(vol.id, 'role', e.target.value)
                    }
                    placeholder="Volunteer Coordinator"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`startDate-${vol.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${vol.id}`}
                    type="month"
                    value={vol.startDate}
                    onChange={(e) =>
                      updateVolunteer(vol.id, 'startDate', e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor={`endDate-${vol.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${vol.id}`}
                    type="month"
                    value={vol.endDate}
                    onChange={(e) =>
                      updateVolunteer(vol.id, 'endDate', e.target.value)
                    }
                    disabled={vol.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${vol.id}`}
                  checked={vol.current}
                  onCheckedChange={(checked) =>
                    updateVolunteer(vol.id, 'current', checked as boolean)
                  }
                />
                <Label htmlFor={`current-${vol.id}`} className="text-sm">
                  I currently volunteer here
                </Label>
              </div>

              <div>
                <Label htmlFor={`description-${vol.id}`}>Description</Label>
                <Textarea
                  id={`description-${vol.id}`}
                  value={vol.description}
                  onChange={(e) =>
                    updateVolunteer(vol.id, 'description', e.target.value)
                  }
                  placeholder="Describe your volunteer work..."
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
