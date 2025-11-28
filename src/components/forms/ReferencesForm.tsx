import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Users } from 'lucide-react';
import { Reference } from '../../types/resume';

interface ReferencesFormProps {
  data: Reference[];
  onChange: (data: Reference[]) => void;
}

export const ReferencesForm: React.FC<ReferencesFormProps> = ({ data, onChange }) => {
  const addReference = () => {
    const newReference: Reference = {
      id: Date.now().toString(),
      name: '',
      title: '',
      company: '',
      email: '',
      phone: '',
      relationship: '',
    };
    onChange([...data, newReference]);
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    onChange(
      data.map((ref) =>
        ref.id === id ? { ...ref, [field]: value } : ref
      )
    );
  };

  const removeReference = (id: string) => {
    onChange(data.filter((ref) => ref.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">References</h3>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addReference}>
          <Plus className="h-4 w-4 mr-2" />
          Add Reference
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            No references added yet. Click "Add Reference" to get started.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Tip: You can also use "References available upon request" instead.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((ref, index) => (
            <div
              key={ref.id}
              className="p-4 border rounded-lg space-y-4 bg-muted/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Reference #{index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeReference(ref.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`name-${ref.id}`}>Name *</Label>
                  <Input
                    id={`name-${ref.id}`}
                    value={ref.name}
                    onChange={(e) =>
                      updateReference(ref.id, 'name', e.target.value)
                    }
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <Label htmlFor={`title-${ref.id}`}>Title *</Label>
                  <Input
                    id={`title-${ref.id}`}
                    value={ref.title}
                    onChange={(e) =>
                      updateReference(ref.id, 'title', e.target.value)
                    }
                    placeholder="Senior Manager"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`company-${ref.id}`}>Company *</Label>
                  <Input
                    id={`company-${ref.id}`}
                    value={ref.company}
                    onChange={(e) =>
                      updateReference(ref.id, 'company', e.target.value)
                    }
                    placeholder="Company Name"
                  />
                </div>

                <div>
                  <Label htmlFor={`relationship-${ref.id}`}>Relationship *</Label>
                  <Input
                    id={`relationship-${ref.id}`}
                    value={ref.relationship}
                    onChange={(e) =>
                      updateReference(ref.id, 'relationship', e.target.value)
                    }
                    placeholder="Former Manager"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`email-${ref.id}`}>Email</Label>
                  <Input
                    id={`email-${ref.id}`}
                    type="email"
                    value={ref.email || ''}
                    onChange={(e) =>
                      updateReference(ref.id, 'email', e.target.value)
                    }
                    placeholder="john.smith@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor={`phone-${ref.id}`}>Phone</Label>
                  <Input
                    id={`phone-${ref.id}`}
                    value={ref.phone || ''}
                    onChange={(e) =>
                      updateReference(ref.id, 'phone', e.target.value)
                    }
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
