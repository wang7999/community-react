import RcPagination from "rc-pagination";
import { useState } from "react";
// import { Pagination } from "react-bootstrap";

export const Cpagination = () => {
  const [current, setCurrent] = useState(1);
  const onChange = (page: number) => {
    console.log(page);
    
    setCurrent(page);
  };
  const itemRender = (current: any, type: any, element: any) => {
    
    if (type === 'page') {
      return <a href={`#${current}`} className="page-link">{current}</a>;
    }
    return element;
  };
  return (
    <RcPagination
      onChange={onChange}
      current={current}
      total={25}
      prefixCls='page'
      className="pagination"
      itemRender={itemRender}
    />
  )
};
