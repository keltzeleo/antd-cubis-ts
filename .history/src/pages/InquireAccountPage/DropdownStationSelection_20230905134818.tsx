// DropdownStationSelection.tsx
import { Menu } from "antd";

export const StationDropdownMenu = ({ stations }: { stations: string[] }) => (
  <Menu>
    {stations.map((station, index) => (
      <Menu.Item key={index}>{station}</Menu.Item>
    ))}
  </Menu>
);
