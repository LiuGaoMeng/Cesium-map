/* 订单管理 */
const Entitys = () => import('@/pages/entitys')
const Point = () => import('@/pages/entitys/Point')
const Billboard = () => import('@/pages/entitys/Billboard')
const Box = () => import('@/pages/entitys/Box')
const Corridor = () => import('@/pages/entitys/Corridor')
const Cylinder = () => import('@/pages/entitys/Cylinder')
const Ellipse = () => import('@/pages/entitys/Ellipse')
const Ellipsoid = () => import('@/pages/entitys/Ellipsoid')
const Label = () => import('@/pages/entitys/Label')
const Model = () => import('@/pages/entitys/Model')
const Path = () => import('@/pages/entitys/Path')
const Plane = () => import('@/pages/entitys/Plane')
const Polygon = () => import('@/pages/entitys/Polygon')
const Polyline = () => import('@/pages/entitys/Polyline')
const PolylineVolume = () => import('@/pages/entitys/PolylineVolume')
const Rectangle = () => import('@/pages/entitys/Rectangle')
const EntityCluster = () => import('@/pages/entitys/EntityCluster')
const EntityCluster2 = () => import('@/pages/entitys/EntityCluster2')

const Material = () => import('@/pages/materials')

const Primitive = () => import('@/pages/primitive')
const DEMO = () => import('@/pages/demos')
const LightLine = () => import('@/pages/demos/LightLine')
/* 产品管理 */
const Goods = () => import('@/pages/goods-manage')
const GoodsList = () => import('@/pages/goods-manage/goods-list')
const GoodsClassify = () => import('@/pages/goods-manage/goods-classify')

/* 需要权限判断的路由 */
const dynamicRoutes = [{
    path: '/entitys',
    component: Entitys,
    name: 'entitys',
    meta: {
        name: '实体entity',
        icon: 'example'
    },
    children: [{
        path: 'point',
        name: 'point',
        component: Point,
        meta: {
            name: '点',
            icon: 'table'
        }
    },
    {
        path: 'billboard',
        name: 'billboard',
        component: Billboard,
        meta: {
            name: '广告牌',
            icon: 'table'
        }
    },
    {
        path: 'box',
        name: 'box',
        component: Box,
        meta: {
            name: '盒子',
            icon: 'table'
        }
    },
    {
        path: 'Corridor',
        name: 'Corridor',
        component: Corridor,
        meta: {
            name: '走廊',
            icon: 'table'
        }
    },
    {
        path: 'Cylinder',
        name: 'Cylinder',
        component: Cylinder,
        meta: {
            name: '圆柱体',
            icon: 'table'
        }
    },
    {
        path: 'Ellipse',
        name: 'Ellipse',
        component: Ellipse,
        meta: {
            name: '球体/椭圆',
            icon: 'table'
        }
    },
    {
        path: 'Ellipsoid',
        name: 'Ellipsoid',
        component: Ellipsoid,
        meta: {
            name: '椭球/球体',
            icon: 'table'
        }
    },
    {
        path: 'Label',
        name: 'Label',
        component: Label,
        meta: {
            name: '标签',
            icon: 'table'
        }
    },
    {
        path: 'Model',
        name: 'Model',
        component: Model,
        meta: {
            name: '模型',
            icon: 'table'
        }
    },
    {
        path: 'Path',
        name: 'Path',
        component: Path,
        meta: {
            name: '路径',
            icon: 'table'
        }
    },
    {
        path: 'Plane',
        name: 'Plane',
        component: Plane,
        meta: {
            name: '平面',
            icon: 'table'
        }
    },
    {
        path: 'polygon',
        name: 'polygon',
        component: Polygon,
        meta: {
            name: '多边形',
            icon: 'table'
        }
    },
    {
        path: 'polyline',
        name: 'polyline',
        component: Polyline,
        meta: {
            name: '折线',
            icon: 'table'
        }
    },
    {
        path: 'polylineVolume',
        name: 'polylineVolume',
        component: PolylineVolume,
        meta: {
            name: '折线体',
            icon: 'table'
        }
    },
    {
        path: 'rectangle',
        name: 'rectangle',
        component: Rectangle,
        meta: {
            name: '矩形',
            icon: 'table'
        }
    },
    {
        path: 'etityCluster ',
        name: 'entityCluster ',
        component: EntityCluster,
        meta: {
            name: '聚合',
            icon: 'table'
        }
    },
    {
        path: 'etityCluster2 ',
        name: 'entityCluster2 ',
        component: EntityCluster2,
        meta: {
            name: '聚合2',
            icon: 'table'
        }
    }
    ]
},
{
    path: '/material',
    component: Material,
    name: 'material',
    meta: {
        name: '材质',
        icon: 'user'
    },
    children: [
        //     {
        //     path: 'list',
        //     name: 'goods-list',
        //     component: GoodsList,
        //     meta: {
        //         name: '产品列表',
        //         icon: 'table'
        //     }
        // },
        // {
        //     path: 'classify',
        //     name: 'goods-classify',
        //     component: GoodsClassify,
        //     meta: {
        //         name: '产品分类',
        //         icon: 'tree'
        //     }
        // }
    ]
},
{
    path: '/primitive',
    component: Primitive,
    name: 'primitive',
    meta: {
        name: '原始类型',
        icon: 'table'
    },
    children: [
        //     {
        //     path: 'user',
        //     name: 'user-manage',
        //     component: UserManage,
        //     meta: {
        //         name: '用户管理',
        //         icon: 'table'
        //     }
        // },
        // {
        //     path: 'role',
        //     name: 'role-manage',
        //     component: RoleManage,
        //     meta: {
        //         name: '角色管理',
        //         icon: 'eye'
        //     }
        // },
        // {
        //     path: 'menu',
        //     name: 'menu-manage',
        //     component: MenuManage,
        //     meta: {
        //         name: '菜单管理',
        //         icon: 'tree'
        //     }
        // }
    ]
},
{
    path: '/demo',
    component: DEMO,
    name: 'demo',
    meta: {
        name: '案例',
        icon: 'user'
    },
    children: [
        {
            path: 'lightLine',
            name: 'lightLine',
            component: LightLine,
            meta: {
                name: '流光线',
                icon: 'table'
            }
        }
        // {
        //     path: 'classify',
        //     name: 'goods-classify',
        //     component: GoodsClassify,
        //     meta: {
        //         name: '产品分类',
        //         icon: 'tree'
        //     }
        // }
    ]
}
]

export default dynamicRoutes
