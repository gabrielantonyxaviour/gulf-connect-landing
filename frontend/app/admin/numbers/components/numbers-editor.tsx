"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import type { Statistic } from '@/lib/types/database';

interface Props {
  initialStats: Statistic[];
}

export function NumbersEditor({ initialStats }: Props) {
  const router = useRouter();
  const [statistics, setStatistics] = useState<Statistic[]>(initialStats);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const updateStat = (index: number, field: keyof Statistic, value: string | number | boolean) => {
    const updated = [...statistics];
    updated[index] = { ...updated[index], [field]: value };
    setStatistics(updated);
    setHasChanges(true);
  };

  const addStat = () => {
    const newStat: Partial<Statistic> = {
      id: `stat_${Date.now()}`,
      value: 0,
      suffix: '+',
      label: 'New Statistic',
      sort_order: statistics.length,
      is_active: true,
    };
    setStatistics([...statistics, newStat as Statistic]);
    setHasChanges(true);
  };

  const removeStat = (index: number) => {
    if (!confirm('Are you sure you want to remove this statistic?')) return;
    setStatistics(statistics.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
    // Add a slight delay to show the dragging state
    setTimeout(() => {
      (e.target as HTMLDivElement).style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    (e.target as HTMLDivElement).style.opacity = '1';
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newStats = [...statistics];
    const [draggedItem] = newStats.splice(draggedIndex, 1);
    newStats.splice(dropIndex, 0, draggedItem);

    // Update sort_order for all items
    const updatedStats = newStats.map((stat, i) => ({
      ...stat,
      sort_order: i,
    }));

    setStatistics(updatedStats);
    setHasChanges(true);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/statistics', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statistics }),
      });

      if (!res.ok) throw new Error('Failed to save');

      toast.success('Statistics saved successfully');
      setHasChanges(false);
      // Refresh in background after short delay
      setTimeout(() => router.refresh(), 100);
    } catch {
      toast.error('Failed to save statistics');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {statistics
              .filter(s => s.is_active)
              .map((stat) => (
                <div
                  key={stat.id}
                  className="text-center p-4 bg-muted/50 rounded-lg"
                >
                  <div className="text-2xl font-bold text-accent">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Editor Section */}
      <div className="bg-card rounded-lg border p-6">
        <div className="space-y-4">
          {statistics.map((stat, index) => (
            <div
              key={stat.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              className={`flex items-center gap-4 p-4 border rounded-lg bg-muted/20 transition-all ${
                dragOverIndex === index ? 'border-primary border-2 bg-primary/10' : ''
              } ${draggedIndex === index ? 'opacity-50' : ''}`}
            >
              <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab active:cursor-grabbing" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                <div className="space-y-1">
                  <Label className="text-xs">Value</Label>
                  <Input
                    type="number"
                    value={stat.value}
                    onChange={(e) => updateStat(index, 'value', parseFloat(e.target.value) || 0)}
                    className="h-9"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Suffix</Label>
                  <Input
                    value={stat.suffix}
                    onChange={(e) => updateStat(index, 'suffix', e.target.value)}
                    placeholder="+, M+, K, etc."
                    className="h-9"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <Label className="text-xs">Label</Label>
                  <Input
                    value={stat.label}
                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                    className="h-9"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={stat.is_active}
                  onCheckedChange={(v) => updateStat(index, 'is_active', v)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeStat(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6 pt-6 border-t">
          <Button variant="outline" onClick={addStat}>
            <Plus className="h-4 w-4 mr-2" />
            Add Statistic
          </Button>

          <Button
            onClick={saveChanges}
            disabled={!hasChanges || isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Unsaved changes warning */}
      {hasChanges && (
        <div className="fixed bottom-4 right-4 bg-primary/20 border border-yellow-300 rounded-lg p-4 shadow-lg">
          <p className="text-primary text-sm">
            You have unsaved changes
          </p>
        </div>
      )}
    </div>
  );
}
