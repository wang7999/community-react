// login module
import { makeAutoObservable } from "mobx";
import { getPermissions, getUserInfo, login } from "../api/user";
import { lazyLoad } from "../router/dynamicRoutes";
import { getTreeArr } from "../utils";
import { getItem, removeItem, setItem } from "../utils/storage";

export const TOKEN = "BBS_REACT_TOKEN";

// 得到页面路径
const getPath = (arr: any[], child: { pid: any }, code: string) => {
  const pItem = arr.find((item) => child.pid === item.id);
  // 当前元素还存在父节点, 且父节点不为根节点
  if (arr.find((item) => pItem.pid === item.id && item.pid > -1)) {
    getPath(arr, pItem, `${pItem.code}/${code}`);
  } else {
    return `${pItem.code?(pItem.code+'/'):''}${code}`;
  }
};

const dashboard = [
  {
    id: 0,
    pid: 1,
    component: 2,
    code: "",
    name: "首页",
    icon: "",
    redirect: "",
    sort: 0,
  },
  {
    id: -1,
    pid: 0,
    component: 1,
    code: "dashboard",
    name: "首页",
    icon: "icon-shouye",
    redirect: "",
    sort: 0,
  },
];
class UserStore {
  token = getItem(TOKEN) || "";
  userInfo = {};
  menus: any = [];
  baseMenus: any = [];
  constructor() {
    // 响应式
    makeAutoObservable(this);
  }
  // userId
  get menuList () {
    return this.menus
  }

  login = async (data: any) => {
    // 调用登录接口
    const res: any = await login(data);
    // 存入token
    this.token = res.token;
    // 存入ls
    setItem(TOKEN, this.token);
  };

  getUserInfo = async () => {
    // 调用获取用户信息
    const res: any = await getUserInfo();
    this.userInfo = res.content[0];
  };

  getMenus = async () => {
    const {
      content: { dataPerms, mod },
    }: any = await getPermissions();
    const menu = mod.filter((item: { pid: number }) => item.pid > -1).concat(dashboard);
    
    
    this.baseMenus = menu;
    // 将菜单数据处理成可挂载的路由数据
    const baseMenu = menu.map((item: any, index: number) => {
      // 设置页面对应的组件 对应组件: -1. 根节点 1. 页面组件 2.默认布局 3456...扩展布局
      switch (item.component) {
        case -1:
          // console.log("根节点，已经过滤掉了");
          break;
        case 1:
          item.component = lazyLoad(getPath(menu, item, item.code));
          break;
        case 2:
          item.component = lazyLoad('layout');
          break;
        default:
          item.component = lazyLoad("notFound");
          break;
      }
      return {
        id: item.id,
        pid: item.pid,
        path: `${item.pid === 1 ? "/" : ""}` + item.code, // 设置对应的页面路径
        element: item.component,
        name: item.name, // 使路由名字具有唯一性
        meta: {
          title: item.name,
          code: item.code,
          icon: item.icon,
          id: item.id,
        },
        sort: item.sort,
        label: item.name,
        key: item.code
      };
    });
    // 数据排序
    baseMenu.sort((a: any, b: any) => a.sort - b.sort);
    // 得到树状数组
    const treeMenu = getTreeArr({
      key: "id",
      pKey: "pid",
      data: baseMenu,
      jsonData: false,
    });
    
    this.menus = treeMenu;
  };

  // 退出登录 
  loginOut = () => {
    this.token = "";
    removeItem(TOKEN);
  };
}

export default UserStore;
