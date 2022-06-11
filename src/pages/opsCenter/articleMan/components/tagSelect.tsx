import { Tag } from "antd";
import React, { useEffect, useState } from "react";
const { CheckableTag } = Tag;

const TagSelect = ({ tagList, setTagList, value = [], onChange }: any) => {

  const handleChange = (tag: any, checked: boolean) => {
    const selectedTags = [...value]
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t: any) => t !== tag);
    onChange?.(nextSelectedTags);
  };
  
  return (
    <div>
      {tagList.map((tag: any) => (
        <CheckableTag
          key={tag.id}
          checked={value.indexOf(tag.id) > -1}
          onChange={(checked) => handleChange(tag.id, checked)}
        >
          {tag.name}
        </CheckableTag>
      ))}
    </div>
  );
};

export default TagSelect;
