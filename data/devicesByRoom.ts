export const devicesByRoom: Record<
  string,
  Array<{
    type: 'switch' | 'fan';
    name: string;
    icon?: string;
  }>
> = {
  'livingroom': [
    { type: 'switch', name: 'TV', icon: 'television' },
    { type: 'fan', name: 'Ceiling Fan', icon: 'fan' },
    { type: 'switch', name: 'Main Light', icon: 'lightbulb-outline' },
  ],
  'bedroom': [
    { type: 'switch', name: 'Tubelight', icon: 'lightbulb-outline' },
    { type: 'fan', name: 'Fan', icon: 'fan' },
    { type: 'switch', name: 'AC', icon: 'air-conditioner' },
  ],
  kitchen: [
    { type: 'switch', name: 'Light', icon: 'lightbulb-outline' },
    { type: 'switch', name: 'Exhaust', icon: 'air-filter' },
  ],
  'bathroom': [
    { type: 'switch', name: 'Mirror Light', icon: 'lightbulb-outline' },
    { type: 'switch', name: 'Water Heater', icon: 'water-boiler' },
    { type: 'fan', name: 'Exhaust Fan', icon: 'fan' },
  ],
  office: [
    { type: 'switch', name: 'Desk Lamp', icon: 'desk-lamp' },
    { type: 'switch', name: 'Monitor', icon: 'monitor' },
    { type: 'fan', name: 'Table Fan', icon: 'fan' },
  ],
  garden: [
    { type: 'switch', name: 'Garden Lights', icon: 'outdoor-lamp' },
    { type: 'switch', name: 'Sprinklers', icon: 'water' },
  ],
};
