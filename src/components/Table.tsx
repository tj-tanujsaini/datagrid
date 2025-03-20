import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { AssetDataWithSelection } from "../interfaces/interfaces";
import { sampleJsonData } from "../assets/sampleData/sampleData";

// Sample data
const sampleAssets: AssetDataWithSelection[] = sampleJsonData.map(asset => ({
    ...asset,
    selected: false
}));

const Table: React.FC = () => {
    const [assets, setAssets] = React.useState<AssetDataWithSelection[]>(sampleAssets);

    // Handle individual checkbox changes
    const onCheckboxChange = (index: number) => {
        setAssets(prevAssets => 
            prevAssets.map((asset, i) =>
                i === index ? { ...asset, selected: !asset.selected } : asset
            )
        );
    };

    // Get selected assets and their count
    const selectedAssets = assets.filter(asset => asset.selected);
    const selectedCount = selectedAssets.length; // Count selected assets
    const allSelected = selectedCount === assets.length; // Check if all assets are selected
    const someSelected = selectedCount > 0 && !allSelected; // Check if some assets are selected
    const canDownload = selectedCount > 0 && selectedAssets.every(asset => asset.status === 'available'); // Check if download is possible

    // Handle download action
    const onDownload = () => {
        if (canDownload) {
            const formattedMessage = selectedAssets.map(asset => 
                `Name: ${asset.name}, Device: ${asset.device}, Path: ${asset.path}`
            ).join('\n');

            alert(`Downloaded Items:\n${formattedMessage}`);
        }
    };

    // Handle select all functionality
    const onSelectAll = () => {
        const newSelectionState = !allSelected; // Toggle selection state
        setAssets(prevAssets => 
            prevAssets.map(asset => ({
                ...asset,
                selected: newSelectionState
            }))
        );
    };

    return (
        <div className="table-container">
            <h3>Datagrid</h3>
            <table>
                <TableHeader 
                    onSelectAll={onSelectAll}
                    allSelected={allSelected}
                    selectedCount={selectedCount}
                    canDownload={canDownload}
                    onDownload={onDownload}
                    someSelected={someSelected}
                />
                <TableBody assets={assets} onCheckboxChange={onCheckboxChange} />
            </table>
        </div>
    );
};

export default Table;