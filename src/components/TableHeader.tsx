import React, { useEffect, useRef } from "react";
import downloadIcon from "../assets/icons/download-icon.svg";

interface TableHeaderProps {
    onSelectAll: () => void; // Function to handle "Select All" action
    allSelected: boolean; // Indicates if all items are selected
    selectedCount: number; // Count of currently selected items
    canDownload: boolean; // Indicates if download is possible
    onDownload: () => void; // Function to handle download action
    someSelected: boolean; // Indicates if some items are selected
}

const TableHeader: React.FC<TableHeaderProps> = ({
    onSelectAll,
    allSelected,
    selectedCount,
    canDownload,
    onDownload,
    someSelected
}) => {
    const selectAllRef = useRef<HTMLInputElement>(null); // Ref for the "Select All" checkbox

    // Set indeterminate state for the "Select All" checkbox
    useEffect(() => {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate = someSelected; // Set indeterminate based on someSelected
        }
    }, [someSelected]); // Run effect when someSelected changes

    return (
        <thead className="table-header">
            <tr>
                <th>
                    <input
                        type="checkbox"
                        aria-label="Select All"
                        onChange={onSelectAll}
                        checked={allSelected}
                        ref={selectAllRef}
                    />
                    <div>
                        {allSelected
                            ? "All Selected"
                            : selectedCount > 0
                                ? `${selectedCount} Selected`
                                : "None Selected"}
                    </div>
                </th>
                <th colSpan={4}>
                    <button
                        onClick={onDownload}
                        disabled={!canDownload}
                        className={`download-button ${canDownload ? 'primary' : 'disabled'}`}>
                        <img src={downloadIcon} alt="Download" />
                        Download Selected
                    </button>
                </th>
            </tr>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Device</th>
                <th>Path</th>
                <th>Status</th>
            </tr>
        </thead>
    );
};

export default TableHeader;