export interface RoomTemplate {
  id: string;
  name: string;
  icon: string;
}

export const roomTemplates: RoomTemplate[] = [
  {
    id: 'living_room_template',
    name: 'Living Room',
    icon: require('../assets/icons/LivingRoom.png'),
  },
  {
    id: 'bedroom_template',
    name: 'Bedroom',
    icon: require('../assets/icons/Bed.png'),
  },
  {
    id: 'kitchen_template',
    name: 'Kitchen',
    icon: require('../assets/icons/KitchenRoom.png'),
  },
  {
    id: 'bathroom_template',
    name: 'Bathroom',
    icon: require('../assets/icons/Bathtub.png'),
  },
  {
    id: 'office_template',
    name: 'Office',
    icon: require('../assets/icons/Office.png'),
  },
  {
    id: 'garden_template',
    name: 'Garden',
    icon: require('../assets/icons/MapleLeaf.png'),
  },
];