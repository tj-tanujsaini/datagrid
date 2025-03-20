import React from "react";
import { AssetDataWithSelection } from "../interfaces/interfaces";

interface TableBodyProps {
    assets: AssetDataWithSelection[];
    onCheckboxChange: (index: number) => void;
}

const TableBody: React.FC<TableBodyProps> = ({ assets, onCheckboxChange }) => {
    return (
        <tbody className="table-body">
            {assets.map((asset, index) => (
                <tr key={index}>
                    <td>
                        <input
                            type="checkbox"
                            aria-label="Select Row"
                            checked={asset.selected}
                            onChange={() => onCheckboxChange(index)}
                        />
                    </td>
                    <td>{asset.name}</td>
                    <td>{asset.device}</td>
                    <td>{asset.path}</td>
                    <td>
                        {asset.status === 'available' && (
                            <span className="green-dot"></span>
                        )}
                        <span>{asset.status}</span>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;