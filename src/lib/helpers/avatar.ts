const GRADIENTS = [
  'linear-gradient(135deg, #5c4a3a 0%, #3d2e24 100%)',
  'linear-gradient(135deg, #4a5c4a 0%, #2e3d2e 100%)',
  'linear-gradient(135deg, #5c4a5c 0%, #3d2e3d 100%)',
  'linear-gradient(135deg, #4a4a5c 0%, #2e2e3d 100%)',
  'linear-gradient(135deg, #5c5a4a 0%, #3d3a2e 100%)',
  'linear-gradient(135deg, #5c4a4a 0%, #3d2e2e 100%)',
];

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function getAvatarGradient(name: string): string {
  const hash = name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return GRADIENTS[hash % GRADIENTS.length]!;
}
