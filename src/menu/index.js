import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

// export const menuHeader = supplementPath([
//   // { path: '/index', title: '首页', icon: 'home' },
//   {
//     title: '页面123',
//     icon: 'folder-o',
//     children: [
//       { path: '/page1', title: '页面 1' },
//       { path: '/page2', title: '页面 2' },
//       { path: '/page3', title: '页面 3' }
//     ]
//   }
// ])
export const menuAside = supplementPath([
  // { path: '/index', title: '首页', icon: 'home' },
  {
    title: '雷管管理',
    icon: 'folder-o',
    children: [
      { path: '/detonator', title: '雷管信息' },
      { path: '/detonatorLog', title: '雷管出入帐' }
    ]
  },
  {
    title: '炸药管理',
    icon: 'folder-o',
    children: [
      { path: '/explosive', title: '炸药信息' },
      { path: '/explosiveLog', title: '炸药出入帐' }
    ]
  },
  {
    title: '消耗明细',
    icon: 'folder-o',
    path: '/detail'
  },

  { path: '/user', title: '人员管理', icon: 'folder-o' }

])
