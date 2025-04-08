import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const presetColors = [
    "#000000", "#ffffff", "#f44336", "#e91e63", "#9c27b0", "#673ab7",
    "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50",
    "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722",
    "#795548", "#9e9e9e", "#607d8b"
  ];

  const handleColorSelect = (color: string) => {
    onChange(color);
    setInputValue(color);
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(inputValue)) {
      onChange(inputValue);
    } else {
      setInputValue(value);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (/^#([0-9A-F]{3}){1,2}$/i.test(inputValue)) {
        onChange(inputValue);
        setOpen(false);
      } else {
        setInputValue(value);
      }
    }
  };

  return (
    <div className="w-full space-y-2">
      {label && <Label>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full flex justify-between items-center p-2 h-auto"
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-md border" 
                style={{ backgroundColor: value }} 
              />
              <span>{value}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded-md border focus:outline-none focus:ring focus:ring-blue-500"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
            <div>
              <Label htmlFor="custom-color">Custom Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <div 
                  className="w-6 h-6 rounded-md border" 
                  style={{ backgroundColor: inputValue }} 
                />
                <Input
                  id="custom-color"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={handleInputKeyDown}
                  className="flex-1"
                  placeholder="#000000"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Enter a valid hex color code (e.g., #FF5733)
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}