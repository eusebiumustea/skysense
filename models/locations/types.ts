export interface SavedLocation {
  coordinates: {
    long: number;
    lat: number;
  };
  name: string;
}
export interface LocationProps {
  selectedLocation: SavedLocation | "current";
  savedLocations: SavedLocation[];
}
