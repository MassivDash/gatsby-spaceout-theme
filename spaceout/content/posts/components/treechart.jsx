import React from 'react';
import {
  DiCss3,
  DiJavascript,
  DiNpm,
  DiHtml5,
  DiGithub,
  DiReact,
} from 'react-icons/di';
import { BiLogoTypescript } from 'react-icons/bi';
import { FaRegFolder, FaRegFolderOpen } from 'react-icons/fa';
import {
  SiEslint,
  SiWebpack,
  SiGitignoredotio,
  SiYaml,
  SiPrettier,
  SiDocker,
  SiMarkdown,
  SiBabel,
  SiJest,
  SiPlaywright,
  SiCommitlint,
  SiDotenv,
} from 'react-icons/si';

import { RiTestTubeFill } from 'react-icons/ri';
import { BsFiletypeMdx, BsFiletypeScss } from 'react-icons/bs';
import { VscJson } from 'react-icons/vsc';

import TreeView, { flattenTree } from 'react-accessible-treeview';
import './uiStyles.css';

export function TreeChart({ folder }) {
  const data = flattenTree(folder);
  return (
    <div>
      <div className="ide">
        <TreeView
          data={data}
          aria-label="directory tree"
          togglableSelect
          clickAction="EXCLUSIVE_SELECT"
          multiSelect
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level,
            handleSelect,
          }) => (
            <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
              {isBranch ? (
                <FolderIcon isOpen={isExpanded} folderType={element.name} />
              ) : (
                <>
                  <FileIcon filename={element.name} />
                  {element.name}
                </>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}

const FolderIcon = ({ isOpen, folderType }) => {
  return (
    <div
      style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
    >
      {isOpen ? (
        <FaRegFolderOpen color="e8a87c" className="icon" />
      ) : (
        <FaRegFolder color="e8a87c" className="icon" />
      )}
      {folderType}
    </div>
  );
};
const FileIcon = ({ filename }) => {
  const extension = filename;
  switch (true) {
    case /commitlint\./.test(extension):
      return <SiCommitlint color="red" className="icon" />;
    case /playwright\./.test(extension):
      return <SiPlaywright color="lightblue" className="icon" />;
    case /jest\./.test(extension):
      return <SiJest color="lightblue" className="icon" />;
    case /\.test\./.test(extension):
      return <RiTestTubeFill color="lightblue" className="icon" />;
    case /webpack\./.test(extension):
      return <SiWebpack color="lightblue" className="icon" />;
    case /.npmignore$|package(-lock)?\.json|.nvmrc?|.npmrc?$/.test(extension):
      return <DiNpm color="red" className="icon" />;
    case /\.js$/.test(extension):
      return <DiJavascript color="yellow" className="icon" />;
    case /\.ts$|tsconfig\.json$/.test(extension):
      return <BiLogoTypescript color="lightblue" className="icon" />;
    case /\.jsx?$|\.tsx?$/.test(extension):
      return <DiReact color="lightblue" className="icon" />;
    case /\.css$/.test(extension):
      return <DiCss3 color="lightorange" className="icon" />;
    case /\.json$/.test(extension):
      return <VscJson color="yellow" className="icon" />;
    case /\.html$/.test(extension):
      return <DiHtml5 color="lightred" className="icon" />;
    case /\.env$/.test(extension):
      return <SiDotenv color="lightred" className="icon" />;
    case /github$/.test(extension):
      return <DiGithub color="white" className="icon" />;
    case /.mdx$/.test(extension):
      return <BsFiletypeMdx color="white" className="icon" />;
    case /.md$/.test(extension):
      return <SiMarkdown color="white" className="icon" />;
    case /.eslint$/.test(extension):
      return <SiEslint color="lightblue" className="icon" />;
    case /.gitignore$/.test(extension):
      return <SiGitignoredotio color="gray" className="icon" />;
    case /docker$/.test(extension):
      return <SiDocker color="cyan" className="icon" />;
    case /.yaml|.yml$/.test(extension):
      return <SiYaml color="white" className="icon" />;
    case /.prettier$/.test(extension):
      return <SiPrettier color="white" className="icon" />;
    case /babel$/.test(extension):
      return <SiBabel color="yellow" className="icon" />;
    case /.scss$/.test(extension):
      return <BsFiletypeScss color="pink" className="icon" />;
    default:
      return null;
  }
};

export default TreeChart;
