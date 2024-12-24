import { BiHomeAlt } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { MdProductionQuantityLimits } from "react-icons/md";
import {FaQuestionCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
type SidebarSectionsKeys = "management" | "supply_chain" | "e_store";
type SidebarSubItemsKeys =
  | "home_page"
  | "users"
  | "schemas"
  | "products"
  | "categories"
  | "properties"
  | "brands"
  | "currencies"
  | "store_view"
  | "orders"
  | "options"
  ;

interface SidebarSubItem {
  key: SidebarSubItemsKeys;
  icon: React.ElementType;
  path: string;
  subItems?: {title : string , link : string}[] | undefined
}

interface SideBarSection {
  key: SidebarSectionsKeys;
  subItems: SidebarSubItem[];
}
type SidebarItems = SideBarSection[];

export const SIDEBAR_ITEMS: SidebarItems = [
  {
    key: "management",
    subItems: [
      {
        key: "home_page",
        icon: BiHomeAlt,
        path: "home",

      },
      {
        key: "users",
        icon: FiUsers,
        path: "users"
      },
    ],
  },
  
  {
    key: "e_store",
    subItems: [
      {
        key: "products",
        icon: MdProductionQuantityLimits,
        path: "products",
        subItems : [{
          title : 'items',
          link : 'items'
        },{
          title : 'cities',
          link : 'cities'
        },{
          title : 'types',
          link : 'types'
        },
        {
          title : 'regions',
          link : 'regions'
        },]
      },
      {
        key : "orders",
        icon : FaQuestionCircle,
        path :'',
        subItems :[{
          title : "orders",
          link : "orders"
        },
        {
          title : "inquiries",
          link : "inquiries"
        }]

      },
      {
        key : "options",
        icon : IoSettingsSharp,
        path :'',
        subItems :[{
          title : "website_options",
          link : "settingView"
        }]

      }
      // {
      //   key: "categories",
      //   icon: BiCategory,
      //   path: "categories",
      // },
      // {
      //   key: "properties",
      //   icon: BiMenu,
      //   path: "properties",
      // },
      // {
      //   key: "brands",
      //   icon: BiSolidBookmarks,
      //   path: "brands",
      // },
      // {
      //   key: "currencies",
      //   icon: BsCurrencyExchange,
      //   path: "currencies",
      // },
      // {
      //   key: "store_view",
      //   icon: BiDesktop,
      //   path: "store-view",
      // },
    ],
  },
  // {
  //   key: "supply_chain",
  //   subItems: [
  //     {
  //       key: "schemas",
  //       icon: MdSchema,
  //       path: "schemas",
  //       subItems :[
  //         {link : '' , title : 'subSchema'}
  //       ]
  //     },
  //   ],
  // },
];
