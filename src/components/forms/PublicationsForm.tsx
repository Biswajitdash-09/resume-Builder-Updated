import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, BookOpen } from 'lucide-react';
import { Publication } from '../../types/resume';

interface PublicationsFormProps {
  data: Publication[];
  onChange: (data: Publication[]) => void;
}

export const PublicationsForm: React.FC<PublicationsFormProps> = ({ data, onChange }) => {
  const addPublication = () => {
    const newPublication: Publication = {
      id: Date.now().toString(),
      title: '',
      publisher: '',
      date: '',
      link: '',
      authors: '',
    };
    onChange([...data, newPublication]);
  };

  const updatePublication = (id: string, field: keyof Publication, value: string) => {
    onChange(
      data.map((pub) =>
        pub.id === id ? { ...pub, [field]: value } : pub
      )
    );
  };

  const removePublication = (id: string) => {
    onChange(data.filter((pub) => pub.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Publications</h3>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addPublication}>
          <Plus className="h-4 w-4 mr-2" />
          Add Publication
        </Button>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No publications added yet. Click "Add Publication" to get started.
        </p>
      ) : (
        <div className="space-y-4">
          {data.map((pub, index) => (
            <div
              key={pub.id}
              className="p-4 border rounded-lg space-y-4 bg-muted/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Publication #{index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removePublication(pub.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <Label htmlFor={`title-${pub.id}`}>Publication Title *</Label>
                <Input
                  id={`title-${pub.id}`}
                  value={pub.title}
                  onChange={(e) =>
                    updatePublication(pub.id, 'title', e.target.value)
                  }
                  placeholder="Research Paper Title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`publisher-${pub.id}`}>Publisher / Journal *</Label>
                  <Input
                    id={`publisher-${pub.id}`}
                    value={pub.publisher}
                    onChange={(e) =>
                      updatePublication(pub.id, 'publisher', e.target.value)
                    }
                    placeholder="IEEE, Nature, etc."
                  />
                </div>

                <div>
                  <Label htmlFor={`date-${pub.id}`}>Publication Date</Label>
                  <Input
                    id={`date-${pub.id}`}
                    type="month"
                    value={pub.date}
                    onChange={(e) =>
                      updatePublication(pub.id, 'date', e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`authors-${pub.id}`}>Authors</Label>
                <Input
                  id={`authors-${pub.id}`}
                  value={pub.authors || ''}
                  onChange={(e) =>
                    updatePublication(pub.id, 'authors', e.target.value)
                  }
                  placeholder="John Doe, Jane Smith"
                />
              </div>

              <div>
                <Label htmlFor={`link-${pub.id}`}>Link (Optional)</Label>
                <Input
                  id={`link-${pub.id}`}
                  value={pub.link || ''}
                  onChange={(e) =>
                    updatePublication(pub.id, 'link', e.target.value)
                  }
                  placeholder="https://doi.org/..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
