import React from 'react';
import { TreeChart } from './treechart';
import './uiStyles.css';

export const TreeChartChanger = ({ folders }) => {
  const [folder, setFolder] = React.useState(folders[0]);
  return (
    <div className="tree-changer">
      <select
        className="tree-changer-select"
        onChange={(e) => setFolder(folders[e.target.value])}
      >
        {folders.map((folder, index) => (
          <option className="tree-changer-option" key={index} value={index}>
            {folder.name}
          </option>
        ))}
      </select>
      <TreeChart folder={folder} />
    </div>
  );
};
