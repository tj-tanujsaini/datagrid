export interface AssetData {
    name: string;
    device: string;
    path: string;
    status: 'scheduled' | 'available';
}

export interface AssetDataWithSelection extends AssetData {
    selected: boolean;
}