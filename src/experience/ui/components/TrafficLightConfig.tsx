import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React, { useImperativeHandle, useState } from 'react';
const radios = [
  {
    value: 'red',
    title: 'Red',
    emoji: '🔴',
    description: 'Vehicles must come to a complete stop before the stop line.',
  },
  {
    value: 'yellow',
    title: 'Yellow',
    emoji: '🟡',
    description: 'Prepare to stop; proceed only if stopping safely is not possible.',
  },

  {
    value: 'green',
    title: 'Green',
    emoji: '🟢',
    description: 'Vehicles are allowed to proceed through the intersection.',
  },
];

export type TrafficLightConfigRef = React.RefObject<{
  submit: (fn: (value: string) => void) => void;
}>;

export type TrafficLightConfigProps = {
  ref: TrafficLightConfigRef;
  current: string;
};

export default function TrafficLightConfig({ ref, current }: TrafficLightConfigProps) {
  const [value, setValue] = useState(current);

  useImperativeHandle(ref, () => ({
    submit: (fn: (value: string) => void) => {
      fn(value);
    },
  }));

  return (
    <div className="w-full">
      <RadioGroup value={value} onValueChange={setValue}>
        {radios.map((r) => (
          <FieldLabel key={r.value} htmlFor={r.value}>
            <Field orientation="horizontal">
              <div className="self-center rounded-4xl mr-2.5 text-3xl">{r.emoji}</div>
              <FieldContent>
                <FieldTitle>{r.title}</FieldTitle>
                <FieldDescription>{r.description}</FieldDescription>
              </FieldContent>
              <RadioGroupItem value={r.value} id={r.value} />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </div>
  );
}
