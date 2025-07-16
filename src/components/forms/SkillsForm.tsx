
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skill } from '../../types/resume';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState('');
  const [newLevel, setNewLevel] = useState<Skill['level']>('Intermediate');
  const [newCategory, setNewCategory] = useState<Skill['category']>('Technical');

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.trim(),
        level: newLevel,
        category: newCategory
      };
      onChange([...data, skill]);
      setNewSkill('');
    }
  };

  const removeSkill = (id: string) => {
    onChange(data.filter(skill => skill.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const groupedSkills = data.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Skills</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="skillName">Skill Name</Label>
          <Input
            id="skillName"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., JavaScript, Leadership, Spanish"
          />
        </div>
        
        <div>
          <Label>Level</Label>
          <Select value={newLevel} onValueChange={(value) => setNewLevel(value as Skill['level'])}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Category</Label>
          <Select value={newCategory} onValueChange={(value) => setNewCategory(value as Skill['category'])}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Technical">Technical</SelectItem>
              <SelectItem value="Soft">Soft Skills</SelectItem>
              <SelectItem value="Language">Language</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={addSkill} size="sm">
        <Plus className="h-4 w-4 mr-2" />
        Add Skill
      </Button>

      <div className="space-y-4">
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <div key={category}>
            <h4 className="font-medium mb-2">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {skill.name} ({skill.level})
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                    className="h-auto p-0 ml-1 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
