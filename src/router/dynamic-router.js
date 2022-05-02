/* 订单管理 */
const Entitys = () => import('@/pages/entitys')
const Point = () => import('@/pages/entitys/Point')

const Polygon = () => import('@/pages/entitys/Polygon')

/* 产品管理 */
const Goods = () => import('@/pages/goods-manage')
const GoodsList = () => import('@/pages/goods-manage/goods-list')
const GoodsClassify = () => import('@/pages/goods-manage/goods-classify')
// 权限管理
const Permission = () => import('@/pages/permission')
const UserManage = () => import('@/pages/permission/user-manage')
const RoleManage = () => import('@/pages/permission/role-manage')
const MenuManage = () => import('@/pages/permission/menu-manage')
/* 需要权限判断的路由 */
const dynamicRoutes = [
    {
        path: '/entitys',
        component: Entitys,
        name: 'entitys',
        meta: {
            name: '实体entity',
            icon: 'example'
        },
        children: [
            {
                path: 'point',
                name: 'point',
                component: Point,
                meta: {
                    name: '点实体',
                    icon: 'table'
                }
            },
            {
                path: 'polygon',
                name: 'polygon',
                component: Polygon,
                meta: {
                    name: '面实体',
                    icon: 'nested'
                }
            }
        ]
    },
    {
        path: '/goods',
        component: Goods,
        name: 'goods',
        meta: {
            name: '产品管理',
            icon: 'user'
        },
        children: [
            {
                path: 'list',
                name: 'goods-list',
                component: GoodsList,
                meta: {
                    name: '产品列表',
                    icon: 'table'
                }
            },
            {
                path: 'classify',
                name: 'goods-classify',
                component: GoodsClassify,
                meta: {
                    name: '产品分类',
                    icon: 'tree'
                }
            }
        ]
    },
    {
        path: '/permission',
        component: Permission,
        name: 'permission',
        meta: {
            name: '权限管理',
            icon: 'table'
        },
        children: [
            {
                path: 'user',
                name: 'user-manage',
                component: UserManage,
                meta: {
                    name: '用户管理',
                    icon: 'table'
                }
            },
            {
                path: 'role',
                name: 'role-manage',
                component: RoleManage,
                meta: {
                    name: '角色管理',
                    icon: 'eye'
                }
            },
            {
                path: 'menu',
                name: 'menu-manage',
                component: MenuManage,
                meta: {
                    name: '菜单管理',
                    icon: 'tree'
                }
            }
        ]
    }
]

export default dynamicRoutes
