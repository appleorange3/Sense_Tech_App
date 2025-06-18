export const gardenLightToggleAction = (name: string, isOn: boolean) => {
  console.log(`🌼 Garden Light is now ${isOn ? 'ON' : 'OFF'}`);
  // You can even call APIs or other logic here
};

export const fanToggleAction = (name: string, isOn: boolean) => {
  console.log(`🌪️ Fan Toggle: ${name} is now ${isOn ? 'Running' : 'Stopped'}`);
};

export const bathroomLightToggleAction = (name: string, isOn: boolean) => {
  console.log(`🚿 Bathroom Light is now ${isOn ? 'Lit' : 'Dark'}`);
};

export const defaultToggleAction = (name: string, isOn: boolean) => {
  console.log(`⚙️ Default Toggle: ${name} is now ${isOn ? 'ON' : 'OFF'}`);
};

export const applianceToggleMap: Record<string, (name: string, isOn: boolean) => void> = {
  "Garden Lights": gardenLightToggleAction,
  "Fan": fanToggleAction,
  "Mirror Light": bathroomLightToggleAction,
};
