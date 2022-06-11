import { Tree } from "antd";
import React from "react";
import type { DataNode, DirectoryTreeProps } from 'antd/lib/tree';

const ProTree = ({ treeData, onClick }: any) => {
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
    onClick(info.node)
  };
  return (
    <Tree
      treeData={treeData}
      fieldNames={{
        title: "name",
        key: "id",
      }}
      defaultExpandAll={true}
      autoExpandParent={true}
      onSelect={onSelect}
    />
  );
};

export default ProTree;
