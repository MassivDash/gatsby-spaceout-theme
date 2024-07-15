import React from 'react';
import { TreeChart } from './treechart';
import { Observer } from './intersectionObserver';
import './uiStyles.css';

export const TreeChartChanger = React.memo(({ folders }) => {
  const [folder, setFolder] = React.useState(folders[0]);
  return (
    <Observer>
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
    </Observer>
  );
});
